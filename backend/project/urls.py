from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('service/', include('service.urls')),
    path('provider/', include('service_provider.urls')),
    path('customer/', include('customer.urls')),
    path('package/', include('package.urls')),
    
]

# URL for image directory
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
