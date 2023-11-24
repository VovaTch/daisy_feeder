from .views import FeedItemViewSet
from rest_framework import routers
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r"feeditem", FeedItemViewSet, basename="feeditem")

# urlpatterns = [path("", include(router.urls))]
urlpatterns = []
urlpatterns += router.urls
