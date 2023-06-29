from django.urls import path
from package import views
#from .views import AddToPackageView, CustomerPackageView, CustomerPackageServicesView



urlpatterns = [
    path('view-package/<int:id>', views.CustomerPackage),
    path('view-package-services/<int:id>', views.CustomerPackageServices),
    path('addto-package/<int:id>/', views.AddToPackage),
    path('deletefrom-package/<int:id>/', views.DeleteFromPackage),

    

    
]
