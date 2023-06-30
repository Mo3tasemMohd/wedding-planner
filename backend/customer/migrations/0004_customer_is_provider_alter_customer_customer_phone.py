# Generated by Django 4.2.2 on 2023-06-28 20:20

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0003_alter_customer_customer_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='is_provider',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='customer',
            name='customer_phone',
            field=models.CharField(max_length=11, validators=[django.core.validators.RegexValidator(message='Please enter a valid Egyptian phone number', regex='^01[0|1|2|5]{1}[0-9]{8}$')]),
        ),
    ]