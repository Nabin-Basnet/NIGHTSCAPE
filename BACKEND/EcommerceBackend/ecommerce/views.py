from django.http import HttpResponse
from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .serializers import MyTokenObtainPairSerializer
from .models import (
    User, Product, Category, Brand, ProductImage,
    Address, Order, OrderItem, Cart, Wishlist,
    Payment, Review, Return, FeaturedProduct
)
from .serializers import (
    UserSerializer, UserRegistrationSerializer, CategorySerializer,
    BrandSerializer, ProductSerializer, AddressSerializer,
    OrderItemSerializer, OrderSerializer, CartSerializer,
    WishlistSerializer, PaymentSerializer, ReviewSerializer,
    ReturnSerializer, FeaturedProductSerializer
)

def landing(request):
    return HttpResponse("hello buddy")


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


# ✅ Updated to allow only admins to create/update/delete products
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('id')
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.request.method in ['POST', 'PUT', 'PATCH', 'DELETE']:
            return [IsAdminUser()]
        return [AllowAny()]


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer


class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Cart.objects.filter(user=user)
        return Cart.objects.none()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# 🚀 Admin View: All users with carts
@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_all_user_carts(request):
    users = User.objects.filter(cart__isnull=False).distinct()
    data = [
        {
            'id': user.id,
            'name': user.name,
            'email': user.email,
        }
        for user in users
    ]
    return Response(data)


# 🚀 Admin View: Single user cart details
@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_user_cart_detail(request, user_id):
    carts = Cart.objects.filter(user_id=user_id)
    serializer = CartSerializer(carts, many=True)
    return Response(serializer.data)


class WishlistViewSet(viewsets.ModelViewSet):
    serializer_class = WishlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# 🚀 Admin View: All users with wishlists
@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_all_user_wishlists(request):
    users = User.objects.filter(wishlist__isnull=False).distinct()
    data = [
        {
            'id': user.id,
            'name': user.name,
            'email': user.email,
        }
        for user in users
    ]
    return Response(data)


# 🚀 Admin View: Single user wishlist details
@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_user_wishlist_detail(request, user_id):
    wishlists = Wishlist.objects.filter(user_id=user_id)
    serializer = WishlistSerializer(wishlists, many=True)
    return Response(serializer.data)


# ✅ Admin View: All wishlist items for admin
@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_all_wishlist_items(request):
    wishlists = Wishlist.objects.select_related('user', 'product').all()
    serializer = WishlistSerializer(wishlists, many=True)
    return Response(serializer.data)


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]


class ReturnViewSet(viewsets.ModelViewSet):
    queryset = Return.objects.all()
    serializer_class = ReturnSerializer
    permission_classes = [IsAuthenticated]


class FeaturedProductViewSet(viewsets.ModelViewSet):
    queryset = FeaturedProduct.objects.all()
    serializer_class = FeaturedProductSerializer
    permission_classes = [AllowAny]


# ✅ Public API: List of all featured products with product info
@api_view(['GET'])
@permission_classes([AllowAny])
def featured_products_list(request):
    featured_products = FeaturedProduct.objects.select_related('product').all()
    serializer = FeaturedProductSerializer(featured_products, many=True)
    return Response(serializer.data)
