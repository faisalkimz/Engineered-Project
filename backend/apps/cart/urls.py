from django.urls import path
from . import views

urlpatterns = [
    path('', views.cart_detail, name='cart_detail'),
    path('add/', views.add_to_cart, name='add_to_cart'),
    path('update/<uuid:item_id>/', views.update_cart_item, name='update_cart_item'),
    path('remove/<uuid:item_id>/', views.remove_cart_item, name='remove_cart_item'),
]
