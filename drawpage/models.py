# Library imports
from django.db import models
from os.path import splitext
from pm4py.objects.conversion.log import converter as log_converter
from pm4py.objects.log.importer.xes import importer as xes_importer_factory
from pm4py.objects.log.util import dataframe_utils
from filecmp import cmp
import pandas as pd

# Create your models here.
class Log(models.Model):
    """
    A model to represent an uploaded eventlog
    ---
    Arguments:
        log_file:
            the eventlog file
        log_name:
            the name of the eventlog (default: log_file.name)
    ---
    Properties:
        log_file:
            the eventlog file
        log_name:
            the name of the eventlog
    ---
    Methods:
        pm4py_log(): returns EventLog object of log
    """
    # the file itself
    log_file = models.FileField(upload_to='tmp/logs')

    # the name of the file
    log_name = models.CharField(max_length=500)

    def pm4py_log(self):
        """returns an EventLog object of the log file linked to the model"""
        _, extension = splitext(self.log_file.path)
        if extension == ".csv":
            log = pd.read_csv(self.log_file.path, sep=",")
            log = dataframe_utils.convert_timestamp_columns_in_df(log)
            log = log_converter.apply(log)
        else:
            log = xes_importer_factory.apply(self.log_file.path)
        return log

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

        
