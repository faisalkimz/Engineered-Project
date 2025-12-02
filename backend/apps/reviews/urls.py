from django.urls import path
from . import api_views

urlpatterns = [
    # Review API endpoints
    path('api/products/<slug:product_slug>/reviews/', api_views.reviews_list_api, name='api_reviews_list'),
    path('api/products/<slug:product_slug>/reviews/create/', api_views.create_review_api, name='api_create_review'),
    path('api/reviews/<int:review_id>/helpful/', api_views.mark_review_helpful_api, name='api_mark_helpful'),
]
