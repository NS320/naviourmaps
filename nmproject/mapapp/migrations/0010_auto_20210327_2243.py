# Generated by Django 3.1.7 on 2021-03-27 13:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mapapp', '0009_auto_20210323_2313'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myuser',
            name='user_id',
            field=models.CharField(max_length=20, unique=True),
        ),
    ]
