# Generated by Django 4.2.11 on 2024-08-07 06:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_alter_memberprofile_register_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='memberprofile',
            name='membership_end_date',
        ),
        migrations.RemoveField(
            model_name='memberprofile',
            name='membership_start_date',
        ),
        migrations.RemoveField(
            model_name='memberprofile',
            name='membership_type',
        ),
        migrations.CreateModel(
            name='Membership',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('membership_type', models.CharField(choices=[('Base', 'Base'), ('Premium', 'Premium'), ('Gold', 'Gold')], max_length=50)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]