from rest_framework import serializers
from .models import Customer





class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Customer
        fields='__all__'
        extra_kwargs = {
            'password' : {'write_only': True}
        }
        
    def create(self, validation_data):
        password = validation_data.pop('password', None) 
        instance = self.Meta.model(**validation_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
        
