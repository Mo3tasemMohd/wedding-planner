# Generated by Django 4.2.2 on 2023-06-28 20:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('service_provider', '0003_remove_serviceprovider_provider_service_category'),
        ('service', '0007_remove_service_service_images_serviceimage'),
    ]

    operations = [
        migrations.AddField(
            model_name='service',
            name='service_provider',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='service_provider.serviceprovider'),
        ),
        migrations.AlterField(
            model_name='service',
            name='service_service_category',
            field=models.CharField(choices=[('Hall-Reservation', 'Hall-Reservation'), ('Car-Rental', 'Car-Rental'), ('Photo-Session', 'Photo-Session'), ('MakeUp-Artist', 'MakeUp-Artist')], max_length=20),
        ),
        migrations.AlterField(
            model_name='serviceimage',
            name='image',
            field=models.ImageField(upload_to='media/service_images'),
        ),
    ]
