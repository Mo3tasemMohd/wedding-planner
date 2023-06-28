# Generated by Django 4.2.2 on 2023-06-27 21:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0006_alter_service_service_images'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='service',
            name='service_images',
        ),
        migrations.CreateModel(
            name='ServiceImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='service_images')),
                ('service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='service.service')),
            ],
        ),
    ]
