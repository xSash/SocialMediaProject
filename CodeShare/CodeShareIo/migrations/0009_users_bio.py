# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-12-03 05:02
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CodeShareIo', '0008_auto_20161201_0120'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='bio',
            field=models.TextField(max_length=140, null=True),
        ),
    ]
