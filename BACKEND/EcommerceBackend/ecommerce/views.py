from django.http import HttpResponse
from rest_framework import viewsets, generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .serializers import (
    MyTokenObtainPairSerializer,
    UserSerializer, UserRegistrationSerializer, CategorySerializer,
    BrandSerializer, ProductSerializer, AddressSerializer,
    OrderItemSerializer, OrderSerializer, CartSerializer,
    WishlistSerializer, PaymentSerializer, ReviewSerializer,
    ReturnSerializer, FeaturedProductSerializer
)
from .models import (
    User, Product, Category, Brand, ProductImage,
    Address, Order, OrderItem, Cart, Wishlist,
    Payment, Review, Return, FeaturedProduct
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

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def clear_cart(request):
    user = request.user
    Cart.objects.filter(user=user).delete()
    return Response({'detail': 'Cart cleared.'}, status=status.HTTP_204_NO_CONTENT)


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

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


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


@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_user_wishlist_detail(request, user_id):
    wishlists = Wishlist.objects.filter(user_id=user_id)
    serializer = WishlistSerializer(wishlists, many=True)
    return Response(serializer.data)


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
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return Order.objects.all()
        return Order.objects.filter(user=user)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def perform_create(self, serializer):
        user = self.request.user
        items_data = self.request.data.get('items', [])

        # Save order without items first
        order = serializer.save(user=user)

        # Create OrderItems related to the order
        for item in items_data:
            product_id = item.get('product')
            quantity = item.get('quantity', 1)

            try:
                product = Product.objects.get(id=product_id)
            except Product.DoesNotExist:
                continue

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                price=product.price
            )

        # Update total amount based on created order items
        total = sum(oi.price * oi.quantity for oi in order.items.all())
        order.total_amount = total
        order.save()


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


@api_view(['GET'])
@permission_classes([AllowAny])
def featured_products_list(request):
    featured_products = FeaturedProduct.objects.select_related('product').all()
    serializer = FeaturedProductSerializer(featured_products, many=True)
    return Response(serializer.data)


class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
