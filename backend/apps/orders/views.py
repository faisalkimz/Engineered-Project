from inertia import render
from django.shortcuts import redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.db import transaction
from apps.cart.models import Cart
from apps.orders.models import Order, OrderItem
from apps.cart.views import _get_cart

@login_required
def checkout_view(request):
    cart = _get_cart(request)
    if not cart.items.exists():
        return redirect('cart_detail')
        
    return render(request, 'Checkout/Index', props={
        'cart': {
            'total': str(cart.total_price),
            'items': [
                {
                    'id': item.id,
                    'product_name': item.product.name,
                    'quantity': item.quantity,
                    'price': str(item.price),
                    'total': str(item.total_price),
                } for item in cart.items.all()
            ]
        },
        'user': {
            'first_name': request.user.first_name,
            'last_name': request.user.last_name,
            'email': request.user.email,
        }
    })

@login_required
@transaction.atomic
def place_order(request):
    if request.method != 'POST':
        return redirect('checkout_view')
        
    cart = _get_cart(request)
    if not cart.items.exists():
        return redirect('cart_detail')

    # Create Order
    order = Order.objects.create(
        user=request.user,
        subtotal=cart.total_price,
        total=cart.total_price, # Add tax/shipping logic here
        shipping_address=request.POST.get('shipping_address', {}), # Simplify for now
        billing_address=request.POST.get('billing_address', {}),
        payment_method='stripe', # Default for now
        status=Order.Status.PENDING
    )

    # Create Order Items
    for item in cart.items.all():
        OrderItem.objects.create(
            order=order,
            product=item.product,
            product_name=item.product.name,
            quantity=item.quantity,
            price_per_unit=item.price,
            total=item.total_price
        )

    # Clear Cart
    cart.items.all().delete()
    
    return redirect('order_success', order_number=order.order_number)

@login_required
def order_success(request, order_number):
    order = get_object_or_404(Order, order_number=order_number, user=request.user)
    return render(request, 'Checkout/Success', props={
        'order': {
            'number': order.order_number,
            'total': str(order.total),
        }
    })

@login_required
def order_history(request):
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'Orders/Index', props={
        'orders': [
            {
                'number': order.order_number,
                'date': order.created_at.strftime('%Y-%m-%d'),
                'total': str(order.total),
                'status': order.get_status_display(),
                'items_count': order.items.count(),
            } for order in orders
        ]
    })
