from django.db import models
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import AbstractUser

from django.core.validators import RegexValidator
from django.db import models
   
class Customer(AbstractUser):
    phone_regex = RegexValidator(
        regex=r'^01[0|1|2|5]{1}[0-9]{8}$',
        message="Please enter a valid Egyptian phone number"
    )
    customer_phone = models.CharField(validators=[phone_regex], max_length=11, blank=False)
    #customer_phone = models.CharField(max_length=11, unique=True, null=False, blank=False)
    customer_image = models.ImageField(upload_to='media/users_images', null=True, blank=True)
    is_provider = models.BooleanField(default = False)
    created_at = models.DateTimeField(default=timezone.now)
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customer_groups',
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customer_user_permissions',
        blank=True,
    )
    def get_tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

    
    def __str__(self):
        return self.username
    
    class Meta:
        verbose_name_plural = 'Customers'