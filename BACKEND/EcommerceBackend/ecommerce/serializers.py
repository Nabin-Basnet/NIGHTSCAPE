from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from django.utils import timezone
from .models import (
    User, Category, Brand, Product, ProductImage, Address, Order, OrderItem,
    Cart, Wishlist, Payment, Review, Return, FeaturedProduct
)

# JWT Token Serializer with extra claims
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['name'] = user.name
        token['email'] = user.email
        token['role'] = user.role
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
        data['user'] = {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'role': user.role,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser,
        }
        return data

# User serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'phone', 'role', 'is_staff', 'is_superuser']
        extra_kwargs = {
            'is_staff': {'required': False},
            'is_superuser': {'required': False},
        }

    def update(self, instance, validated_data):
        request = self.context.get('request')
        if request and not request.user.is_superuser:
            validated_data.pop('is_staff', None)
            validated_data.pop('is_superuser', None)
        return super().update(instance, validated_data)

# User registration serializer
class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['name', 'email', 'password', 'password2', 'phone', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('password2'):
            raise serializers.ValidationError("Passwords do not match.")
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        validated_data['password'] = make_password(validated_data['password'])
        return User.objects.create(**validated_data)

# Category serializer with subcategories
class CategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'image', 'parent', 'subcategories']

    def get_subcategories(self, obj):
        return CategorySerializer(obj.subcategories.all(), many=True).data

# Brand serializer
class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

# Product Image serializer
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text']

# Product serializer
class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    brand = BrandSerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)

    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), write_only=True, source='category'
    )
    brand_id = serializers.PrimaryKeyRelatedField(
        queryset=Brand.objects.all(), write_only=True, source='brand'
    )

    highlight_type = serializers.CharField(write_only=True, required=False)
    start_date = serializers.DateTimeField(write_only=True, required=False)
    end_date = serializers.DateTimeField(write_only=True, required=False)

    class Meta:
        model = Product
        fields = '__all__'

    def create(self, validated_data):
        highlight_type = validated_data.pop('highlight_type', None)
        start_date = validated_data.pop('start_date', None)
        end_date = validated_data.pop('end_date', None)

        product = Product.objects.create(**validated_data)

        if product.featured:
            FeaturedProduct.objects.update_or_create(
                product=product,
                defaults={
                    'highlight_type': highlight_type or 'default',
                    'start_date': start_date or timezone.now(),
                    'end_date': end_date or (timezone.now() + timezone.timedelta(days=30))
                }
            )

        return product

    def update(self, instance, validated_data):
        highlight_type = validated_data.pop('highlight_type', None)
        start_date = validated_data.pop('start_date', None)
        end_date = validated_data.pop('end_date', None)

        instance = super().update(instance, validated_data)

        if instance.featured:
            FeaturedProduct.objects.update_or_create(
                product=instance,
                defaults={
                    'highlight_type': highlight_type or 'default',
                    'start_date': start_date or timezone.now(),
                    'end_date': end_date or (timezone.now() + timezone.timedelta(days=30))
                }
            )
        else:
            FeaturedProduct.objects.filter(product=instance).delete()

        return instance

# Address serializer
class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
        read_only_fields = ['user']

# Order Item serializer
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity']

# Order serializer
class OrderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    address = AddressSerializer(read_only=True)
    address_id = serializers.PrimaryKeyRelatedField(
        queryset=Address.objects.all(),
        write_only=True,
        source='address'
    )
    items = OrderItemSerializer(many=True, write_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'address', 'address_id', 'status', 'total_amount',
            'order_date', 'delivery_date', 'notes', 'items'
        ]

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        user = self.context['request'].user

        # Remove any user and total_amount keys to prevent conflicts
        validated_data.pop('user', None)
        validated_data.pop('total_amount', None)

        total = 0
        order_items = []
        for item in items_data:
            product = item['product']
            quantity = item['quantity']
            price = product.price
            total += price * quantity
            order_items.append((product, quantity, price))

        order = Order.objects.create(user=user, total_amount=total, **validated_data)

        for product, quantity, price in order_items:
            OrderItem.objects.create(order=order, product=product, quantity=quantity, price=price)

        return order

# Cart serializer
class CartSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    product = ProductSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'product', 'product_id', 'quantity', 'created_at']

    def create(self, validated_data):
        user = self.context['request'].user

        product_id = validated_data.pop('product_id')
        quantity = validated_data.get('quantity', 1)

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

# Wishlist serializer
class WishlistSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    product = ProductSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Wishlist
        fields = ['id', 'user', 'product', 'product_id']

    def create(self, validated_data):
        user = self.context['request'].user
        product_id = validated_data.pop('product_id')

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            raise serializers.ValidationError({"product_id": "Product not found."})

        wishlist_item, created = Wishlist.objects.get_or_create(user=user, product=product)

        return wishlist_item

# Payment serializer
class PaymentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    order = OrderSerializer(read_only=True)

    class Meta:
        model = Payment
        fields = '__all__'

# Review serializer
class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Review
        fields = '__all__'

# Return serializer
class ReturnSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    order = OrderSerializer(read_only=True)
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Return
        fields = '__all__'

# Featured Product serializer
class FeaturedProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = FeaturedProduct
        fields = '__all__'
