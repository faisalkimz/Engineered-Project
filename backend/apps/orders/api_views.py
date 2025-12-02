from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.db import transaction
import json
from .models import Order, OrderItem
from apps.cart.models import Cart
from apps.products.models import Product


@csrf_exempt
@login_required
@require_http_methods(["GET"])
def get_orders(request):
    """Get all orders for current user"""
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    
    orders_data = []
    for order in orders:
        orders_data.append({
            'id': order.id,
            'order_number': order.order_number,
            'status': order.status,
            'total': float(order.total),
            'created_at': order.created_at.isoformat(),
            'items_count': order.items.count(),
            'items': [{
                'product_name': item.product_name,
                'quantity': item.quantity,
                'price': float(item.price),
                'total': float(item.total),
            } for item in order.items.all()[:3]]  # First 3 items for preview
        })
    
    return JsonResponse({
        'success': True,
        'orders': orders_data,
        'count': orders.count()
    })


@csrf_exempt
@login_required
@require_http_methods(["GET"])
def get_order(request, order_number):
    """Get single order details"""
    try:
        order = Order.objects.get(order_number=order_number, user=request.user)
        
        return JsonResponse({
            'success': True,
            'order': {
                'id': order.id,
                'order_number': order.order_number,
                'status': order.status,
                'subtotal': float(order.subtotal),
                'shipping_cost': float(order.shipping_cost),
                'tax': float(order.tax),
                'total': float(order.total),
                'created_at': order.created_at.isoformat(),
                'updated_at': order.updated_at.isoformat(),
                'shipping_address': {
                    'full_name': order.shipping_full_name,
                    'address_line1': order.shipping_address_line1,
                    'address_line2': order.shipping_address_line2,
                    'city': order.shipping_city,
                    'state': order.shipping_state,
                    'postal_code': order.shipping_postal_code,
                    'country': order.shipping_country,
                    'phone': order.shipping_phone,
                },
                'items': [{
                    'id': item.id,
                    'product_name': item.product_name,
                    'product_sku': item.product_sku,
                    'variant_name': item.variant_name,
                    'quantity': item.quantity,
                    'price': float(item.price),
                    'total': float(item.total),
                } for item in order.items.all()]
            }
        })
        
    except Order.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'Order not found'}, status=404)


@csrf_exempt
@login_required
@require_http_methods(["POST"])
def create_order(request):
    """Create new order from cart"""
    try:
        data = json.loads(request.body)
        
        # Get shipping address from request
        shipping_data = data.get('shipping_address', {})
        
        # Get user's cart
        cart = Cart.objects.get(user=request.user)
        
        if not cart.items.exists():
            return JsonResponse({'success': False, 'error': 'Cart is empty'}, status=400)
        
        # Create order
        with transaction.atomic():
            order = Order.objects.create(
                user=request.user,
                status='pending',
                shipping_full_name=shipping_data.get('full_name', f"{request.user.first_name} {request.user.last_name}"),
                shipping_address_line1=shipping_data.get('address_line1', ''),
                shipping_address_line2=shipping_data.get('address_line2', ''),
                shipping_city=shipping_data.get('city', ''),
                shipping_state=shipping_data.get('state', ''),
                shipping_postal_code=shipping_data.get('postal_code', ''),
                shipping_country=shipping_data.get('country', 'US'),
                shipping_phone=shipping_data.get('phone', ''),
            )
            
            # Create order items from cart
            for cart_item in cart.items.select_related('product', 'variant').all():
                OrderItem.objects.create(
                    order=order,
                    product=cart_item.product,
                    product_name=cart_item.product.name,
                    product_sku=cart_item.product.sku,
                    variant=cart_item.variant,
                    variant_name=cart_item.variant.name if cart_item.variant else '',
                    quantity=cart_item.quantity,
                    price=cart_item.price,
                )
            
            # Calculate totals
            order.calculate_totals()
            
            # Clear cart
            cart.items.all().delete()
        
        return JsonResponse({
            'success': True,
            'message': 'Order created successfully',
            'order': {
                'id': order.id,
                'order_number': order.order_number,
                'total': float(order.total),
            }
        })
        
    except Cart.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'Cart not found'}, status=404)
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=400)


@csrf_exempt
@login_required
@require_http_methods(["POST"])
def cancel_order(request, order_number):
    """Cancel an order"""
    try:
        order = Order.objects.get(order_number=order_number, user=request.user)
        
        if order.status not in ['pending', 'processing']:
            return JsonResponse({
                'success': False,
                'error': 'Order cannot be cancelled'
            }, status=400)
        
        order.status = 'cancelled'
        order.save()
        
        return JsonResponse({
            'success': True,
            'message': 'Order cancelled successfully'
        })
        
    except Order.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'Order not found'}, status=404)
