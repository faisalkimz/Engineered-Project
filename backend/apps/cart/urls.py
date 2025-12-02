from django.urls import path
from . import views
from . import api_views

urlpatterns = [
    # Template views
    path('', views.cart_detail, name='cart_detail'),
    path('add/', views.add_to_cart, name='add_to_cart'),
    path('update/<uuid:item_id>/', views.update_cart_item, name='update_cart_item'),
    path('remove/<uuid:item_id>/', views.remove_cart_item, name='remove_cart_item'),
    
    # API endpoints
    path('api/cart/', api_views.get_cart, name='api_get_cart'),
    path('api/cart/add/', api_views.add_to_cart, name='api_add_to_cart'),
    path('api/cart/update/<uuid:item_id>/', api_views.update_cart_item, name='api_update_cart_item'),
    path('api/cart/remove/<uuid:item_id>/', api_views.remove_from_cart, name='api_remove_from_cart'),
    path('api/cart/clear/', api_views.clear_cart, name='api_clear_cart'),
]
