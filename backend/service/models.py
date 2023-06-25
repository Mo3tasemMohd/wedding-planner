from django.db import models
from django.contrib.auth.models import AbstractUser

class ServiceCategory(models.Model):
    name=models.TextField(max_length=255)

class Service(models.Model):
    price=models.DecimalField(decimal_places=2,max_digits=10)
    rate=models.DecimalField(decimal_places=1,max_digits=2)
    description=models.TextField(max_length=400)
    location= models.TextField(max_length=400)
    service_images =models.ImageField(upload_to='media/service_images', null=False,blank=False)
    
    category=models.OneToOneField(ServiceCategory,null=False, on_delete=models.CASCADE)

class ServiceImage(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='media/service_images')

class ReservedDates(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='reservations')
    date = models.DateField(max_length=20)
    slot = models.IntegerField(null=False)


