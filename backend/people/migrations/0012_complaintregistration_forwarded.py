# Generated by Django 4.0.4 on 2022-06-23 09:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0011_people_complete_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='complaintregistration',
            name='forwarded',
            field=models.BooleanField(default=False, null=True),
        ),
    ]
