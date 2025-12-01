from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('login/action/', views.login_action, name='login_action'),
    path('register/', views.register_view, name='register'),
    path('register/action/', views.register_action, name='register_action'),
    path('logout/', views.logout_action, name='logout'),
    path('profile/', views.profile_view, name='profile'),
]
