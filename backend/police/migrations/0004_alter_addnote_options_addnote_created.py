# Generated by Django 4.0.4 on 2022-05-16 07:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('police', '0003_addnote'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='addnote',
            options={'ordering': ('created',)},
        ),
        migrations.AddField(
            model_name='addnote',
            name='created',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]