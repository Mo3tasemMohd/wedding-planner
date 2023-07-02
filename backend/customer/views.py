from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

from customer.serializers import CustomerSerializer
from rest_framework.decorators import api_view  
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status,generics
from rest_framework_simplejwt.authentication import JWTAuthentication
from customer import models


# Create your views here.

#Register End-Point
class GetCustomer(generics.ListAPIView):
    queryset=models.Customer.objects.all()
    serializer_class=CustomerSerializer

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            customer = serializer.save()
            tokens = customer.get_tokens()
            response_data = {
                'customer': serializer.data,
                'tokens': tokens,
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)