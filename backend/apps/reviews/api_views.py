import json
from django.http import JsonResponse
from django.views.decorators.http import require_GET, require_POST
from django.contrib.auth.decorators import login_required
from django.db.models import Avg
from .models import Review
from apps.products.models import Product

@require_GET
def reviews_list_api(request, product_slug):
    """
    Get all reviews for a product.
    """
    try:
        product = Product.objects.get(slug=product_slug, is_active=True)
        reviews = Review.objects.filter(product=product).select_related('user')
        
        # Pagination
        page = int(request.GET.get('page', 1))
        per_page = 10
        start = (page - 1) * per_page
        end = start + per_page
        
        reviews_data = [{
            'id': r.id,
            'user': {
                'name': r.user.get_full_name() or r.user.username,
                'username': r.user.username,
                'avatar': None,  # Add avatar field to User model if needed
            },
            'rating': r.rating,
            'title': r.title,
            'comment': r.comment,
            'is_verified_purchase': r.is_verified_purchase,
            'helpful_count': r.helpful_count,
            'created_at': r.created_at.isoformat(),
        } for r in reviews[start:end]]
        
        return JsonResponse({
            'reviews': reviews_data,
            'total': reviews.count(),
            'page': page,
            'per_page': per_page,
        })
    except Product.DoesNotExist:
        return JsonResponse({'error': 'Product not found'}, status=404)

@require_POST
@login_required
def create_review_api(request, product_slug):
    """
    Create a new review for a product.
    """
    try:
        product = Product.objects.get(slug=product_slug, is_active=True)
        data = json.loads(request.body)
        
        # Check if user already reviewed this product
        if Review.objects.filter(product=product, user=request.user).exists():
            return JsonResponse({'error': 'You have already reviewed this product'}, status=400)
        
        # Validate rating
        rating = data.get('rating')
        if not rating or not (1 <= int(rating) <= 5):
            return JsonResponse({'error': 'Rating must be between 1 and 5'}, status=400)
        
        # Check if user purchased this product (optional)
        has_purchased = request.user.orders.filter(
            items__product=product,
            status='delivered'
        ).exists()
        
        review = Review.objects.create(
            product=product,
            user=request.user,
            rating=int(rating),
            title=data.get('title', ''),
            comment=data.get('comment', ''),
            is_verified_purchase=has_purchased
        )
        
        return JsonResponse({
            'message': 'Review created successfully',
            'review': {
                'id': review.id,
                'rating': review.rating,
                'title': review.title,
                'comment': review.comment,
                'is_verified_purchase': review.is_verified_purchase,
                'created_at': review.created_at.isoformat(),
            }
        }, status=201)
        
    except Product.DoesNotExist:
        return JsonResponse({'error': 'Product not found'}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@require_POST
@login_required
def mark_review_helpful_api(request, review_id):
    """
    Mark a review as helpful.
    """
    try:
        review = Review.objects.get(id=review_id)
        review.helpful_count += 1
        review.save()
        
        return JsonResponse({
            'message': 'Review marked as helpful',
            'helpful_count': review.helpful_count
        })
    except Review.DoesNotExist:
        return JsonResponse({'error': 'Review not found'}, status=404)
