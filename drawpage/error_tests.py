
from exceptions import UnequalListsError, DuplicatesError

def map_labels_to_activities(labels: list, activities: list) -> list:
        map = {}
        try:
            if not isinstance(labels, list) or not isinstance(activities, list):
                raise TypeError # raise an error if one of the inputs is not a list
            if len(labels) != len(activities):
                raise UnequalListsError # raise an error if they are not equal in length
            for given_label, labelled_activity in zip(labels, activities): # for each given label
                if not isinstance(given_label, str) or not isinstance(labelled_activity, str):
                    raise TypeError # raise an error if one of the values within the passed lists is not a string
                if given_label in map.keys(): # if the key is not already in the map
                    raise DuplicatesError # raise an error if they are not unique
                elif given_label not in map.keys():
                    map[given_label] = labelled_activity # create key and add the corresponding activity
        except UnequalListsError:
            print("The labels and activities do not map one-to-one")
        except DuplicatesError:
            print("One of the given labels is duplicated")
        except:
            print("Something went wrong mapping the labels to the activities!")
        return map

labels_correct = ['a', 'b', 'c']
labels_duplicate = ['a', 'b', 'a']
labels_unequal = ['a', 'b']
labels_not = 'a'

activities = ['hi', 'bye', 'hello']

print(map_labels_to_activities(labels_correct, activities))
print(map_labels_to_activities(labels_duplicate, activities))
