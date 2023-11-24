from django.db import models
from django.forms import CharField, DateTimeField, IntegerField


# Create your models here.
class FeedItem(models.Model):
    item_id = CharField(max_length=256)
    feeder = CharField(max_length=256)
    amount = IntegerField(min_value=0)
    datetime = DateTimeField()
