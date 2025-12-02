from django.urls import path
from . import views, api_views

urlpatterns = [
    # Inertia views
    path('', views.product_list, name='product_list'),
    path('<slug:slug>/', views.product_detail, name='product_detail'),
    
    # API endpoints
    path('api/products/', api_views.product_list_api, name='api_product_list'),
    path('api/products/<slug:slug>/', api_views.product_detail_api, name='api_product_detail'),
    path('api/categories/', api_views.categories_api, name='api_categories'),
    path('api/brands/', api_views.brands_api, name='api_brands'),
    path('api/featured/', api_views.featured_products_api, name='api_featured_products'),
]
