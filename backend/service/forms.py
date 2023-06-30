# from django import forms
# from django.contrib.admin.widgets import AdminFileWidget, ClearableFileInput, CheckboxSelectMultiple
# from django.utils.translation import gettext_lazy as _
# from .models import Service

# class ServiceAdminForm(forms.ModelForm):
#     service_images = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple': True}), required=False, label=_('Images'))

#     class Meta:
#         model = Service
#         fields = '__all__'
#         widgets = {
#             'service_images': CheckboxSelectMultiple(),
#         }


# from django import forms
# from django.contrib.admin.widgets import AdminFileWidget, CheckboxSelectMultiple
# from django.utils.translation import gettext_lazy as _
# from .models import Service

# class ServiceAdminForm(forms.ModelForm):
#     service_images = forms.FileField(widget=AdminFileWidget(attrs={'multiple': True}), required=False, label=_('Images'))

#     class Meta:
#         model = Service
#         fields = '__all__'
#         widgets = {
#             'service_images': CheckboxSelectMultiple(),
#         }



# from django import forms
# from django.forms.widgets import ClearableFileInput
# from django.utils.translation import gettext_lazy as _
# from .models import Service

# class ServiceAdminForm(forms.ModelForm):
#     service_images = forms.FileField(widget=ClearableFileInput(attrs={'multiple': True}), required=False, label=_('Images'))

#     class Meta:
#         model = Service
#         fields = '__all__'


from django import forms
from multiupload.fields import MultiFileField
from django.utils.translation import gettext_lazy as _
from .models import Service

class ServiceAdminForm(forms.ModelForm):
    service_images = MultiFileField(min_num=1, max_num=10, label=_('Service Images'))

    class Meta:
        model = Service
        fields = '__all__'