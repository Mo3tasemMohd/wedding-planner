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
from rest_framework.permissions import BasePermission
from rest_framework.permissions import AllowAny


from django.db.models import Prefetch
from django.db.models import Count
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import MultiPartParser, FileUploadParser, FormParser
from rest_framework.views import APIView
from django.middleware.csrf import get_token

from project.permissions import IsProvider, IsNotProvider
from customer.models import Customer
from customer.serializers import CustomerSerializer

from .models import (
    Service,
    ServiceImage,
    ReservedDates,
    ServiceRate,
    #ServiceCategory
)
from .serializers import (
    ServiceSerializer,
    ServiceImageSerializer,
    ReservedDatesSerializer,
    ServiceRateSerializer,
    #ServiceCategorySerializer,
)


@api_view(["GET"])
def showAllServices(request):
    paginator = PageNumberPagination()
    paginator.page_size = 10
    services = Service.objects.prefetch_related(Prefetch('images', queryset=ServiceImage.objects.all()))
    #services = Service.objects.all()
    
    category = request.query_params.get('category', None)
    if category is not None:
        services = services.filter(service_service_category=category)

    paginated_services = paginator.paginate_queryset(services, request)
    serialized_services = ServiceSerializer(paginated_services, many=True)
    return paginator.get_paginated_response(serialized_services.data)

@api_view(["GET"])
@permission_classes([IsProvider]) #For Test
def showLoggedServices(request):
    try:
        #provider = request.user  # assuming the authenticated user is a provider
        services = Service.objects.filter(service_provider=request.user ).prefetch_related(Prefetch('images', queryset=ServiceImage.objects.all()))
        serialized_services = ServiceSerializer(services, many=True)
        return Response(serialized_services.data)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["GET"])
def showProviderServices(request, provider_id):
    try:
        services = Service.objects.filter(service_provider=provider_id).prefetch_related(Prefetch('images', queryset=ServiceImage.objects.all()))
        serialized_services = ServiceSerializer(services, many=True)
        return Response(serialized_services.data)

    except:
        return Response({"Error - This Provider Doesn’t Exist"}, status=400)


@api_view(["GET"])
def showAllServicesImages(request):
    services = ServiceImage.objects.all()
    serialized_services = ServiceImageSerializer(services, many=True)
    return Response(serialized_services.data)

@api_view(["GET"])
def service_categories(request):
   # categories = ['Hall-Reservation', 'Car-Rental', 'Photo-Session', 'MakeUp-Artist']
    categories = [serviceCategory[0] for serviceCategory in Service.serviceCategories]
    return Response({'categories': categories})


@api_view(["GET"])
def showService(request, id):
    try:
        service = Service.objects.get(id=id)
        serialized_Service = ServiceSerializer(service)
        return Response(serialized_Service.data, status=200)
    except:
        return Response({"Error - This Service Doesn’t Exist"}, status=status.HTTP_400_BAD_REQUEST)
    
class AddServiceView(APIView):
   # authentication_classes = [SessionAuthentication, BasicAuthentication]
   # authentication_classes = [JWTAuthentication]
   # permission_classes = [IsAuthenticated, IsProvider]
    permission_classes = [IsProvider] #For Test

    parser_classes = [MultiPartParser, FormParser]
    
    #@login_required Not User as long as we use django_rest_framework
    def post(self, request, format=None):
        service_data = request.data
        image_data = request.FILES.getlist('images')

        #Set the service_provider attribute to the currently logged in user
        service_data['service_provider'] = request.user.id
        
        # Create a new Service object
        service_serializer = ServiceSerializer(data=service_data)
        if service_serializer.is_valid():
            service = service_serializer.save()

            # Associate the uploaded images with the new Service object
            for image in image_data:
                ServiceImage.objects.create(service=service, image=image)

            return Response(service_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(service_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateServiceView(APIView):
   # authentication_classes = [SessionAuthentication, BasicAuthentication]
   # authentication_classes = [JWTAuthentication]
   # permission_classes = [IsAuthenticated, IsProvider]
    permission_classes = [IsProvider] #For Test
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request, id, format=None):
        try:
            service = Service.objects.get(id=id)
            image_data = request.FILES.getlist('images')
            
            if request.user != service.service_provider:
           # if request.user.id != service.service_provider.id:
                return Response({"Error - You are not authorized to update this service"}, status=status.HTTP_401_UNAUTHORIZED)

            service_serializer = ServiceSerializer(service, data=request.data, partial=True)
            if service_serializer.is_valid():
                service_serializer.save()

                # Update the associated ServiceImage objects
                for image in image_data:
                    ServiceImage.objects.create(service=service, image=image)

                return Response(service_serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(service_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Service.DoesNotExist:
            return Response({"Error - This Service Doesn’t Exist"}, status=status.HTTP_400_BAD_REQUEST)
                
@api_view(["DELETE"])
# @authentication_classes([SessionAuthentication, BasicAuthentication])
# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated, IsProvider])
@permission_classes([IsProvider]) #For Test
def deleteService(request, id):
    try:
        service = Service.objects.get(id=id)
        if request.user != service.service_provider:
           # if request.user.id != service.service_provider.id:
             return Response({"Error - You are not authorized to Delete this service"}, status=status.HTTP_401_UNAUTHORIZED)

        service.images.all().delete()

        service.delete()
        return Response("{} is deleted".format(service))
    except Service.DoesNotExist:
        return Response({"Error - This service Does not Exist"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
# @authentication_classes([SessionAuthentication, BasicAuthentication])
# @authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def addReservedDates(request):
    reserved = request.data
    print(reserved)
    serialized_reserved = ReservedDatesSerializer(data=reserved)
    if serialized_reserved.is_valid():
        print("____________________________\n" + str(serialized_reserved) + "____________________________\n")
        serialized_reserved.save()
        print("=======================\n" + str(serialized_reserved.data) +"=======================\n")
        return Response(serialized_reserved.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized_reserved.errors, status=status.HTTP_400_BAD_REQUEST)



# @authentication_classes([SessionAuthentication, BasicAuthentication])
# @authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(["GET"])
def getReservedDates(request, service_id):
    
    try:
        reserved_dates = ReservedDates.objects.filter(service_reserved=service_id)
        serialized_reserved_dates = ReservedDatesSerializer(reserved_dates, many=True)
        return Response(serialized_reserved_dates.data, status=status.HTTP_200_OK)
    except:
        return Response({"Error - This Service Doesn’t Exist"}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["DELETE"])
@permission_classes([IsProvider])
def deleteReservedDates(request, reserved_date_id):
    try:
        reserved_date = ReservedDates.objects.get(id=reserved_date_id)
        reserved_date.delete()
        return Response("{} is deleted".format(reserved_date), status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    
    
@api_view(["POST"])
@permission_classes([IsNotProvider]) 
def AddServiceRate(request):
  
    service = get_object_or_404(Service, id=request.data['service_rated'])
    serializered_rate = ServiceRateSerializer(data=request.data)
    if serializered_rate.is_valid():
        serializered_rate.save(service_rated=service, customer_user=request.user)
        return Response(serializered_rate.data, status=status.HTTP_201_CREATED)
    return Response(serializered_rate.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(["POST"]) #For Test Without Authentication
# def AddServiceRate(request):
  
#     service = get_object_or_404(Service, id=request.data['service_rated'])
#     customer = get_object_or_404(Customer, id=request.data['customer_user'])
#     serializered_rate = ServiceRateSerializer(data=request.data)
#     if serializered_rate.is_valid():
#         serializered_rate.save(service_rated=service, customer_user=customer)
#         return Response(serializered_rate.data, status=status.HTTP_201_CREATED)
#     return Response(serializered_rate.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def viewServiceRate(request, service_id):
    try:
        service = Service.objects.get(id=service_id)
    except Service.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    servicerates = ServiceRate.objects.filter(service_rated=service)
    serializered_rate = ServiceRateSerializer(servicerates, many=True)
    return Response(serializered_rate.data)


@api_view(['GET'])
def viewServiceStatistics(request, service_id):
    try:
        service = Service.objects.get(id=service_id)
    except Service.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    servicerates = ServiceRate.objects.filter(service_rated=service).values('service_rate').annotate(customersNum=Count('service_rate'))
    return Response(servicerates)


