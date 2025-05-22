from django.contrib import admin
from .models import User,Category,Brand, Product,Address,Order,OrderItem,Cart,Wishlist,Payment,Review,Return,FeaturedProduct

# Register your models here.
admin.site.register([User,Category,Brand, Product,Address,Order,OrderItem,Cart,Wishlist,Payment,Review,Return,FeaturedProduct])