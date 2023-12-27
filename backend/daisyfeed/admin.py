from django.contrib import admin
from .models import FeedItem, MinimalUser, Profile, FriendRequest

# Register your models here.
admin.site.register(FeedItem)
admin.site.register(Profile)
admin.site.register(FriendRequest)
admin.site.register(MinimalUser)
