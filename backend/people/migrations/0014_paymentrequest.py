# Generated by Django 4.0.4 on 2022-07-02 09:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lawyer', '0007_delete_paymentrequest'),
        ('people', '0013_assignedcomplaints_request_date'),
    ]

    operations = [
        migrations.CreateModel(
            name='PaymentRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.IntegerField(null=True)),
                ('date', models.DateField(null=True)),
                ('payment_type', models.CharField(max_length=150, null=True)),
                ('payment_status', models.CharField(choices=[('completed', 'completed'), ('pending', 'pending')], max_length=150, null=True)),
                ('lawyer_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='lawyer.lawyer')),
                ('people', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='people.people')),
            ],
        ),
    ]
