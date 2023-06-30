from rest_framework import serializers
#from backend.service.models import Service
from .models import Service, ServiceImage, ReservedDates#, ServiceCategory


# class ServiceSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Service
#         fields='__all__'
              


# class ServiceImageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=ServiceImage
#         fields='__all__'
   
# class ServiceCategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ServiceCategory
#         fields = ['id', 'service_category_name']

              
class ServiceImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceImage
        fields = '__all__' # ['id', 'service', 'image']
      
class ServiceSerializer(serializers.ModelSerializer):
    images = ServiceImageSerializer(many=True, read_only=True)
   # service_service_category = ServiceCategorySerializer()
    class Meta:
        model = Service
        fields = ['id','service_service_category', 'service_provider','service_description', 'service_location', 'service_price', 'service_rate', 'images']
    #     images = serializers.ListField(
    #     child=serializers.FileField(),
    #     allow_empty=True,
    #     required=False
    # )


        
        
class ReservedDatesSerializer(serializers.ModelSerializer):
    class Meta:
        model=ReservedDates
        fields='__all__'
        


          
