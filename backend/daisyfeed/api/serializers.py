from rest_framework import serializers
from ..models import FeedItem


class FeedItemSerializer(serializers.ModelSerializer):
    """
    Serializer class for the FeedItem model.

    Serializes FeedItem instances into JSON representations and parses JSON data
    into valid FeedItem objects for use with Django REST Framework.

    Attributes:
        Meta:
            model (type): The Django model associated with this serializer.
            fields (tuple): The fields from the model to be included in the serialized output.
    """

    class Meta:
        model = FeedItem
        fields = ("id", "feeder", "amount", "datetime", "food_choice")
