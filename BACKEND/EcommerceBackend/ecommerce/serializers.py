from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from .models import (
    User, Category, Brand, Product, Address, Order, OrderItem,
    Cart, Wishlist, Payment, Review, Return, FeaturedProduct
)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # ✅ Add custom claims to the token
        token['name'] = user.name
        token['email'] = user.email
        token['role'] = user.role  # 👈 required for frontend decoding

        return token

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email is None or password is None:
            raise serializers.ValidationError('Email and password are required')

        user = authenticate(email=email, password=password)

        if not user:
            raise serializers.ValidationError('Invalid email or password')

        data = super().validate(attrs)
        
        # Optional: include user details in response body
        data['user'] = {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'role': user.role,
        }

        return data
# --- User Registration Serializer ---
class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['name', 'email', 'password', 'password2', 'phone', 'role']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('password2'):
            raise serializers.ValidationError("Passwords do not match.")
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        validated_data['password'] = make_password(validated_data['password'])
        return User.objects.create(**validated_data)

# --- Category Serializer ---
class CategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'image', 'parent', 'subcategories']

    def get_subcategories(self, obj):
        return CategorySerializer(obj.subcategories.all(), many=True).data

# --- Brand Serializer ---
class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

# --- Product Serializer ---
class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    brand = BrandSerializer(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

# --- User Serializer (needed for nested display) ---
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'phone', 'role']

# --- Address Serializer ---
class AddressSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Address
        fields = '__all__'

# --- OrderItem Serializer ---
class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price']

# --- Order Serializer ---
class OrderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    address = AddressSerializer(read_only=True)
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

# --- Cart Serializer ---
class CartSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    product = ProductSerializer(read_only=True)

    # Accept product_id on write only
    product_id = serializers.IntegerField(write_only=True)

    # User is set automatically from the request user
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Cart
        fields = ['id', 'user', 'product', 'product_id', 'quantity', 'created_at']

    def create(self, validated_data):
        user = validated_data.pop('user')  # From CurrentUserDefault
        product_id = validated_data.pop('product_id')
        quantity = validated_data.get('quantity', 1)

        # Validate product existence
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            raise serializers.ValidationError({"product_id": "Product not found."})

        cart_item, created = Cart.objects.get_or_create(
            user=user,
            product=product,
            defaults={'quantity': quantity}
        )
        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        return cart_item

# --- Wishlist Serializer ---
class WishlistSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    product = ProductSerializer(read_only=True)
    
    # Accept product_id as write-only input
    product_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Wishlist
        fields = ['id', 'user', 'product', 'product_id']

    def create(self, validated_data):
        user = self.context['request'].user
        product_id = validated_data.pop('product_id')

        # Validate product exists
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            raise serializers.ValidationError({"product_id": "Product not found."})

        # Prevent duplicate wishlist items if you want
        wishlist_item, created = Wishlist.objects.get_or_create(user=user, product=product)

        return wishlist_item


# --- Payment Serializer ---
class PaymentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    order = OrderSerializer(read_only=True)

    class Meta:
        model = Payment
        fields = '__all__'

# --- Review Serializer ---
class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Review
        fields = '__all__'

# --- Return Serializer ---
class ReturnSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    order = OrderSerializer(read_only=True)
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Return
        fields = '__all__'

# --- Featured Product Serializer ---
class FeaturedProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = FeaturedProduct
        fields = '__all__'
