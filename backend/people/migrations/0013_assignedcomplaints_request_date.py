# Generated by Django 4.0.4 on 2022-06-28 13:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0012_complaintregistration_forwarded'),
    ]

    operations = [
        migrations.AddField(
            model_name='assignedcomplaints',
            name='request_date',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]