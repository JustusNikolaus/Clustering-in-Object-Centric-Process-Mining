# Library imports
from django.db import models
from filecmp import cmp

# Create your models here.
class Log(models.Model):

    log = models.BinaryField()
    log_model = models.BinaryField(null=True, default=None)
    log_name = models.CharField(max_length=500)
    #log_image = models.ImageField()

    def __str__(self):
        return self.log_name

        
