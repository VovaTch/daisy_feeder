from rest_framework.routers import DefaultRouter
from django.urls import re_path, path
from .views import (
    FriendRequestViewSet,
    FeedItemViewSet,
    MinimalUserViewSet,
    ProfileViewSet,
    get_user,
    login,
    signup,
    test_token,
    handle_friend_request_response,
)

router = DefaultRouter()
router.register(r"profile", ProfileViewSet, basename="profile")
router.register(r"friend-requests", FriendRequestViewSet, basename="friend-request")
router.register(r"feeditem", FeedItemViewSet, basename="feeditem")
router.register(r"minimal-user", MinimalUserViewSet, basename="min-user")

# urlpatterns = [path("", include(router.urls))]
urlpatterns = [
    re_path("login", login),
    re_path("signup", signup),
    re_path("test-token", test_token),
    re_path("get-user", get_user),
    re_path(
        "friend-request-response/(?P<friend_request_id>\d+)/$",
        handle_friend_request_response,
    ),
]
urlpatterns += router.urls
