from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils.text import slugify
from apps.core.models import TimeStampedModel

class Category(TimeStampedModel):
    """
    Product category model with hierarchical support.
    """
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255, blank=True)
    description = models.TextField(blank=True)
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='children')
    icon = models.ImageField(upload_to='categories/icons/', blank=True, null=True)
    image = models.ImageField(upload_to='categories/images/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['order', 'name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Brand(TimeStampedModel):
    """
    Product brand model.
    """
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255, blank=True)
    logo = models.ImageField(upload_to='brands/', blank=True, null=True)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Product(TimeStampedModel):
    """
    Main product model.
    """
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255, blank=True)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True, blank=True, related_name='products')
    sku = models.CharField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    compare_at_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    cost_per_item = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    stock_quantity = models.PositiveIntegerField(default=0)
    low_stock_threshold = models.PositiveIntegerField(default=5)
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    specifications = models.JSONField(default=dict, blank=True)
    warranty_info = models.CharField(max_length=255, blank=True)
    views_count = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['category', 'is_active']),
            models.Index(fields=['brand', 'is_active']),
            models.Index(fields=['is_active', '-created_at']),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    @property
    def primary_image(self):
        return self.images.filter(is_primary=True).first() or self.images.first()

class ProductImage(models.Model):
    """
    Images for products.
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/')
    alt_text = models.CharField(max_length=255, blank=True)
    is_primary = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def save(self, *args, **kwargs):
        if self.is_primary:
            # Set all other images of this product to not primary
            ProductImage.objects.filter(product=self.product, is_primary=True).update(is_primary=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Image for {self.product.name}"

class ProductVariant(models.Model):
    """
    Variants for products (e.g., different colors, storage).
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    name = models.CharField(max_length=255)  # e.g., "128GB Black"
    sku = models.CharField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    attributes = models.JSONField(default=dict)  # e.g., {"color": "Black", "storage": "128GB"}

    def __str__(self):
        return f"{self.product.name} - {self.name}"
