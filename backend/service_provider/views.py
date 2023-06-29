from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import (api_view, authentication_classes, permission_classes)

# Create your views here.




@api_view(["GET"])
def index(request):
    
    return Response({'OKAY'})

