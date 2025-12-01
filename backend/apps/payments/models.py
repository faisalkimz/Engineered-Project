from django.db import models
from django.conf import settings
from apps.core.models import TimeStampedModel
from apps.orders.models import Order

class Payment(TimeStampedModel):
    """
    Payment transaction model.
    """
    class PaymentMethod(models.TextChoices):
        CARD = 'card', 'Credit/Debit Card'
        PAYPAL = 'paypal', 'PayPal'
        MPESA = 'mpesa', 'M-Pesa'

    class Status(models.TextChoices):
        PENDING = 'pending', 'Pending'
        COMPLETED = 'completed', 'Completed'
        FAILED = 'failed', 'Failed'
        REFUNDED = 'refunded', 'Refunded'

    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='payments')
    payment_method = models.CharField(max_length=50, choices=PaymentMethod.choices)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    transaction_id = models.CharField(max_length=255, unique=True, blank=True, null=True)
    gateway_response = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return f"Payment {self.id} for Order {self.order.order_number}"
