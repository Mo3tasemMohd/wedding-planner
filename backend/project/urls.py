from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('halls', include('hall_service.urls')),
    path('customer', include('customer.urls')),
    path('package', include('package.urls')),
]
