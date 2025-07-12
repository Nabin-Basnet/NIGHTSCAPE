from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path

from ecommerce.views import landing
from .views import (
    ProductViewSet, CategoryViewSet, CartViewSet, OrderViewSet,
    OrderItemViewSet, BrandViewSet, WishlistViewSet, UserViewSet,
    UserRegistrationView, MyTokenObtainPairView,

    # ✅ ADD THESE TWO LINES
    admin_all_user_carts, admin_user_cart_detail
)

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

# Router Setup
router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'brands', BrandViewSet, basename='brand')
router.register(r'carts', CartViewSet, basename='cart')  # Custom get_queryset
router.register(r'orders', OrderViewSet, basename='order')  # Custom get_queryset
router.register(r'wishlist', WishlistViewSet, basename='wishlist')  # Custom get_queryset
router.register(r'users', UserViewSet, basename='user')

# URL Patterns
urlpatterns = [
    # 🏠 Landing Page
    path('', landing),

    # 📦 API Routes
    path('api/', include(router.urls)),

    # 🔐 Authentication Routes
    path('api/register/', UserRegistrationView.as_view(), name='register'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/admin/carts/', admin_all_user_carts, name='admin-all-user-carts'),
    path('api/admin/carts/<int:user_id>/', admin_user_cart_detail, name='admin-user-cart-detail'),

]

# 📁 Media File Serving (only in development)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
