from __future__ import unicode_literals
from django.db import models
import datetime, json

class GroupManager(models.Manager):
    def summarize(self, group):
        return {
            "owner": {"id": group.owner.id, "username":group.owner.user.username},
            "title": group.title,
            "profile_image": group.profile_image
        }

    def serialize(self, group):
        from account import Account
        return {
            "owner": Account.objects.summarize(group.owner),
            "title": group.title,
            "description": group.description,
            "profile_image": group.profile_image,
            "cover_image": group.cover_image,
            "contributors": [Account.objects.summarize(a) for a in group.contributors.all()],
            "admins": [Account.objects.summarize(a) for a in group.admins.all()]
        }

# Create your models here.
class Group(models.Model):
<<<<<<< Updated upstream
    objects = GroupManager()
    owner = models.ForeignKey('Account', related_name='group_owner')
    title = models.CharField(max_length=63, default='')
    description = models.TextField(max_length=4095)
    profile_image = models.CharField(max_length=255)
    cover_image = models.CharField(max_length=255)
    contributors = models.ManyToManyField('Account', related_name='group_member')
    admins = models.ManyToManyField('Account', related_name='group_admin')
=======
   objects = GroupManager()
   owner = models.ForeignKey('Account', related_name='group_owner')
   title = models.CharField(max_length=63, default='')
   description = models.TextField(max_length=4095)
   profile_image = models.CharField(max_length=255)
   cover_image = models.CharField(max_length=255)
   contributors = models.ManyToManyField('Account', related_name='group_member')
   admins = models.ManyToManyField('Account', related_name='group_admin')
>>>>>>> Stashed changes

   def retrieve(self, user):
      return self.find(user=user)[0]
