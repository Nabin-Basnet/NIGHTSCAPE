from django.apps import AppConfig
from django.apps import AppConfig


class EcommerceConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ecommerce'


class YourAppNameConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ecommerce'

    def ready(self):
        import ecommerce.signals  # Adjust based on your app folder name