from rest_framework.routers import DefaultRouter
from django.urls import re_path
from .views import (
    FriendRequestViewSet,
    FeedItemViewSet,
    ProfileViewSet,
    login,
    signup,
    test_token,
)

router = DefaultRouter()
router.register(r"profile", ProfileViewSet, basename="profile")
router.register(r"friend-requests", FriendRequestViewSet, basename="friend-request")
router.register(r"feeditem", FeedItemViewSet, basename="feeditem")

# urlpatterns = [path("", include(router.urls))]
urlpatterns = [
    re_path("login", login),
    re_path("signup", signup),
    re_path("test-token", test_token),
]
urlpatterns += router.urls
