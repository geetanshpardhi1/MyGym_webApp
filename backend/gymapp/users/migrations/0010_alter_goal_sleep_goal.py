# Generated by Django 4.1 on 2024-09-04 07:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_goal'),
    ]

    operations = [
        migrations.AlterField(
            model_name='goal',
            name='sleep_goal',
            field=models.DecimalField(decimal_places=1, default=8.0, max_digits=4),
        ),
    ]
