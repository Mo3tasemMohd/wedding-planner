# Generated by Django 4.2.2 on 2023-06-28 20:28

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0004_customer_is_provider_alter_customer_customer_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]