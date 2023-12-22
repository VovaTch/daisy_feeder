from django.http import HttpRequest
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from ..models import MinimalUser, Profile, FriendRequest, FeedItem
from .serializers import (
    MinimalUserSerializer,
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


class MinimalUserViewSet(viewsets.ModelViewSet):
    queryset = MinimalUser.objects.all()
    serializer_class = MinimalUserSerializer


# User API view, maybe messy to do it like that, but first time I'm dealing with Django so deal with it
@api_view(["POST"])
def login(request: HttpRequest) -> Response:
    user = get_object_or_404(User, username=request.data["username"])  # type: ignore
    if not user.check_password(request.data["password"]) or not user.is_active:  # type: ignore
        return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)

    return Response(
        {"token": token.key, "user": serializer.data}, status=status.HTTP_202_ACCEPTED
    )


@api_view(["POST"])
def signup(request: HttpRequest) -> Response:
    user_serializer = UserSerializer(data=request.data)  # type: ignore
    min_user_serializer = MinimalUserSerializer(data=request.data)  # type: ignore
    if user_serializer.is_valid() and min_user_serializer.is_valid():
        # Handle user serializer
        user_serializer.save()
        user = User.objects.get(username=request.data["username"])  # type: ignore
        user.set_password(request.data["password"])  # type: ignore
        user.save()

        # Handle minimal user serializer
        min_user_serializer.save()
        min_user = MinimalUser.objects.get(username=request.data["username"])  # type: ignore
        min_user.save()

        # Now that the user and profile are created, handle many-to-many relationships
        friends_data = request.data.get("profile", {}).get("friends", [])  # type: ignore
        user.profile.friends.set(friends_data)  # type: ignore

        token = Token.objects.create(user=user)
        return Response(
            {
                "token": token.key,
                "user": user_serializer.data,
                "min_user": min_user_serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )
    return Response(
        {
            "user_error": user_serializer.errors,
            "min_user_error": min_user_serializer.errors,
        },
        status=status.HTTP_400_BAD_REQUEST,
    )


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


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user(request: HttpRequest) -> Response:
    user_serializer = UserSerializer(request.user)
    return Response(user_serializer.data, status=status.HTTP_200_OK)


# Feeding item view
class FeedItemViewSet(viewsets.ModelViewSet):
    queryset = FeedItem.objects.all()
    serializer_class = FeedItemSerializer


@api_view(["POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def handle_friend_request_response(
    request: HttpRequest, friend_request_id: int
) -> Response:
    """
    Handles a friend request response, either approving or denying it. If approved, the user is added to the friends
    list of the user that sent the request.

    Args:
        request (HttpRequest): Http Request
        friend_request_id (int): Friend request ID number

    Returns:
        Response: Response object
    """

    friend_request = get_object_or_404(FriendRequest, id=friend_request_id)
    if str(request.user) != str(friend_request.to_user):
        return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

    if request.method == "POST":
        friend_request.pending = False
        friend_request.approved = request.data.get("approved", False)  # type: ignore

        friend_request.save()

        user_profile = Profile.objects.get(user=request.user)

        if friend_request.approved:
            user_profile.friends.add(friend_request.from_user)
            user_profile.save()

        profile_serializer = ProfileSerializer(user_profile)
        friend_request_serializer = FriendRequestSerializer(friend_request)

        return Response(
            {
                "message": "Friend request handled successfully",
                "profile": profile_serializer.data,
                "friend_request": friend_request_serializer.data,
            }
        )

    return Response(
        {"error": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
    )
