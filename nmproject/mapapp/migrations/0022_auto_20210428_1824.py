# Generated by Django 3.1.7 on 2021-04-28 09:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mapapp', '0021_auto_20210418_1740'),
    ]

    operations = [
        migrations.AlterField(
            model_name='navigations',
            name='goal_address',
            field=models.CharField(max_length=65),
        ),
        migrations.AlterField(
            model_name='navigations',
            name='start_address',
            field=models.CharField(max_length=65),
        ),
    ]
