from django.shortcuts import render
from django.http import HttpResponse,request

# Create your views here.
def landing(request):
    return HttpResponse("hello buddy")
