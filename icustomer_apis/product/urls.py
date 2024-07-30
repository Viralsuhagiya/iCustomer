from django.urls import path
from .views.user_views import UserRegistrationView
from .views.category_views import CategoryListCreateView
from .views.product_views import ProductListCreateView, ProductDetailView

urlpatterns = [
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('register/', UserRegistrationView.as_view(), name='register'),
]