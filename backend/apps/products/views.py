from inertia import render
from django.core.paginator import Paginator
from .models import Product, Category, Brand

def product_list(request):
    products = Product.objects.filter(is_active=True)
    
    # Filtering
    category_slug = request.GET.get('category')
    if category_slug:
        products = products.filter(category__slug=category_slug)
        
    brand_slug = request.GET.get('brand')
    if brand_slug:
        products = products.filter(brand__slug=brand_slug)
        
    search_query = request.GET.get('search')
    if search_query:
        products = products.filter(name__icontains=search_query)

    # Pagination
    paginator = Paginator(products, 12)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'Products/Index', props={
        'products': {
            'data': [
                {
                    'id': p.id,
                    'name': p.name,
                    'slug': p.slug,
                    'price': str(p.price),
                    'image': p.primary_image.image.url if p.primary_image else None,
                    'category': p.category.name,
                    'brand': p.brand.name if p.brand else None,
                } for p in page_obj
            ],
            'links': {
                'next': page_obj.has_next(),
                'previous': page_obj.has_previous(),
                'num_pages': paginator.num_pages,
                'current_page': page_obj.number,
            }
        },
        'categories': list(Category.objects.filter(is_active=True).values('name', 'slug')),
        'brands': list(Brand.objects.values('name', 'slug')),
        'filters': {
            'category': category_slug,
            'brand': brand_slug,
            'search': search_query,
        }
    })

def product_detail(request, slug):
    product = Product.objects.get(slug=slug, is_active=True)
    
    return render(request, 'Products/Show', props={
        'product': {
            'id': product.id,
            'name': product.name,
            'slug': product.slug,
            'description': product.description,
            'price': str(product.price),
            'stock': product.stock_quantity,
            'images': [
                {
                    'id': img.id,
                    'url': img.image.url,
                    'alt': img.alt_text,
                    'is_primary': img.is_primary
                } for img in product.images.all()
            ],
            'variants': [
                {
                    'id': v.id,
                    'name': v.name,
                    'price': str(v.price),
                    'stock': v.stock,
                    'attributes': v.attributes
                } for v in product.variants.all()
            ],
            'specifications': product.specifications,
        }
    })
