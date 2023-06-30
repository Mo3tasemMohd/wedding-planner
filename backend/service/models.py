from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField

class ServiceCategory(models.Model):
    service_category_name=models.TextField(max_length=255)
    def __str__(self):
        return self.service_category_name

class Service(models.Model):
    service_price=models.DecimalField(decimal_places=2,max_digits=10)
    service_rate=models.DecimalField(decimal_places=1,max_digits=2)
    service_description=models.TextField(max_length=2000)
    service_location= models.TextField(max_length=400)
    service_service_category=models.ForeignKey(ServiceCategory, on_delete=models.CASCADE)
    service_images=ArrayField(models.ImageField(upload_to='media/service_images'), blank=True)
    

class ReservedDates(models.Model):
    service_reserved = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='reservations')
    date_reserved = models.DateField(max_length=20)
    slot_reserved = models.IntegerField(null=False)
    
    # def __str__(self):
    #     return self.date_reserved
    
    # class Meta:
    #     verbose_name_plural = 'ReservedDates'
    
   


