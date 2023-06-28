from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField

class ServiceCategory(models.Model):
    service_category_name = models.CharField(max_length=50)
    def __str__(self):
        return self.service_category_name

class Service(models.Model):
    service_price=models.DecimalField(decimal_places=2,max_digits=10)
    service_rate=models.DecimalField(decimal_places=1,max_digits=2)
    service_description=models.TextField(max_length=2000)
    service_location= models.TextField(max_length=400)
    service_service_category = models.ForeignKey(ServiceCategory, null=False, on_delete=models.CASCADE)
    #service_service_category=models.ForeignKey(ServiceCategory,null=False, on_delete=models.CASCADE)
    #service_images=ArrayField(models.ImageField(upload_to='media/service_images'), blank=True)
    #tryvar=ArrayField(models.CharField(max_length=50))
    
    def __str__(self):
         return self.service_description

class ServiceImage(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='media/service_images')


class ReservedDates(models.Model):
    service_reserved = models.ForeignKey(Service, null=False, on_delete=models.CASCADE)
    date_reserved = models.DateField(max_length=20)
    slot_reserved = models.IntegerField(null=False)
    
    # def __str__(self):
    #      return self.slot_reserved
    
    # class Meta:
    #     verbose_name_plural = 'ReservedDates'
    
   


