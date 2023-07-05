from django.urls import path
from package import views
from django.urls import path, include
from rest_framework import routers
from .views import PackageViewSet

#from .views import AddToPackageView, CustomerPackageView, CustomerPackageServicesView


router = routers.DefaultRouter()
router.register('', PackageViewSet)

urlpatterns = [
    path('view/', views.CustomerPackage),
    path('view-package-services/', views.CustomerPackageServices),
    path('add-to-package/', views.AddToPackage),
    path('delete-from-package/', views.DeleteFromPackage),
    path('<int:package_id>/empty-package/', views.emptyPackage),
    
    path('', include(router.urls)),

    # path('checkout/<int:package_id>/', views.checkout, name='checkout'),
    # path('pay_success/', views.pay_success, name='pay_success'),
    # path('pay_cancel/', views.pay_cancel, name='pay_cancel'),

]

