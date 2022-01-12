# Library imports
from django.db import models

# Create your models here.
class Log(models.Model):

    log = models.BinaryField()
    log_model = models.BinaryField(null=True, default=None)
    name = models.CharField(max_length=500)
    image = models.ImageField(null=True, default=None)
    nodes = models.IntegerField(default=0)
    edges = models.IntegerField(default=0)

    def __str__(self):
        return self.name
