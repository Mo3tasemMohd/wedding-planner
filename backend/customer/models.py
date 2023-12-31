from django.db import models
from django.contrib.auth.models import AbstractUser


class Customer(models.Model):
    email=models.EmailField(max_length=255,unique=True)
    phone_number = models.CharField(max_length=11,unique=True, null=False, blank=True) 
    # USERNAME_FIELD='email'
    # REQUIRED_FIELDS=['username']
    user_image=models.ImageField(upload_to='media/users_images', null=True,blank=True)