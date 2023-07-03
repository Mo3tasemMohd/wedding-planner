from django.urls import path
from package import views
#from .views import AddToPackageView, CustomerPackageView, CustomerPackageServicesView



urlpatterns = [
    path('view/', views.CustomerPackage),
    path('view-package-services/', views.CustomerPackageServices),
    path('add-to-package/', views.AddToPackage),
    path('delete-from-package/', views.DeleteFromPackage),
    path('test/', views.test),

    

    
]
