from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    # add more URL patterns here as needed
]