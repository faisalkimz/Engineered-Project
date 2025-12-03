from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.core.paginator import Paginator
from django.db.models import Q, Avg, Count, F
from .models import Product, Category, Brand
from apps.reviews.models import Review

@require_GET
def product_list_api(request):
    """
    API endpoint for product listing with filtering, search, and pagination.
    """
    products = Product.objects.filter(is_active=True).select_related('category', 'brand').prefetch_related('images', 'reviews')
    
    # Filtering by category
    category_slug = request.GET.get('category')
    if category_slug and category_slug != 'all':
        products = products.filter(category__slug=category_slug)
    
    # Filtering by brand
    brand_slug = request.GET.get('brand')
    if brand_slug:
        products = products.filter(brand__slug=brand_slug)
    
    # Price range filter
    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')
    if min_price:
        products = products.filter(price__gte=min_price)
    if max_price:
        products = products.filter(price__lte=max_price)
    
    # Search query
    search = request.GET.get('search', '').strip()
    if search:
        products = products.filter(
            Q(name__icontains=search) |
            Q(description__icontains=search) |
            Q(brand__name__icontains=search)
        )
    
    # Sorting
    sort_by = request.GET.get('sort', 'featured')
    if sort_by == 'price-low':
        products = products.order_by('price')
    elif sort_by == 'price-high':
        products = products.order_by('-price')
    elif sort_by == 'newest':
        products = products.order_by('-created_at')
    elif sort_by == 'rating':
        products = products.annotate(avg_rating=Avg('reviews__rating')).order_by('-avg_rating')
    else:  # featured
        products = products.order_by('-is_featured', '-created_at')
    
    # Pagination
    page_number = request.GET.get('page', 1)
    per_page = int(request.GET.get('per_page', 12))
    paginator = Paginator(products, per_page)
    page_obj = paginator.get_page(page_number)
    
    # Serialize products
    products_data = []
    for product in page_obj:
        primary_image = product.images.filter(is_primary=True).first() or product.images.first()
        avg_rating = product.reviews.aggregate(Avg('rating'))['rating__avg'] or 0
        review_count = product.reviews.count()
        
        # Generate placeholder image if no image exists
        image_url = None
        if primary_image:
            image_url = request.build_absolute_uri(primary_image.image.url)
        else:
            # Use category-specific placeholder images from Unsplash
            placeholders = {
                'smartphones': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
                'laptops': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
                'tablets': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
                'smartwatches': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
                'headphones': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
                'cameras': 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400',
                'gaming': 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400',
                'tvs': 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
            }
            image_url = placeholders.get(product.category.slug, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400')
        
        products_data.append({
            'id': product.id,
            'name': product.name,
            'slug': product.slug,
            'price': float(product.price),
            'compare_at_price': float(product.compare_at_price) if product.compare_at_price else None,
            'discount_percent': int(((float(product.compare_at_price) - float(product.price)) / float(product.compare_at_price)) * 100) if product.compare_at_price else 0,
            'image': image_url,
            'category': product.category.name,
            'category_slug': product.category.slug,
            'brand': product.brand.name if product.brand else None,
            'brand_slug': product.brand.slug if product.brand else None,
            'is_featured': product.is_featured,
            'in_stock': product.stock_quantity > 0,
            'stock_quantity': product.stock_quantity,
            'rating': round(avg_rating, 1),
            'review_count': review_count,
        })
    
    return JsonResponse({
        'results': products_data,  # For pagination compatibility
        'products': products_data,  # For direct access
        'count': paginator.count,  # Total count
        'pagination': {
            'total': paginator.count,
            'per_page': per_page,
            'current_page': page_obj.number,
            'total_pages': paginator.num_pages,
            'has_next': page_obj.has_next(),
            'has_previous': page_obj.has_previous(),
        }
    })

@require_GET
def product_detail_api(request, slug):
    """
    API endpoint for product detail page.
    """
    try:
        product = Product.objects.select_related('category', 'brand').prefetch_related(
            'images', 'variants', 'reviews__user'
        ).get(slug=slug, is_active=True)
        
        # Increment views count
        Product.objects.filter(id=product.id).update(views_count=F('views_count') + 1)
        
        # Get all images
        images = [{
            'id': img.id,
            'url': request.build_absolute_uri(img.image.url),
            'alt': img.alt_text or product.name,
            'is_primary': img.is_primary,
        } for img in product.images.all()]
        
        # Get variants
        variants = [{
            'id': v.id,
            'name': v.name,
            'sku': v.sku,
            'price': float(v.price),
            'stock': v.stock,
            'attributes': v.attributes,
            'in_stock': v.stock > 0,
        } for v in product.variants.all()]
        
        # Get reviews with ratings summary
        reviews_qs = product.reviews.all()
        reviews_data = [{
            'id': r.id,
            'user': {
                'name': r.user.get_full_name() or r.user.username,
                'username': r.user.username,
            },
            'rating': r.rating,
            'title': r.title,
            'comment': r.comment,
            'is_verified_purchase': r.is_verified_purchase,
            'helpful_count': r.helpful_count,
            'created_at': r.created_at.isoformat(),
        } for r in reviews_qs[:5]]  # Top 5 reviews
        
        # Ratings summary
        rating_counts = {i: 0 for i in range(1, 6)}
        for r in reviews_qs:
            rating_counts[r.rating] = rating_counts.get(r.rating, 0) + 1
        
        avg_rating = reviews_qs.aggregate(Avg('rating'))['rating__avg'] or 0
        
        # Related products (same category)
        related_products = Product.objects.filter(
            category=product.category,
            is_active=True
        ).exclude(id=product.id).annotate(
            avg_rating=Avg('reviews__rating')
        )[:4]
        
        related_data = []
        for rp in related_products:
            rp_image = rp.images.filter(is_primary=True).first() or rp.images.first()
            related_data.append({
                'id': rp.id,
                'name': rp.name,
                'slug': rp.slug,
                'price': float(rp.price),
                'image': request.build_absolute_uri(rp_image.image.url) if rp_image else None,
                'rating': round(rp.avg_rating or 0, 1),
            })
        
        return JsonResponse({
            'product': {
                'id': product.id,
                'name': product.name,
                'slug': product.slug,
                'description': product.description,
                'price': float(product.price),
                'compare_at_price': float(product.compare_at_price) if product.compare_at_price else None,
                'discount_percent': int(((float(product.compare_at_price) - float(product.price)) / float(product.compare_at_price)) * 100) if product.compare_at_price else 0,
                'sku': product.sku,
                'category': {
                    'name': product.category.name,
                    'slug': product.category.slug,
                },
                'brand': {
                    'name': product.brand.name,
                    'slug': product.brand.slug,
                } if product.brand else None,
                'stock_quantity': product.stock_quantity,
                'in_stock': product.stock_quantity > 0,
                'low_stock': product.stock_quantity > 0 and product.stock_quantity <= product.low_stock_threshold,
                'specifications': product.specifications,
                'warranty_info': product.warranty_info,
                'images': images,
                'variants': variants,
                'rating': {
                    'average': round(avg_rating, 1),
                    'count': reviews_qs.count(),
                    'distribution': rating_counts,
                },
                'views_count': product.views_count,
            },
            'reviews': reviews_data,
            'related_products': related_data,
        })
    except Product.DoesNotExist:
        return JsonResponse({'error': 'Product not found'}, status=404)

@require_GET
def categories_api(request):
    """
    API endpoint for categories list.
    """
    categories = Category.objects.filter(is_active=True).annotate(
        product_count=Count('products', filter=Q(products__is_active=True))
    )
    
    categories_data = [{
        'id': cat.id,
        'name': cat.name,
        'slug': cat.slug,
        'description': cat.description,
        'product_count': cat.product_count,
        'icon': request.build_absolute_uri(cat.icon.url) if cat.icon else None,
    } for cat in categories]
    
    return JsonResponse({'categories': categories_data})

@require_GET
def brands_api(request):
    """
    API endpoint for brands list.
    """
    brands = Brand.objects.annotate(
        product_count=Count('products', filter=Q(products__is_active=True))
    )
    
    brands_data = [{
        'id': brand.id,
        'name': brand.name,
        'slug': brand.slug,
        'product_count': brand.product_count,
        'logo': request.build_absolute_uri(brand.logo.url) if brand.logo else None,
    } for brand in brands]
    
    return JsonResponse({'brands': brands_data})

@require_GET
def featured_products_api(request):
    """
    API endpoint for featured products (for homepage).
    """
    featured = Product.objects.filter(is_active=True, is_featured=True).select_related(
        'category', 'brand'
    ).prefetch_related('images', 'reviews')[:8]
    
    products_data = []
    for product in featured:
        primary_image = product.images.filter(is_primary=True).first() or product.images.first()
        avg_rating = product.reviews.aggregate(Avg('rating'))['rating__avg'] or 0
        
        # Generate placeholder image if no image exists
        image_url = None
        if primary_image:
            image_url = request.build_absolute_uri(primary_image.image.url)
        else:
            placeholders = {
                'smartphones': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
                'laptops': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
                'tablets': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
                'smartwatches': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
                'headphones': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
                'cameras': 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400',
                'gaming': 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400',
                'tvs': 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
            }
            image_url = placeholders.get(product.category.slug, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400')
        
        products_data.append({
            'id': product.id,
            'name': product.name,
            'slug': product.slug,
            'price': float(product.price),
            'compare_at_price': float(product.compare_at_price) if product.compare_at_price else None,
            'image': image_url,
            'category': product.category.name,
            'brand': product.brand.name if product.brand else None,
            'rating': round(avg_rating, 1),
            'review_count': product.reviews.count(),
        })
    
    return JsonResponse({'products': products_data})
