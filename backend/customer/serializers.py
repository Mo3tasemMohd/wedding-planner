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
        
# from django.contrib.auth.models import Group, Permission
# from rest_framework import serializers
# from .models import Customer


# class CustomerSerializer(serializers.ModelSerializer):
#     groups = serializers.ListField(child=serializers.CharField())
#     user_permissions = serializers.ListField(child=serializers.CharField())

#     class Meta:
#         model = Customer
#         fields = '__all__'
#         extra_kwargs = {
#             'password': {'write_only': True},
#         }

#     def create(self, validated_data):
#         groups_data = validated_data.pop('groups', [])
#         permissions_data = validated_data.pop('user_permissions', [])
#         password = validated_data.pop('password', None)

#         instance = super().create(validated_data)

#         if password is not None:
#             instance.set_password(password)

#         if groups_data:
#             groups = Group.objects.filter(name__in=groups_data)
#             instance.groups.set(groups)

#         if permissions_data:
#             permissions = Permission.objects.filter(codename__in=permissions_data)
#             instance.user_permissions.set(permissions)

#         instance.save()

#         return instance