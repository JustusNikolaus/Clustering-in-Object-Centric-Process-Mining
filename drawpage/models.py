# Library imports
from django.db import models

# Create your models here.
class Log(models.Model):

    log = models.BinaryField()
    log_model = models.BinaryField(null=True, default=None)
    log_name = models.CharField(max_length=500)
    log_image = models.ImageField(null=True, default=None)

    def __str__(self):
        return self.log_name
