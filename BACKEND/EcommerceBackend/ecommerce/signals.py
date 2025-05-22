# your_app/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import OrderItem, Product

@receiver(post_save, sender=OrderItem)
def decrease_product_stock(sender, instance, created, **kwargs):
    if created:
        product = instance.product
        if product.stock_quantity >= instance.quantity:
            product.stock_quantity -= instance.quantity
            product.save()
        else:
            # Optional: raise error or log that ordered quantity exceeds stock
            print(f"Not enough stock for {product.name}")
