from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status, filters, generics
from rest_framework.decorators import (api_view, authentication_classes, permission_classes, action)
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

from rest_framework import viewsets
import stripe


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

@api_view(["DELETE"])
def emptyPackage(request, package_id):
    try:
        package = Package.objects.get(id=package_id)
        package.services.all().delete()
        package.package_price = 0
        return Response("{} Is Empty Now".format(package))
    except Package.DoesNotExist:
        return Response({"Error - This Package Doesn’t Exist"}, status=status.HTTP_400_BAD_REQUEST)

class PackageViewSet(viewsets.ModelViewSet):
    serializer_class = PackageSerializer
    queryset = Package.objects.all()

    @action(detail=True, methods=['post'])
    def checkout(self, request, pk=None):
        package = self.get_object()
        total_price =450 # package.package_price = sum(service.service_price for service in package.services.all())

        stripe.api_key = 'sk_test_51NQSDPH4KQhMQHChhDx5nfs6zmyd2L4GcKfGsc2jNiZse4w2ikZRnVFHWXGZpCRFImpZeqpiy4D98sY2uzWEcWhu00J1d8vlu4'

        # Create a Stripe Price object
        price = stripe.Price.create(
            unit_amount=total_price,
            currency='usd',
            product_data={
                'name': 'Package',
            }
        )

        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price': price.id,
                'quantity': 1,
            }],
            mode='payment',
            success_url='http://localhost:8000/pay_success',
            cancel_url='http://localhost:8000/pay_cancel',
            client_reference_id=package.id,
        )

        # Return the URL of the Stripe checkout page
        return Response({'url': session.url})