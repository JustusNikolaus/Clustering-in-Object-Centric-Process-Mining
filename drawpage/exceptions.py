# Foundational class for other exceptions
class Error(Exception):
    pass

# Exception raised for unequally sized lists
# Example would be two unequal lengths of lists that need to be equal in length
class UnequalListsError(Error):
    # message = the exception message
    # inequality = the unequal lists
    def __init__(self, inequality, message):
        self.message = message
        self.inequality = inequality

# Exception raised when there are duplicate keys when they need to be unique
class DuplicatesError(Error):
    # message = the exception message
    # key = the duplicated key
    def __init__(self, key, message):
        self.message = message
        self.key = key
