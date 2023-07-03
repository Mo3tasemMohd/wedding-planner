from django.contrib import admin
from service.models import Service, ServiceImage,ReservedDates, ServiceRate #,ServiceCategory
#from .forms import ServiceAdminForm


class ServiceImageInline(admin.TabularInline):
    model = ServiceImage
@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    #form = ServiceAdminForm
    inlines = [ServiceImageInline]


#admin.site.register(Service)
#admin.site.register(ServiceCategory)
<<<<<<< HEAD
admin.site.register(ReservedDates)
=======
admin.site.register(ReservedDates)
admin.site.register(ServiceRate)
>>>>>>> 0e981b2623e4e1518578ba9daf3216e1a32d5c76
