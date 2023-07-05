# Generated by Django 4.2.2 on 2023-07-05 12:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('service', '0019_alter_reserveddates_slot_reserved'),
    ]

    operations = [
        migrations.AddField(
            model_name='reserveddates',
            name='user_reserved',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]