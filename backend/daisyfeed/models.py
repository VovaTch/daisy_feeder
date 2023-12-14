from django.db import models
from django.contrib.auth.models import User


# Friendly user models
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    friends = models.ManyToManyField(
        "self",
        blank=True,
    )

    def __str__(self):
        return self.user.username


class MinimalUser(models.Model):
    username = models.CharField(max_length=256)
    email = models.CharField(max_length=256)


class FriendRequest(models.Model):
    from_user = models.ForeignKey(
        Profile,
        related_name="%(app_label)s_%(class)s_from_user",
        on_delete=models.CASCADE,
    )
    to_user = models.ForeignKey(
        Profile,
        related_name="%(app_label)s_%(class)s_to_user",
        on_delete=models.CASCADE,
    )
    approved = models.BooleanField(blank=True)


# Feeding item
class FeedItem(models.Model):
    FOOD_CHOICES = [("wet", "Wet"), ("dry", "Dry")]

    feeder = models.ForeignKey(Profile, on_delete=models.CASCADE)
    amount = models.IntegerField()
    datetime = models.DateTimeField()
    food_choice = models.CharField(max_length=4, choices=FOOD_CHOICES, default="dry")

    def __str__(self) -> str:
        return f"FOOD ITEM: at time {self.datetime}, {self.feeder.user.username} fed {self.amount} of {self.food_choice} food."
