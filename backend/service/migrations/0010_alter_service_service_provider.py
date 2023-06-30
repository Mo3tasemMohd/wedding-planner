# Generated by Django 4.2.2 on 2023-06-28 20:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0005_customer_created_at'),
        ('service', '0009_service_created_at_alter_service_service_provider'),
    ]

    operations = [
        migrations.AlterField(
            model_name='service',
            name='service_provider',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='customer.customer'),
        ),
    ]