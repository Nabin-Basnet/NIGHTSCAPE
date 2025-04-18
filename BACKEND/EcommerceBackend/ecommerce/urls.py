from django.urls import include,path
from ecommerce.views import landing

urlpatterns=[
    path("",landing),

]