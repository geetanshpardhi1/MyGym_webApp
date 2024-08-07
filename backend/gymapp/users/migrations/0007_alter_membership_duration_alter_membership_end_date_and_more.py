# Generated by Django 4.2.11 on 2024-08-07 06:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_membership_duration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='membership',
            name='duration',
            field=models.CharField(choices=[('Monthly', 30), ('Quarterly', 90), ('Yearly', 365)], default='Monthly', max_length=50),
        ),
        migrations.AlterField(
            model_name='membership',
            name='end_date',
            field=models.DateField(blank=True, editable=False, null=True),
        ),
        migrations.AlterField(
            model_name='membership',
            name='start_date',
            field=models.DateField(blank=True, editable=False, null=True),
        ),
    ]
