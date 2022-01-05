# Library imports
from django.db import models
from filecmp import cmp

# Create your models here.
class Log(models.Model):

    log = models.BinaryField()
    log_model = models.BinaryField(null=True, default=None)
    log_name = models.CharField(max_length=500)
    #log_image = models.ImageField()

    def __eq__(self, other):
        # two logs are equal, if their associated log files are equal
        return cmp(self.log_file.path, other.log_file.path)

    def __hash__(self):
        # due to overwriting the __eq__ function, the __hash__ function
        # needs to be set as well
        # (Django overwrites it)
        return super().__hash__()

    def __str__(self):
        return self.log_name

        
