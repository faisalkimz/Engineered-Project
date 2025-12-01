from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from apps.core.models import TimeStampedModel

class User(AbstractUser, TimeStampedModel):
    """
    Custom user model extending AbstractUser and TimeStampedModel.
    """
    class Role(models.TextChoices):
        BUYER = 'buyer', _('Buyer')
        SELLER = 'seller', _('Seller')
        ADMIN = 'admin', _('Admin')

    email = models.EmailField(_('email address'), unique=True)
    role = models.CharField(max_length=10, choices=Role.choices, default=Role.BUYER)
    phone_number = models.CharField(max_length=15, blank=True)
    is_verified = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return self.email

class Address(TimeStampedModel):
    """
    Address model for users.
    """
    class AddressType(models.TextChoices):
        HOME = 'home', _('Home')
        WORK = 'work', _('Work')
        OTHER = 'other', _('Other')

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses')
    full_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)
    address_line1 = models.CharField(max_length=255)
    address_line2 = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    is_default = models.BooleanField(default=False)
    address_type = models.CharField(max_length=10, choices=AddressType.choices, default=AddressType.HOME)

    class Meta:
        verbose_name_plural = 'Addresses'
        ordering = ['-is_default', '-created_at']

    def save(self, *args, **kwargs):
        if self.is_default:
            # Set all other addresses of this user to not default
            Address.objects.filter(user=self.user, is_default=True).update(is_default=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.full_name} - {self.address_line1}, {self.city}"
