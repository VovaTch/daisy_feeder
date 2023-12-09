from django.db import models
from django.contrib.auth.models import AbstractUser, User


# Friendly user models
class FriendlyUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    friends = models.ManyToManyField(
        "self",
        blank=True,
    )

    # # Add a unique related_name for the groups field
    # groups = models.ManyToManyField(
    #     "auth.Group",
    #     related_name="%(app_label)s_%(class)s_groups",
    #     related_query_name="%(app_label)s_%(class)ss_groups",
    #     blank=True,
    # )

    # # Add a unique related_name for the user_permissions field
    # user_permissions = models.ManyToManyField(
    #     "auth.Permission",
    #     related_name="%(app_label)s_%(class)s_user_permissions",
    #     related_query_name="%(app_label)s_%(class)s_user_permissions",
    #     blank=True,
    # )

    def __str__(self):
        return self.user.username


class FriendRequest(models.Model):
    from_user = models.ForeignKey(
        FriendlyUser,
        related_name="%(app_label)s_%(class)s_from_user",
        on_delete=models.CASCADE,
    )
    to_user = models.ForeignKey(
        FriendlyUser,
        related_name="%(app_label)s_%(class)s_to_user",
        on_delete=models.CASCADE,
    )


# Feeding item
class FeedItem(models.Model):
    FOOD_CHOICES = [("wet", "Wet"), ("dry", "Dry")]

    feeder = models.ForeignKey(FriendlyUser, on_delete=models.CASCADE)
    amount = models.IntegerField()
    datetime = models.DateTimeField()
    food_choice = models.CharField(max_length=4, choices=FOOD_CHOICES, default="dry")

    def __str__(self) -> str:
        return f"FOOD ITEM: at time {self.datetime}, {self.feeder.user.username} fed {self.amount} of {self.food_choice} food."
