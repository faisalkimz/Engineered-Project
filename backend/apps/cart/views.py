from inertia import render
from django.shortcuts import get_object_or_404, redirect
from django.views.decorators.http import require_POST
from .models import Cart, CartItem
from apps.products.models import Product, ProductVariant
import uuid

def _get_cart(request):
    if request.user.is_authenticated:
        cart, _ = Cart.objects.get_or_create(user=request.user)
    else:
        session_id = request.session.get('cart_session_id')
        if not session_id:
            session_id = str(uuid.uuid4())
            request.session['cart_session_id'] = session_id
        cart, _ = Cart.objects.get_or_create(session_id=session_id, user=None)
    return cart

def cart_detail(request):
    cart = _get_cart(request)
    items = []
    for item in cart.items.select_related('product', 'variant').all():
        items.append({
            'id': item.id,
            'product': {
                'id': item.product.id,
                'name': item.product.name,
                'slug': item.product.slug,
                'image': item.product.primary_image.image.url if item.product.primary_image else None,
            },
            'variant': item.variant.name if item.variant else None,
            'price': str(item.price),
            'quantity': item.quantity,
            'total': str(item.total_price),
        })

    return render(request, 'Cart/Index', props={
        'cart': {
            'items': items,
            'total': str(cart.total_price),
        }
    })

@require_POST
def add_to_cart(request):
    product_id = request.POST.get('product_id')
    variant_id = request.POST.get('variant_id')
    quantity = int(request.POST.get('quantity', 1))

    product = get_object_or_404(Product, id=product_id)
    variant = None
    if variant_id:
        variant = get_object_or_404(ProductVariant, id=variant_id)

    cart = _get_cart(request)
    
    item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product,
        variant=variant,
        defaults={'quantity': quantity}
    )

    if not created:
        item.quantity += quantity
        item.save()

    return redirect('cart_detail')

@require_POST
def update_cart_item(request, item_id):
    cart = _get_cart(request)
    item = get_object_or_404(CartItem, id=item_id, cart=cart)
    quantity = int(request.POST.get('quantity', 1))
    
    if quantity > 0:
        item.quantity = quantity
        item.save()
    else:
        item.delete()
        
    return redirect('cart_detail')

@require_POST
def remove_cart_item(request, item_id):
    cart = _get_cart(request)
    item = get_object_or_404(CartItem, id=item_id, cart=cart)
    item.delete()
    return redirect('cart_detail')
