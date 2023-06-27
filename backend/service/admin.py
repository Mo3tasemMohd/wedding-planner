from django.contrib import admin
from service.models import Service,ServiceCategory,ReservedDates

# Register your models here.
admin.site.register(Service)
admin.site.register(ServiceCategory)
admin.site.register(ReservedDates)
