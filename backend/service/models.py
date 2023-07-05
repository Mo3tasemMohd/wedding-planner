from django.db import models
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator
from customer.models import Customer
# class ServiceCategory(models.Model):
#     service_category_name = models.CharField(max_length=50)
#     def __str__(self):
#         return self.service_category_name
class Service(models.Model):
    serviceCategories = [
        ('Hall-Reservation', 'Hall-Reservation'),
        ('Car-Rental', 'Car-Rental'),
        ('Photo-Session', 'Photo-Session'),
        ('MakeUp-Artist', 'MakeUp-Artist'),
    ]

    # add a field to store the enum value
    service_service_category = models.CharField(max_length=20, choices=serviceCategories)
    service_price=models.DecimalField(decimal_places=2,max_digits=10)
    service_rate=models.DecimalField(decimal_places=1,max_digits=2, default=0)
    service_description=models.TextField(max_length=2000)
    service_location= models.TextField(max_length=400)
    #service_service_category = models.ForeignKey(ServiceCategory, null=False, on_delete=models.CASCADE)#enum
    service_provider = models.ForeignKey(Customer, null=False, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    #service_images=ArrayField(models.ImageField(upload_to='media/service_images'), blank=True)
    
    def __str__(self):
        # return f"{self.service_service_category} {self.service_provider.id}"
        return f"{self.service_service_category} - {self.service_provider.id}"

class ServiceImage(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='media/service_images')

class ReservedDates(models.Model):
    service_reserved = models.ForeignKey(Service, null=False, on_delete=models.CASCADE)
    user_reserved = models.ForeignKey(Customer, null=False, on_delete=models.CASCADE)
    date_reserved = models.DateField(max_length=20)
    slot_reserved = models.IntegerField(null=True)
    
    def __str__(self):
        return f"{self.service_reserved.service_service_category} {self.service_reserved.id} {' Reserved Dates'}"
    # class Meta:
    #     verbose_name_plural = 'ReservedDates'
    

class ServiceRate(models.Model):
    service_rate=models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    service_rated=models.ForeignKey(Service, null=False, on_delete=models.CASCADE)
    customer_user=models.ForeignKey(Customer, null=False, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"{self.service_rated.service_service_category} {self.service_rated.id} {' Rate'}"


