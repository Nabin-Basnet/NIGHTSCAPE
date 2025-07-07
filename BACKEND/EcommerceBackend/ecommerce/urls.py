from django.conf import settings
from django.conf.urls.static import static
from django.urls import include,path
from ecommerce.views import landing
from .views import ProductViewSet, CategoryViewSet, CartViewSet, OrderViewSet, OrderItemViewSet,BrandViewSet,WishlistViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'carts', CartViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'brand', BrandViewSet)
router.register(r'wishlist', WishlistViewSet)

urlpatterns=[
    path("",landing),
    path('api/', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)