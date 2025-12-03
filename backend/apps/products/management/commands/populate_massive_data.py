from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.products.models import Category, Brand, Product
from apps.reviews.models import Review
from decimal import Decimal
import random

User = get_user_model()


class Command(BaseCommand):
    help = 'Populate database with TONS of sample e-commerce data'

    def handle(self, *args, **kwargs):
        self.stdout.write('🚀 Starting MASSIVE data population...\n')
        
        # Create categories
        categories_data = [
            {'name': 'Smartphones', 'slug': 'smartphones', 'description': 'Latest flagship smartphones'},
            {'name': 'Laptops', 'slug': 'laptops', 'description': 'Powerful computing devices'},
            {'name': 'Tablets', 'slug': 'tablets', 'description': 'Portable tablets for work and play'},
            {'name': 'Smartwatches', 'slug': 'smartwatches', 'description': 'Wearable technology'},
            {'name': 'Headphones', 'slug': 'headphones', 'description': 'Premium audio devices'},
            {'name': 'Cameras', 'slug': 'cameras', 'description': 'Professional and consumer cameras'},
            {'name': 'Gaming', 'slug': 'gaming', 'description': 'Gaming consoles and accessories'},
            {'name': 'TVs', 'slug': 'tvs', 'description': 'Smart TVs and displays'},
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
            'Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Huawei', 'Oppo', 'Vivo', 'Realme', 'Nokia',
            'Dell', 'HP', 'Lenovo', 'ASUS', 'Microsoft', 'Acer', 'MSI', 'Razer', 'Alienware', 'LG',
            'Sony', 'Bose', 'Canon', 'Nikon', 'GoPro', 'DJI', 'Fujifilm', 'Panasonic', 'JBL', 'Sennheiser',
            'Nintendo', 'PlayStation', 'Xbox',  'Logitech', 'Corsair', 'SteelSeries'
        ]
        
        brands = {}
        for brand_name in brands_data:
            brand, created = Brand.objects.get_or_create(
                name=brand_name,
                defaults={'slug': brand_name.lower().replace(' ', '-')}
            )
            brands[brand_name] = brand
        
        self.stdout.write(f'✅ Created {len(brands_data)} brands\n')
        
        # MASSIVE product templates
        smartphone_models = [
            'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro', 'iPhone 14',
            'Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy Z Fold 5', 'Galaxy Z Flip 5',
            'Pixel 8 Pro', 'Pixel 8', 'Pixel 7a', 'Pixel Fold',
            'OnePlus 12', 'OnePlus 11', 'OnePlus Open',
            'Xiaomi 14 Pro', 'Xiaomi 13T Pro', 'Redmi Note 13 Pro',
        ]
        
        laptop_models = [
            'MacBook Pro 16"', 'MacBook Pro 14"', 'MacBook Air 15"', 'MacBook Air 13"',
            'XPS 15', 'XPS 13', 'Inspiron 15', 'Alienware M16',
            'Spectre x360', 'Envy 15', 'Pavilion 15', 'Omen 16',
            'ThinkPad X1 Carbon', 'IdeaPad Slim 5', 'Legion 5 Pro',
            'ROG Zephyrus', 'VivoBook Pro', 'ZenBook 14',
            'Surface Laptop 5', 'Surface Pro 9',
        ]
        
        tablet_models = [
            'iPad Pro 12.9"', 'iPad Pro 11"', 'iPad Air', 'iPad mini',
            'Galaxy Tab S9 Ultra', 'Galaxy Tab S9+', 'Galaxy Tab S9',
            'Surface Pro 9', 'Surface Go 3',
        ]
        
        smartwatch_models = [
            'Apple Watch Ultra 2', 'Apple Watch Series 9', 'Apple Watch SE',
            'Galaxy Watch 6 Classic', 'Galaxy Watch 6', 'Galaxy Watch FE',
            'Pixel Watch 2',
        ]
        
        headphone_models = [
            'AirPods Pro 2', 'AirPods Max', 'AirPods 3',
            'WH-1000XM5', 'WH-1000XM4', 'WF-1000XM5', 'LinkBuds S',
            'QuietComfort Ultra', 'QuietComfort 45', 'Sport Earbuds',
            'Momentum 4', 'HD 660S2',
        ]
        
        camera_models = [
            'EOS R5', 'EOS R6 Mark II', 'EOS R8', 'EOS R50',
            'Z9', 'Z8', 'Z6 III', 'Z5',
            'Alpha 7 IV', 'Alpha 7R V', 'Alpha 6700',
            'X-T5', 'X-S20', 'X100V',
            'Hero 12 Black', 'Hero 11 Black',
        ]
        
        tv_models = [
            'OLED C3 65"', 'OLED C3 55"', 'OLED G3 77"',
            'Neo QLED QN90C 65"', 'QLED Q80C 55"',
            'Bravia XR A95L', 'Bravia XR A80L',
        ]
        
        # Generate products
        created_count = 0
        
        # Smartphones
        for i, model in enumerate(smartphone_models):
            brand_name = 'Apple' if 'iPhone' in model else 'Samsung' if 'Galaxy' in model else 'Google' if 'Pixel' in model else 'OnePlus' if 'OnePlus' in model else 'Xiaomi'
            price = round(random.uniform(299, 1599), 2)
            
            for variant in ['64GB', '128GB', '256GB', '512GB']:
                variant_price = price + (64 if '512' in variant else 32 if '256' in variant else 16 if '128' in variant else 0)
                sku = f'PHONE-{i}-{variant[:3]}-{random.randint(10000, 99999)}'
                
                product, created = Product.objects.get_or_create(
                    sku=sku,
                    defaults={
                        'name': f'{model} {variant}',
                        'slug': f'{model.lower().replace(" ", "-").replace("\"", "")}-{variant.lower()}',
                        'brand': brands.get(brand_name, list(brands.values())[0]),
                        'category': categories['smartphones'],
                        'description': f'Premium {model} with {variant} storage. Latest flagship features and cutting-edge technology.',
                        'price': Decimal(str(variant_price)),
                        'stock_quantity': random.randint(10, 100),
                        'is_featured': random.choice([True, False, False, False]),
                        'is_active': True,
                    }
                )
                if created:
                    created_count += 1
        
        # Laptops
        for i, model in enumerate(laptop_models):
            brand_name = 'Apple' if 'MacBook' in model else 'Dell' if 'XPS' in model or 'Inspiron' in model or 'Alienware' in model else 'HP' if 'Spectre' in model or 'Envy' in model or 'Pavilion' in model or 'Omen' in model else 'Lenovo' if 'ThinkPad' in model or 'IdeaPad' in model or 'Legion' in model else 'ASUS' if 'ROG' in model or 'VivoBook' in model or 'ZenBook' in model else 'Microsoft'
            
            for ram in ['8GB', '16GB', '32GB']:
                for storage in ['256GB', '512GB', '1TB']:
                    price = round(random.uniform(699, 3499), 2)
                    sku = f'LAPTOP-{i}-{ram[:2]}{storage[:3]}-{random.randint(10000, 99999)}'
                    
                    product, created = Product.objects.get_or_create(
                        sku=sku,
                        defaults={
                            'name': f'{model} ({ram} RAM, {storage} SSD)',
                            'slug': f'{model.lower().replace(" ", "-").replace("\"", "")}-{ram.lower()}-{storage.lower()}',
                            'brand': brands.get(brand_name, list(brands.values())[0]),
                            'category': categories['laptops'],
                            'description': f'Powerful {model} laptop with {ram} RAM and {storage} SSD. Perfect for work and play.',
                            'price': Decimal(str(price)),
                            'stock_quantity': random.randint(5, 50),
                            'is_featured': random.choice([True, False, False]),
                            'is_active': True,
                        }
                    )
                    if created:
                        created_count += 1
        
        # Tablets
        for i, model in enumerate(tablet_models):
            brand_name = 'Apple' if 'iPad' in model else 'Samsung' if 'Galaxy' in model else 'Microsoft'
            
            for storage in ['64GB', '128GB', '256GB', '512GB']:
                price = round(random.uniform(349, 1499), 2)
                sku = f'TABLET-{i}-{storage[:3]}-{random.randint(10000, 99999)}'
                
                product, created = Product.objects.get_or_create(
                    sku=sku,
                    defaults={
                        'name': f'{model} {storage}',
                        'slug': f'{model.lower().replace(" ", "-").replace("\"", "")}-{storage.lower()}',
                        'brand': brands.get(brand_name, list(brands.values())[0]),
                        'category': categories['tablets'],
                        'description': f'Versatile {model} tablet with {storage} storage. Perfect for productivity and entertainment.',
                        'price': Decimal(str(price)),
                        'stock_quantity': random.randint(15, 80),
                        'is_featured': random.choice([True, False, False]),
                        'is_active': True,
                    }
                )
                if created:
                    created_count += 1
        
        # Smartwatches  
        for i, model in enumerate(smartwatch_models):
            brand_name = 'Apple' if 'Apple Watch' in model else 'Samsung' if 'Galaxy' in model else 'Google'
            
            for size in ['41mm', '45mm', '49mm']:
                if 'Ultra' in model and size == '41mm':
                    continue
                price = round(random.uniform(199, 899), 2)
                sku = f'WATCH-{i}-{size[:2]}-{random.randint(10000, 99999)}'
                
                product, created = Product.objects.get_or_create(
                    sku=sku,
                    defaults={
                        'name': f'{model} ({size})',
                        'slug': f'{model.lower().replace(" ", "-")}-{size}',
                        'brand': brands.get(brand_name, list(brands.values())[0]),
                        'category': categories['smartwatches'],
                        'description': f'Advanced {model} smartwatch in {size}. Track your health and stay connected.',
                        'price': Decimal(str(price)),
                        'stock_quantity': random.randint(20, 100),
                        'is_featured': random.choice([True, False, False, False]),
                        'is_active': True,
                    }
                )
                if created:
                    created_count += 1
        
        # Headphones
        for i, model in enumerate(headphone_models):
            brand_name = 'Apple' if 'AirPods' in model else 'Sony' if 'WH' in model or 'WF' in model or 'LinkBuds' in model else 'Bose' if 'QuietComfort' in model or 'Sport' in model else 'Sennheiser'
            
            for color in ['Black', 'White', 'Silver']:
                price = round(random.uniform(149, 549), 2)
                sku = f'AUDIO-{i}-{color[:3].upper()}-{random.randint(10000, 99999)}'
                
                product, created = Product.objects.get_or_create(
                    sku=sku,
                    defaults={
                        'name': f'{model} - {color}',
                        'slug': f'{model.lower().replace(" ", "-")}-{color.lower()}',
                        'brand': brands.get(brand_name, list(brands.values())[0]),
                        'category': categories['headphones'],
                        'description': f'Premium {model} headphones in {color}. Exceptional sound quality and comfort.',
                        'price': Decimal(str(price)),
                        'stock_quantity': random.randint(30, 150),
                        'is_featured': random.choice([True, False, False, False]),
                        'is_active': True,
                    }
                )
                if created:
                    created_count += 1
        
        # Cameras
        for i, model in enumerate(camera_models):
            brand_name = 'Canon' if 'EOS' in model else 'Nikon' if 'Z' in model or 'D' in model else 'Sony' if 'Alpha' in model else 'Fujifilm' if 'X-' in model else 'GoPro'
            
            price = round(random.uniform(499, 4999), 2)
            sku = f'CAM-{i}-BODY-{random.randint(10000, 99999)}'
            
            product, created = Product.objects.get_or_create(
                sku=sku,
                defaults={
                    'name': f'{model} (Body Only)',
                    'slug': f'{model.lower().replace(" ", "-")}-body',
                    'brand': brands.get(brand_name, list(brands.values())[0]),
                    'category': categories['cameras'],
                    'description': f'Professional {model} camera body. Capture stunning photos and videos.',
                    'price': Decimal(str(price)),
                    'stock_quantity': random.randint(5, 40),
                    'is_featured': random.choice([True, False, False]),
                    'is_active': True,
                }
            )
            if created:
                created_count += 1
        
        # TVs
        for i, model in enumerate(tv_models):
            brand_name = 'LG' if 'OLED' in model or 'QNED' in model else 'Samsung' if 'QLED' in model else 'Sony'
            
            price = round(random.uniform(899, 4999), 2)
            sku = f'TV-{i}-{random.randint(10000, 99999)}'
            
            product, created = Product.objects.get_or_create(
                sku=sku,
                defaults={
                    'name': f'{model}',
                    'slug': f'{model.lower().replace(" ", "-").replace("\"", "")}',
                    'brand': brands.get(brand_name, list(brands.values())[0]),
                    'category': categories['tvs'],
                    'description': f'Stunning {model} smart TV. Immersive viewing experience with the latest technology.',
                    'price': Decimal(str(price)),
                    'stock_quantity': random.randint(5, 30),
                    'is_featured': random.choice([True, False, False]),
                    'is_active': True,
                }
            )
            if created:
                created_count += 1
        
        self.stdout.write(self.style.SUCCESS(f'\n\n✨ Database population complete!'))
        self.stdout.write(f'📦 Created {len(categories_data)} categories')
        self.stdout.write(f'🏪 Created {len(brands_data)} brands')
        self.stdout.write(f'📱 Created {created_count} products')
        self.stdout.write('\n🎉 Your e-commerce store is FULLY STOCKED and ready to go!')
