from django.db import models
from django.contrib.auth.models import AbstractUser


class Customer(AbstractUser):
    customer_phone = models.CharField(max_length=11, unique=True, null=False, blank=False)
    customer_image = models.ImageField(upload_to='media/users_images', null=True, blank=True)
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

    
    def __str__(self):
        return self.username
    
    class Meta:
        verbose_name_plural = 'Customers'