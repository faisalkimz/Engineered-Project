from django.urls import path
from . import views
from . import api_views

urlpatterns = [
    # Inertia Views
    path('login/', views.login_view, name='login'),
    path('login/action/', views.login_action, name='login_action'),
    path('register/', views.register_view, name='register'),
    path('register/action/', views.register_action, name='register_action'),
    path('logout/', views.logout_action, name='logout'),
    path('profile/', views.profile_view, name='profile'),
    
    # API Endpoints (JSON)
    path('api/login/', api_views.login_api, name='api_login'),
    path('api/register/', api_views.register_api, name='api_register'),
    path('api/logout/', api_views.logout_api, name='api_logout'),
    path('api/user/', api_views.user_api, name='api_user'),
]
