from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.db.models import F, Sum
import json
from .models import Cart, CartItem
from apps.products.models import Product, ProductVariant


@csrf_exempt
@require_http_methods(["GET"])
def get_cart(request):
    """Get cart for current user or session"""
    if request.user.is_authenticated:
        cart, _ = Cart.objects.get_or_create(user=request.user)
    else:
        session_key = request.session.session_key
        if not session_key:
            request.session.create()
            session_key = request.session.session_key
        cart, _ = Cart.objects.get_or_create(session_key=session_key)
    
    # Get cart items with product details
    items = []
    for item in cart.items.select_related('product', 'variant').all():
        items.append({
            'id': item.id,
            'product': {
                'id': item.product.id,
                'name': item.product.name,
                'slug': item.product.slug,
                'image': item.product.image.url if item.product.image else None,
                'price': float(item.product.price),
            },
            'variant': {
                'id': item.variant.id if item.variant else None,
                'name': item.variant.name if item.variant else None,
                'price': float(item.variant.price) if item.variant else None,
            } if item.variant else None,
            'quantity': item.quantity,
            'price': float(item.price),
            'total': float(item.total),
        })
    
    # Calculate totals
    subtotal = sum(item['total'] for item in items)
    
    return JsonResponse({
        'success': True,
        'cart': {
            'id': cart.id,
            'items': items,
            'item_count': cart.items.count(),
            'subtotal': subtotal,
            'shipping': 0.00,  # Calculate based on your logic
            'tax': subtotal * 0.1,  # 10% tax example
            'total': subtotal * 1.1,
        }
    })


@csrf_exempt
@require_http_methods(["POST"])
def add_to_cart(request):
    """Add product to cart"""
    try:
        data = json.loads(request.body)
        product_id = data.get('product_id')
        variant_id = data.get('variant_id')
        quantity = int(data.get('quantity', 1))
        
        if not product_id:
            return JsonResponse({'success': False, 'error': 'Product ID required'}, status=400)
        
        product = Product.objects.get(id=product_id)
        variant = ProductVariant.objects.get(id=variant_id) if variant_id else None
        
        # Get or create cart
        if request.user.is_authenticated:
            cart, _ = Cart.objects.get_or_create(user=request.user)
        else:
            session_key = request.session.session_key
            if not session_key:
                request.session.create()
                session_key = request.session.session_key
            cart, _ = Cart.objects.get_or_create(session_key=session_key)
        
        # Add or update cart item
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            variant=variant,
            defaults={'quantity': quantity}
        )
        
        if not created:
            cart_item.quantity += quantity
            cart_item.save()
        
        return JsonResponse({
            'success': True,
            'message': 'Product added to cart',
            'cart_item': {
                'id': cart_item.id,
                'quantity': cart_item.quantity,
            }
        })
        
    except Product.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'Product not found'}, status=404)
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=400)


@csrf_exempt
@require_http_methods(["POST"])
def update_cart_item(request, item_id):
    """Update cart item quantity"""
    try:
        data = json.loads(request.body)
        quantity = int(data.get('quantity', 1))
        
        if request.user.is_authenticated:
            cart_item = CartItem.objects.get(id=item_id, cart__user=request.user)
        else:
            session_key = request.session.session_key
            cart_item = CartItem.objects.get(id=item_id, cart__session_key=session_key)
        
        if quantity <= 0:
            cart_item.delete()
            return JsonResponse({
                'success': True,
                'message': 'Item removed from cart'
            })
        
        cart_item.quantity = quantity
        cart_item.save()
        
        return JsonResponse({
            'success': True,
            'message': 'Cart updated',
            'cart_item': {
                'id': cart_item.id,
                'quantity': cart_item.quantity,
                'total': float(cart_item.total),
            }
        })
        
    except CartItem.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'Cart item not found'}, status=404)
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=400)


@csrf_exempt
@require_http_methods(["DELETE"])
def remove_from_cart(request, item_id):
    """Remove item from cart"""
    try:
        if request.user.is_authenticated:
            cart_item = CartItem.objects.get(id=item_id, cart__user=request.user)
        else:
            session_key = request.session.session_key
            cart_item = CartItem.objects.get(id=item_id, cart__session_key=session_key)
        
        cart_item.delete()
        
        return JsonResponse({
            'success': True,
            'message': 'Item removed from cart'
        })
        
    except CartItem.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'Cart item not found'}, status=404)
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=400)


@csrf_exempt
@require_http_methods(["POST"])
def clear_cart(request):
    """Clear all items from cart"""
    try:
        if request.user.is_authenticated:
            cart = Cart.objects.get(user=request.user)
        else:
            session_key = request.session.session_key
            cart = Cart.objects.get(session_key=session_key)
        
        cart.items.all().delete()
        
        return JsonResponse({
            'success': True,
            'message': 'Cart cleared'
        })
        
    except Cart.DoesNotExist:
        return JsonResponse({'success': True, 'message': 'Cart already empty'})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=400)
