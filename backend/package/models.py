from django.db import models
from django.utils import timezone
from customer.models import Customer

from service.models import Service


class Package(models.Model):
    package_price=models.DecimalField(decimal_places=2,max_digits=10)
    services=models.ManyToManyField(Service, related_name='services')
    customer_user=models.OneToOneField(Customer,null=False, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    
    def empty_package(self):        #Shorter Way To Make The Package Empty Of Services - The Endpoint Also Works
        self.services.clear()
        self.package_price = 0
    
    def __str__(self):
        return f"{self.customer_user.first_name} {self.customer_user.last_name} {' Package'}"

    # service_id=models.ForeignKey(Service, null=False, on_delete=models.CASCADE, related_name='services')
    # customer_id=models.ForeignKey(Customer,null=False, on_delete=models.CASCADE)