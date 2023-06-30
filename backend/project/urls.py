from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('service', include('service.urls')),
    # path('provider', include('service_provider.urls')),
    path('customer/', include('customer.urls')),
    path('package/', include('package.urls')),
]
