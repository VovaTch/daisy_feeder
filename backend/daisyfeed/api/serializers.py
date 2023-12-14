from rest_framework import serializers
from django.contrib.auth.models import User

from ..models import MinimalUser, Profile, FriendRequest, FeedItem


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
            "id",
            "friends",
        )


class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ("id", "from_user", "to_user", "approved")


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    def create(self, validated_data):
        profile_data = validated_data.pop("profile", {})
        friends_data = profile_data.get("friends", [])

        user = User.objects.create(**validated_data)
        profile = Profile.objects.create(user=user)
        profile.friends.set(friends_data)

        return user

    def update(self, instance, validated_data):
        instance.username = validated_data.get("username", instance.username)
        if "profile" in validated_data:
            instance.profile.friends = validated_data["profile"].get(
                "friends", instance.profile.friends
            )
        return instance

    class Meta:
        model = User
        fields = ("id", "username", "email", "password", "profile")


class MinimalUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MinimalUser
        fields = ("id", "username", "email")


class FeedItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedItem
        fields = ("id", "feeder", "amount", "datetime", "amount", "food_choice")
