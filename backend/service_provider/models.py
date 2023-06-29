from django.db import models
from django.utils import timezone
#from service.models import ServiceCategory
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator


class ServiceProvider(AbstractUser):
    phone_regex = RegexValidator(
        regex=r'^01[0|1|2|5]{1}[0-9]{8}$',
        message="Please enter a valid Egyptian phone number"
    )
    provider_phone = models.CharField(validators=[phone_regex], max_length=11, blank=True)
    #provider_phone = models.CharField(max_length=11, unique=True, null=False, blank=True)
    provider_image = models.ImageField(upload_to='media/vendors_images', null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)   
    #provider_service_category = models.ForeignKey(ServiceCategory, null=False, on_delete=models.CASCADE)
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='provider_groups',
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='provider_user_permissions',
        blank=True,
    )
    
    def __str__(self):
        return self.username
    
    class Meta:
        verbose_name_plural = 'Providers'