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
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import MultiPartParser, FileUploadParser, FormParser
from rest_framework.views import APIView
from django.middleware.csrf import get_token

from project.permissions import IsProvider, IsNotProvider

from .models import (
    Service,
    ServiceImage,
    ReservedDates,
    #ServiceCategory
)
from .serializers import (
    ServiceSerializer,
    ServiceImageSerializer,
    ReservedDatesSerializer,
    #ServiceCategorySerializer,
)


@api_view(["GET"])
def showAllServices(request):
    paginator = PageNumberPagination()
    paginator.page_size = 2
    services = Service.objects.prefetch_related(Prefetch('images', queryset=ServiceImage.objects.all()))
    #services = Service.objects.all()
    
    category = request.query_params.get('category', None)
    if category is not None:
        services = services.filter(service_service_category=category)

    paginated_services = paginator.paginate_queryset(services, request)
    serialized_services = ServiceSerializer(paginated_services, many=True)
    return paginator.get_paginated_response(serialized_services.data)

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
        return Response({"Error - This Service Doesn’t Exist"}, status=400)
    
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
    serialized_reserved = ReservedDatesSerializer(data=reserved)
    if serialized_reserved.is_valid():
        serialized_reserved.save()
        return Response(serialized_reserved.data, status=201)
    else:
        return Response(serialized_reserved.errors, status=400)


# @authentication_classes([SessionAuthentication, BasicAuthentication])
# @authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(["GET"])
def getReservedDates(request, service_id):
    
    try:
        reserved_dates = ReservedDates.objects.filter(service_reserved=service_id)
        serialized_reserved_dates = ReservedDatesSerializer(reserved_dates, many=True)
        return Response(serialized_reserved_dates.data)
    except:
        return Response({"Error - This Service Doesn’t Exist"}, status=400)