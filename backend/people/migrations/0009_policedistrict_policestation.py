# Generated by Django 4.0.4 on 2022-06-08 15:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0008_complaintregistration_requested_date'),
    ]

    operations = [
        migrations.CreateModel(
            name='PoliceDistrict',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('police_district', models.CharField(max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='PoliceStation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('police_station', models.CharField(max_length=100, null=True)),
                ('police_district', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='people.policedistrict')),
            ],
        ),
    ]
