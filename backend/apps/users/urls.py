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
    
    # ================================
    # API Endpoints (JSON)
    # ================================
    
    # Authentication
    path('api/login/', api_views.login_api, name='api_login'),
    path('api/register/', api_views.register_api, name='api_register'),
    path('api/logout/', api_views.logout_api, name='api_logout'),
    path('api/user/', api_views.user_api, name='api_user'),
    
    # Profile Management
    path('api/profile/', api_views.profile_detail, name='api_profile_detail'),
    path('api/profile/update/', api_views.profile_update, name='api_profile_update'),
    path('api/profile/avatar/', api_views.avatar_upload, name='api_avatar_upload'),
    path('api/profile/avatar/delete/', api_views.avatar_delete, name='api_avatar_delete'),
    path('api/profile/stats/', api_views.user_stats, name='api_user_stats'),
    
    # Address Management
    path('api/addresses/', api_views.address_list_create, name='api_address_list_create'),
    path('api/addresses/<int:address_id>/', api_views.address_detail, name='api_address_detail'),
    path('api/addresses/<int:address_id>/set-default/', api_views.address_set_default, name='api_address_set_default'),
]

