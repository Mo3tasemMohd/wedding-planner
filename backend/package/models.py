from django.db import models
from customer.models import Customer

from service.models import Service


class Package(models.Model):
    total_price=models.DecimalField(decimal_places=2,max_digits=10)
    services=models.ManyToManyField(Service, related_name='cart')
    user=models.OneToOneField(Customer,null=False, on_delete=models.CASCADE)


