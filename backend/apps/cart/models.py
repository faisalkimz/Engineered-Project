from django.db import models
from django.conf import settings
from apps.core.models import TimeStampedModel
from apps.products.models import Product, ProductVariant

class Cart(TimeStampedModel):
    """
    Shopping cart model.
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='carts', null=True, blank=True)
    session_id = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Cart {self.id} ({self.user.email if self.user else 'Guest'})"

    @property
    def total_price(self):
        return sum(item.total_price for item in self.items.all())

class CartItem(TimeStampedModel):
    """
    Item in the shopping cart.
    """
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    variant = models.ForeignKey(ProductVariant, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('cart', 'product', 'variant')

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"

    @property
    def price(self):
        if self.variant:
            return self.variant.price
        return self.product.price

    @property
    def total_price(self):
        return self.price * self.quantity
