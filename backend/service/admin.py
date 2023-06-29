from django.contrib import admin
from service.models import Service, ServiceImage,ReservedDates #,ServiceCategory
from .forms import ServiceAdminForm


class ServiceImageInline(admin.TabularInline):
    model = ServiceImage

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    #form = ServiceAdminForm
    inlines = [ServiceImageInline]


#admin.site.register(Service)
#admin.site.register(ServiceCategory)
admin.site.register(ReservedDates)
