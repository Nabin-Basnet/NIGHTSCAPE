from django.shortcuts import render
from django.http import HttpResponse, request
from rest_framework import viewsets
from .models import (User,Product,Category,Brand,ProductImage,
                    Address,Order,OrderItem,Cart,Wishlist,
                    Payment,Review,Return,FeaturedProduct)
from .serializers import (UserSerializer,CategorySerializer,BrandSerializer,
                          ProductSerializer,AddressSerializer,OrderItemSerializer,
                          OrderSerializer,CartSerializer,WishlistSerializer,
                          PaymentSerializer,ReviewSerializer,ReturnSerializer,
                          FeaturedProductSerializer)


# Create your views here.
def landing(request):
    return HttpResponse("hello buddy")


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

