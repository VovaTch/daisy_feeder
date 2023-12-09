from django.contrib import admin
from .models import FeedItem, Profile, FriendRequest

# Register your models here.
admin.site.register(FeedItem)
admin.site.register(Profile)
admin.site.register(FriendRequest)
