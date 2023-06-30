from rest_framework import serializers
#from backend.service_provider.models import ServiceProvider
from .models import ServiceProvider


class Service_ProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model=ServiceProvider
        fields='__all__'