# Generated by Django 4.2.2 on 2023-07-03 19:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0018_merge_20230703_1925'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reserveddates',
            name='slot_reserved',
            field=models.IntegerField(null=True),
        ),
    ]