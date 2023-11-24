from rest_framework import viewsets
from ..models import FeedItem
from .serializers import FeedItemSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt


@method_decorator(csrf_exempt, name="dispatch")
class FeedItemViewSet(viewsets.ModelViewSet):
    """
    ViewSet class for interacting with the FeedItem model through the Django REST Framework.

    This ViewSet provides CRUD (Create, Retrieve, Update, Delete) operations for FeedItem instances.

    Attributes:
        queryset (QuerySet): The set of FeedItem instances that can be accessed through this ViewSet.
        serializer_class (type): The serializer class used to transform FeedItem instances into JSON
            representations and parse JSON data into valid FeedItem objects.
    """

    queryset = FeedItem.objects.all()
    serializer_class = FeedItemSerializer
