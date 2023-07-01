from rest_framework.permissions import BasePermission
from customer.models import Customer
from customer.serializers import CustomerSerializer
from django.shortcuts import get_object_or_404

# For Autentication    
class IsProvider(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_provider

#For No Authentication - Test
# class IsProvider(BasePermission):   #request.user = object.user.customer
#     def has_permission(self, request, view):
#         customer_user = get_object_or_404(Customer, id=request.data['service_provider'])
#         return customer_user.is_provider
# class IsProvider(BasePermission):   #request.user = object.user.customer
#     def has_permission(self, request, view):
#         customer_user = get_object_or_404(Customer, id=request.user.id)
#         return request.user.is_authenticated and customer_user.is_provider

#For Autentication    
class IsNotProvider(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and not request.user.is_provider 

#For No Authentication Test
# class IsNotProvider(BasePermission):
#     def has_permission(self, request, view):
#         customer_user = get_object_or_404(Customer, id=view.kwargs['id'])
#         return not customer_user.is_provider
    
