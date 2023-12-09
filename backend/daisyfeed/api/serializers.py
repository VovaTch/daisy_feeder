from typing import Any
from rest_framework import serializers
from django.contrib.auth.models import User
from sympy import true

from ..models import Profile, FriendRequest, FeedItem


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
        fields = ("id", "from_user", "to_user")


class UserSerializer(serializers.ModelSerializer):
    # profile = FriendlyUserSerializer(write_only=True)

    class Meta:
        model = User
        fields = ("id", "username", "email", "password")  # , "user")

    extra_kwargs = {"password": {"write_only": True}}

    # def create(self, validated_data: dict[str, Any]) -> User:
    #     profile_data = validated_data.pop("user")
    #     user = User.objects.create_user(**validated_data)
    #     FriendlyUser.objects.create(user=user, **profile_data)
    #     return user


class FeedItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedItem
        fields = ("id", "feeder", "amount", "datetime", "amount", "food_choice")
