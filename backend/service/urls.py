from django.urls import path
from service import views
from .views import  UpdateServiceView, AddServiceView

# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

urlpatterns = [
    path('all-services/', views.showAllServices),
    path('all-services', views.showAllServices),
    path('logged-services/', views.showLoggedServices),
    path('providers/<int:provider_id>/', views.showProviderServices),
    path('all-services-images/', views.showAllServicesImages),
    path('service-categories/', views.service_categories, name='service_categories'),
    path('get-service/<int:id>/', views.showService),
    path('add-service/', AddServiceView.as_view(), name='add-service'),
    path('update-service/<int:id>/', UpdateServiceView.as_view(), name='update-service'),
    path('delete-service/<int:id>/', views.deleteService),
    path('add-service-reserveddate/', views.addReservedDates),
    path('<int:service_id>/reserveddates', views.getReservedDates),
    path('<int:reserved_date_id>/reserveddates/', views.deleteReservedDates),
    
    path('rate/', views.AddServiceRate),
    path('<int:service_id>/view-rate/', views.viewServiceRate),
    path('<int:service_id>/view-stat/', views.viewServiceStatistics),

    
    
]
