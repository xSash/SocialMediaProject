from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from django.core.urlresolvers import reverse

# Create your models here.

# Red pk 1


class Users(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_profile_picture = models.FileField()
    user_banner_picture = models.FileField()
    mobile_phone = models.CharField(max_length=50)
    is_verified = models.BooleanField(default=False)
    birthday = models.DateField()
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=200)
    gender = models.CharField(max_length=100)
    bio = models.TextField(max_length=140, null=True)


    def __unicode__(self):
        return unicode(self.user)


class Post(models.Model):
    user = models.ForeignKey(User)
    content = models.TextField(max_length=140)
    pub_date = models.DateTimeField(default=datetime.now)

    def __unicode__(self):
        return unicode(self.user)