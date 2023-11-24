from .views import FeedItemViewSet
from rest_framework import routers
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r"feed-item", FeedItemViewSet)

urlpatterns = [path("", include(router.urls))]
