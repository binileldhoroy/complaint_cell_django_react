# Generated by Django 4.0.4 on 2022-05-10 16:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Police',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('officer_incharge', models.CharField(max_length=100, null=True)),
                ('officer_position', models.CharField(max_length=100, null=True)),
                ('ps_district', models.CharField(max_length=100, null=True)),
                ('ps_place', models.CharField(max_length=100, null=True)),
                ('phone', models.IntegerField(null=True, unique=True)),
                ('is_police', models.BooleanField(default=True, null=True)),
            ],
        ),
    ]
