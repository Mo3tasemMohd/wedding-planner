from django.shortcuts import render
from django.shortcuts import render
from customer.models import Customer
from package.models import Package
from customer.serializers import CustomerSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status,generics
from rest_framework_simplejwt.authentication import JWTAuthentication
from customer import models
from package import models
from project.permissions import IsNotProvider, IsProvider
from rest_framework.permissions import AllowAny


#Register End-Point
@api_view(['GET'])
@permission_classes([AllowAny]) #For Test
def get_customer(request):
    customer = models.Customer.objects.get(id=request.user.id) 
    serializer = CustomerSerializer(customer)
    return Response(serializer.data)

@api_view(['POST'])

def register(request):
    if request.method == 'POST':
        serializer = CustomerSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            print("succeeeeeed")
            customer = serializer.save()
            tokens = customer.get_tokens()
            print(customer)
            print(tokens)

            response_data = {
                'customer': serializer.data,
                'tokens': tokens,
            }
            customer=Customer.objects.get(username=request.data['username'])
            Package.objects.create(customer_user=customer, package_price=0)
            
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
