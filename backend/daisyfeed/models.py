from django.db import models


class FeedItem(models.Model):
    """
    Model representing a feeding item for a cat.

    Attributes:
    ------
        item_id (str): A unique identifier for the feeding item.
        feeder (str): The person or entity who fed the cat.
        amount (int): The amount of food fed to the cat.
        datetime (datetime): The date and time when the feeding occurred.
        food_choice (str): The type of cat food fed (e.g., 'wet' or 'dry').

    Methods:
    -----
        __str__(): Returns a string representation of the feeding item.
    """

    FOOD_CHOICES = [("wet", "Wet"), ("dry", "Dry")]

    item_id = models.CharField(max_length=256)
    feeder = models.CharField(max_length=256)
    amount = models.IntegerField()
    datetime = models.DateTimeField()
    food_choice = models.CharField(max_length=4, choices=FOOD_CHOICES, default="dry")

    def __str__(self) -> str:
        return f"FOOD ITEM: at time {self.datetime}, {self.feeder} fed {self.amount} of {self.food_choice} food."
