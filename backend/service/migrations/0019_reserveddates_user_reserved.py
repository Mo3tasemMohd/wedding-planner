# Generated by Django 4.2.2 on 2023-07-05 21:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('service', '0018_merge_20230706_0016'),
    ]

    operations = [
        migrations.AddField(
            model_name='reserveddates',
            name='user_reserved',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
