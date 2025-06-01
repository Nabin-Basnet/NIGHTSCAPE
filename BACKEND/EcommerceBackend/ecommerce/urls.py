from django.urls import include,path
from ecommerce.views import landing
from .views import ProductViewSet, CategoryViewSet, CartViewSet, OrderViewSet, OrderItemViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'carts', CartViewSet)
router.register(r'orders', OrderViewSet)

urlpatterns=[
    path("",landing),
    path('api/', include(router.urls)),
]