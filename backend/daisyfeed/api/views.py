from django.http import HttpRequest
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from ..models import Profile, FriendRequest, FeedItem
from .serializers import (
    ProfileSerializer,
    FriendRequestSerializer,
    FeedItemSerializer,
    UserSerializer,
)
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token


# Specific FriendlyUser views, for the user itself and the friend requests.
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class FriendRequestViewSet(viewsets.ModelViewSet):
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer


# User API view, maybe messy to do it like that, but first time I'm dealing with Django so deal with it
@api_view(["POST"])
def login(request: HttpRequest) -> Response:
    user = get_object_or_404(User, username=request.data["username"])  # type: ignore
    if not user.check_password(request.data["password"]):  # type: ignore
        return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)

    return Response(
        {"token": token.key, "user": serializer.data}, status=status.HTTP_202_ACCEPTED
    )


@api_view(["POST"])
def signup(request: HttpRequest) -> Response:
    serializer = UserSerializer(data=request.data)  # type: ignore
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data["username"])  # type: ignore
        user.set_password(request.data["password"])  # type: ignore
        user.save()

        # Now that the user and profile are created, handle many-to-many relationships
        friends_data = request.data.get("profile", {}).get("friends", [])  # type: ignore
        user.profile.friends.set(friends_data)  # type: ignore

        token = Token.objects.create(user=user)
        return Response(
            {"token": token.key, "user": serializer.data},
            status=status.HTTP_201_CREATED,
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request: HttpRequest) -> Response:
    return Response({"detail": f"Passed for user with email: {request.user.email}"})  # type: ignore


# Friend request sending
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def send_friend_request(request: HttpRequest) -> Response:
    serializer = FriendRequestSerializer(data=request.data)  # type: ignore
    if serializer.is_valid():
        serializer.save(from_user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Feeding item view
class FeedItemViewSet(viewsets.ModelViewSet):
    queryset = FeedItem.objects.all()
    serializer_class = FeedItemSerializer
