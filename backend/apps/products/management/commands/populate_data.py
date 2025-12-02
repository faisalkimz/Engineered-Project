from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.products.models import Category, Brand, Product, ProductImage, ProductVariant
from apps.reviews.models import Review
from decimal import Decimal
import random

User = get_user_model()


class Command(BaseCommand):
    help = 'Populate database with sample e-commerce data'

    def handle(self, *args, **kwargs):
        self.stdout.write('🚀 Starting data population...\n')
        
        # Create categories
        categories_data = [
            {'name': 'Smartphones', 'slug': 'smartphones', 'description': 'Latest flagship smartphones'},
            {'name': 'Laptops', 'slug': 'laptops', 'description': 'Powerful computing devices'},
            {'name': 'Tablets', 'slug': 'tablets', 'description': 'Portable tablets for work and play'},
            {'name': 'Smartwatches', 'slug': 'smartwatches', 'description': 'Wearable technology'},
            {'name': 'Headphones', 'slug': 'headphones', 'description': 'Premium audio devices'},
            {'name': 'Cameras', 'slug': 'cameras', 'description': 'Professional and consumer camera'},
        ]
        
        categories = {}
        for cat_data in categories_data:
            cat, created = Category.objects.get_or_create(
                slug=cat_data['slug'],
                defaults={'name': cat_data['name'], 'description': cat_data['description']}
            )
            categories[cat_data['slug']] = cat
            self.stdout.write(f'✅ Category: {cat.name}')
        
        # Create brands
        brands_data = [
            'Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi',
            'Dell', 'HP', 'Lenovo', 'ASUS', 'Microsoft',
            'Sony', 'Bose', 'Canon', 'Nikon', 'GoPro'
        ]
        
        brands = {}
        for brand_name in brands_data:
            brand, created = Brand.objects.get_or_create(
                name=brand_name,
                defaults={'slug': brand_name.lower().replace(' ', '-')}
            )
            brands[brand_name] = brand
            self.stdout.write(f'✅ Brand: {brand.name}')
        
        # Create products
        products_data = [
            # Smartphones
            {
                'name': 'iPhone 15 Pro Max',
                'brand': 'Apple',
                'category': 'smartphones',
                'price': 1199.99,
                'description': 'The ultimate iPhone with titanium design, A17 Pro chip, and advanced camera system.',
                'sku': 'APPL-IP15PM-256',
                'stock': 50,
                'featured': True,
                'specs': {
                    'Display': '6.7" Super Retina XDR',
                    'Processor': 'A17 Pro',
                    'RAM': '8GB',
                    'Storage': '256GB',
                    'Camera': '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
                    'Battery': '4422mAh',
                }
            },
            {
                'name': 'Samsung Galaxy S24 Ultra',
                'brand': 'Samsung',
                'category': 'smartphones',
                'price': 1299.99,
                'description': 'Premium flagship with S Pen, 200MP camera, and AI-powered features.',
                'sku': 'SAMS-S24U-512',
                'stock': 40,
                'featured': True,
                'specs': {
                    'Display': '6.8" Dynamic AMOLED 2X',
                    'Processor': 'Snapdragon 8 Gen 3',
                    'RAM': '12GB',
                    'Storage': '512GB',
                    'Camera': '200MP Main + 50MP Periscope + 12MP Ultra Wide',
                    'Battery': '5000mAh',
                }
            },
            {
                'name': 'Google Pixel 8 Pro',
                'brand': 'Google',
                'category': 'smartphones',
                'price': 999.99,
                'description': 'AI-powered photography and pure Android experience.',
                'sku': 'GOOG-P8P-256',
                'stock': 35,
                'featured': True,
                'specs': {
                    'Display': '6.7" LTPO OLED',
                    'Processor': 'Google Tensor G3',
                    'RAM': '12GB',
                    'Storage': '256GB',
                    'Camera': '50MP Main + 48MP Telephoto + 48MP Ultra Wide',
                    'Battery': '5050mAh',
                }
            },
            # Laptops
            {
                'name': 'MacBook Pro 16" M3 Pro',
                'brand': 'Apple',
                'category': 'laptops',
                'price': 2499.99,
                'description': 'Professional laptop with M3 Pro chip, stunning Liquid Retina XDR display.',
                'sku': 'APPL-MBP16-M3P',
                'stock': 25,
                'featured': True,
                'specs': {
                    'Display': '16.2" Liquid Retina XDR',
                    'Processor': 'Apple M3 Pro',
                    'RAM': '18GB',
                    'Storage': '512GB SSD',
                    'Graphics': 'Integrated 18-core GPU',
                    'Battery': 'Up to 22 hours',
                }
            },
            {
                'name': 'Dell XPS 15 9530',
                'brand': 'Dell',
                'category': 'laptops',
                'price': 1799.99,
                'description': 'Premium Windows laptop with OLED display and powerful performance.',
                'sku': 'DELL-XPS15-9530',
                'stock': 30,
                'featured': False,
                'specs': {
                    'Display': '15.6" OLED 3.5K',
                    'Processor': 'Intel Core i7-13700H',
                    'RAM': '16GB DDR5',
                    'Storage': '512GB NVMe SSD',
                    'Graphics': 'NVIDIA RTX 4050',
                    'Battery': 'Up to 13 hours',
                }
            },
            # Tablets
            {
                'name': 'iPad Pro 12.9" M2',
                'brand': 'Apple',
                'category': 'tablets',
                'price': 1099.99,
                'description': 'The ultimate iPad experience with M2 chip and Liquid Retina XDR display.',
                'sku': 'APPL-IPP129-M2',
                'stock': 40,
                'featured': True,
                'specs': {
                    'Display': '12.9" Liquid Retina XDR',
                    'Processor': 'Apple M2',
                    'RAM': '8GB',
                    'Storage': '256GB',
                    'Camera': '12MP Wide + 10MP Ultra Wide',
                    'Battery': 'Up to 10 hours',
                }
            },
            {
                'name': 'Samsung Galaxy Tab S9 Ultra',
                'brand': 'Samsung',
                'category': 'tablets',
                'price': 1199.99,
                'description': 'Massive 14.6" display with S Pen included and desktop-class performance.',
                'sku': 'SAMS-TABS9U-256',
                'stock': 20,
                'featured': False,
                'specs': {
                    'Display': '14.6" Dynamic AMOLED 2X',
                    'Processor': 'Snapdragon 8 Gen 2',
                    'RAM': '12GB',
                    'Storage': '256GB',
                    'Camera': 'Dual 13MP + 8MP',
                    'Battery': '11200mAh',
                }
            },
            # Smartwatches
            {
                'name': 'Apple Watch Ultra 2',
                'brand': 'Apple',
                'category': 'smartwatches',
                'price': 799.99,
                'description': 'Rugged smartwatch for extreme athletes with advanced health tracking.',
                'sku': 'APPL-AWU2-49',
                'stock': 30,
                'featured': True,
                'specs': {
                    'Display': '1.92" Retina LTPO OLED',
                    'Processor': 'Apple S9 SiP',
                    'Storage': '64GB',
                    'Water Resistance': '100m',
                    'Battery': 'Up to 36 hours',
                }
            },
            # Headphones
            {
                'name': 'AirPods Pro (2nd Gen)',
                'brand': 'Apple',
                'category': 'headphones',
                'price': 249.99,
                'description': 'Premium wireless earbuds with active noise cancellation.',
                'sku': 'APPL-APP2-USB',
                'stock': 100,
                'featured': True,
                'specs': {
                    'Type': 'In-ear',
                    'Active Noise Cancellation': 'Yes',
                    'Transparency Mode': 'Yes',
                    'Battery': 'Up to 6 hours (ANC on)',
                    'Charging': 'USB-C',
                }
            },
            {
                'name': 'Sony WH-1000XM5',
                'brand': 'Sony',
                'category': 'headphones',
                'price': 399.99,
                'description': 'Industry-leading noise canceling over-ear headphones.',
                'sku': 'SONY-WH1000XM5',
                'stock': 50,
                'featured': True,
                'specs': {
                    'Type': 'Over-ear',
                    'Active Noise Cancellation': 'Industry-leading',
                    'Driver Size': '30mm',
                    'Battery': 'Up to 30 hours',
                    'Hi-Res Audio': 'Yes',
                }
            },
            {
                'name': 'Bose QuietComfort Ultra',
                'brand': 'Bose',
                'category': 'headphones',
                'price': 429.99,
                'description': 'Premium comfort with spatial audio and world-class noise cancellation.',
                'sku': 'BOSE-QCUL-BLK',
                'stock': 40,
                'featured': False,
                'specs': {
                    'Type': 'Over-ear',
                    'Spatial Audio': 'Immersive',
                    'Noise Cancellation': 'World-class',
                    'Battery': 'Up to 24 hours',
                    'CustomTune': 'Yes',
                }
            },
        ]
        
        created_products = []
        for prod_data in products_data:
            product, created = Product.objects.get_or_create(
                sku=prod_data['sku'],
                defaults={
                    'name': prod_data['name'],
                    'slug': prod_data['name'].lower().replace(' ', '-').replace('"', ''),
                    'brand': brands[prod_data['brand']],
                    'category': categories[prod_data['category']],
                    'description': prod_data['description'],
                    'price': Decimal(str(prod_data['price'])),
                    'stock_quantity': prod_data['stock'],
                    'is_featured': prod_data['featured'],
                    'is_active': True,
                }
            )
            
            if created:
                # Add specifications to JSON field
                product.specifications = prod_data.get('specs', {})
                product.save()
                
                created_products.append(product)
                self.stdout.write(f'✅ Product: {product.name}')
        
        # Create sample reviews
        self.stdout.write('\n📝 Creating sample reviews...')
        
        # Create a test user for reviews
        test_user, created = User.objects.get_or_create(
            email='reviewer@test.com',
            defaults={
                'first_name': 'John',
                'last_name': 'Reviewer',
                'is_active': True,
            }
        )
        if created:
            test_user.set_password('test123')
            test_user.save()
        
        review_texts = [
            "Absolutely love this product! Exceeded my expectations.",
            "Great quality and fast shipping. Highly recommend!",
            "Perfect for my needs. Worth every penny.",
            "Good product but a bit pricey. Still happy with purchase.",
            "Amazing features and build quality. Best purchase this year!",
        ]
        
        for product in created_products[:8]:  # Add reviews to first 8 products
            for i in range(random.randint(3, 7)):
                Review.objects.create(
                    product=product,
                    user=test_user,
                    rating=random.randint(4, 5),
                    comment=random.choice(review_texts),
                    is_verified_purchase=random.choice([True, False]),
                )
        
        self.stdout.write(self.style.SUCCESS('\n\n✨ Database population complete!'))
        self.stdout.write(f'📦 Created {len(categories_data)} categories')
        self.stdout.write(f'🏪 Created {len(brands_data)} brands')
        self.stdout.write(f'📱 Created {len(created_products)} products')
        self.stdout.write(f'⭐ Created reviews for products')
        self.stdout.write('\n🎉 Your e-commerce store is ready to go!')
