from django.urls import path
from . import views
from . import api_views

urlpatterns = [
    # Template views
    path('checkout/', views.checkout_view, name='checkout'),
    path('checkout/place/', views.place_order, name='place_order'),
    path('checkout/success/<str:order_number>/', views.order_success, name='order_success'),
    path('history/', views.order_history, name='order_history'),
    
    # API endpoints
    path('api/orders/', api_views.get_orders, name='api_get_orders'),
    path('api/orders/<str:order_number>/', api_views.get_order, name='api_get_order'),
    path('api/orders/create/', api_views.create_order, name='api_create_order'),
    path('api/orders/<str:order_number>/cancel/', api_views.cancel_order, name='api_cancel_order'),
]
