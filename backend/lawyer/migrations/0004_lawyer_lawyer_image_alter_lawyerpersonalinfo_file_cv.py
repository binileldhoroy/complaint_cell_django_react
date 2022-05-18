# Generated by Django 4.0.4 on 2022-05-16 15:16

from django.db import migrations, models
import people.utils


class Migration(migrations.Migration):

    dependencies = [
        ('lawyer', '0003_lawyer_enrollment_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='lawyer',
            name='lawyer_image',
            field=models.ImageField(null=True, upload_to=people.utils.PathAndRename('/images')),
        ),
        migrations.AlterField(
            model_name='lawyerpersonalinfo',
            name='file_cv',
            field=models.FileField(null=True, upload_to=people.utils.PathAndRename('/images')),
        ),
    ]
