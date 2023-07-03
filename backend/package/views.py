from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status, filters, generics
from rest_framework.decorators import (api_view, authentication_classes, permission_classes)
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from django.contrib.auth.decorators import login_required
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny

from django.db.models import Prefetch
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import MultiPartParser, FileUploadParser, FormParser
from rest_framework.views import APIView
from django.middleware.csrf import get_token

from .models import Package
from .serializers import PackageSerializer

from customer.models import Customer
from customer.serializers import CustomerSerializer

from service.models import Service
from service.serializers import ServiceSerializer

from project.permissions import IsProvider, IsNotProvider

# @authentication_classes([SessionAuthentication, BasicAuthentication])
# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated, IsNotProvider])
@api_view(["GET"])
@permission_classes([IsNotProvider]) #For Test
def CustomerPackage(request):    

    Current_customer_user = request.user

    try:
        package = Package.objects.get(customer_user=Current_customer_user)
        serialized_Package = PackageSerializer(package)
        return Response(serialized_Package.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
# @authentication_classes([SessionAuthentication, BasicAuthentication]) 
# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated, IsNotProvider])
@permission_classes([IsNotProvider]) #For Test
def CustomerPackageServices(request):
 
    Current_customer_user = request.user
    try:
        package = Package.objects.get(customer_user=Current_customer_user)
        services = package.services.all()
        serialized_Services = ServiceSerializer(services, many=True)
        return Response(serialized_Services.data ,status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
# @authentication_classes([SessionAuthentication, BasicAuthentication])
# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated, IsNotProvider])
@permission_classes([IsNotProvider]) #For Test
def AddToPackage(request):
  
    Current_customer_user = request.user
    service = get_object_or_404(Service, id=request.data['services'])
    try:
        package = Package.objects.get(customer_user=Current_customer_user)
        package.services.add(service)
        package.package_price = sum(service.service_price for service in package.services.all())
        package.save()
        serialized_Package = PackageSerializer(package)
        return Response(serialized_Package.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
# @authentication_classes([SessionAuthentication, BasicAuthentication])
# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated])
def DeleteFromPackage(request):

    Current_customer_user = request.user
    service = get_object_or_404(Service, id=request.data['services'])
    try:
        package = Package.objects.get(customer_user=Current_customer_user)
        package.services.remove(service)
        package.package_price = sum(service.service_price for service in package.services.all())
        package.save()
        serialized_Package = PackageSerializer(package)
        return Response(serialized_Package.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def test(request):
    ds = request.data['service']
    # ds = ServiceSerializer(d)
    print(request.user)
    return Response(data= ds, status=status.HTTP_200_OK)