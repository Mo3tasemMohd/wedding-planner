from rest_framework import serializers
from .models import HallOwner, Hall





class HallOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model=HallOwner
        fields='__all__'


class HallOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Hall
        fields='__all__'
    #     extra_kwargs = {
    #         'password' : {'write_only': True}
    #     }
        
    # def create(self, validation_data):
    #     password = validation_data.pop('password', None) 
    #     instance = self.Meta.model(**validation_data)
    #     if password is not None:
    #         instance.set_password(password)
    #     instance.save()
    #     return instance
        
