# Generated by Django 4.2.2 on 2023-06-28 20:28

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('service_provider', '0004_serviceprovider_created_at'),
        ('service', '0008_service_service_provider_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='service',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='service',
            name='service_provider',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='service_provider.serviceprovider'),
        ),
    ]
