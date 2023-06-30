from django.db import models
from django.contrib.auth.models import AbstractUser
from rest_framework_simplejwt.tokens import RefreshToken



class Customer(AbstractUser):
    customer_phone = models.CharField(max_length=11, unique=True, null=False, blank=False)
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