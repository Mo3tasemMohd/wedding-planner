from django.urls import path
from service import views
from .views import AddServiceView, UpdateServiceView

# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

urlpatterns = [
    path('all-services/', views.showAllServices),
    path('all-services', views.showAllServices),
    path('all-services-images/', views.showAllServicesImages),
    path('service-categories/', views.service_categories, name='service_categories'),
    path('get-service/<int:id>', views.showService),
    path('add-service/', AddServiceView.as_view(), name='add-service'),
    path('update-service/<int:id>', UpdateServiceView.as_view(), name='update-service'),
    path('delete-service/<int:id>', views.deleteService),
    
    path('add-service-reserveddate/', views.addReservedDates),
    path('<int:service_id>/reserveddates', views.getReservedDates)
    
    
]
