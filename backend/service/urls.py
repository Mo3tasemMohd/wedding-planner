from django.urls import path
from service import views
from .views import ServiceView

# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

urlpatterns = [
    path('all-services/', views.showAllServices),
    path('all-services-images/', views.showAllServicesImages),
    #path('add-service/', views.addService),
    path('add-service/', ServiceView.as_view(), name='service_view'),
    path('get-service/<int:id>', views.showService),
    path('update-service/<int:id>', ServiceView.as_view()),
    path('delete-service/<int:id>', views.deleteService),
]
