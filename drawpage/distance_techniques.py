# Library imports
# For the calculation of the Levenshtein distance
from Levenshtein import distance as levdistance
# For filtering lists into unique strings
from sklearn.utils.multiclass import unique_labels as unique_strings
# For the generation of ASCII characters
import string
# For arrays and the removal of diagonals
import numpy as np
# For the calculation of the Euclidean distance
from sklearn.neighbors import DistanceMetric 

# Local imports
# For error and exception handling
from drawpage.exceptions import DuplicatesError, UnequalListsError

class LevenshteinDistance:

    def __init__(self, list):
        self.list = list

    def map_labels_to_activities(self, labels: list, activities: list) -> list:
        """

        Args:
            labels (list): list of labels
            activities (list): list of activities

        Raises:
            UnequalListsError: [description]
            TypeError: [description]
            DuplicatesError: [description]

        Returns:
            list: labels mapped to unique activities
        """
        map = {}
        try:
            if len(labels) != len(activities):
                raise UnequalListsError(labels, "Error") # raise an error if they are not equal in length
            for given_label, labelled_activity in zip(labels, activities): # for each given label
                if not isinstance(given_label, str) or not isinstance(labelled_activity, str):
                    raise TypeError # raise an error if one of the values within the passed lists is not a string
                if given_label in map: # if the key is already in the map, then it is a duplicate
                    raise DuplicatesError(given_label, "Error") # raise an error if they are not unique
                else:
                    map[given_label] = labelled_activity # create key and add the corresponding activity
        except UnequalListsError:
            print("The labels and activities do not map one-to-one")
        except DuplicatesError:
            print("One of the given labels is duplicated")
        except:
            print("Something went wrong mapping the labels to the activities!")
        return map

    def label_activities(self, obj_list: list) -> list:
        """

        Args:
            obj_list (list): list of activities/objects within a control flow

        Returns:
            list: alphabet labels for each activity/object within a control flow
        """
        unique_activities = unique_strings(obj_list) # sorting through the input and using only unique strings
        labels = string.ascii_letters + string.digits + string.punctuation # alphabet, digit and, punctuation labels
        return [
            labels[label_counter]
            for label_counter, _ in enumerate(unique_activities)
        ]

    def label_control_flows(self, cf_list: list) -> list:
        """

        Args:
            cf_list (list): list of control flows

        Raises:
            KeyError: [description]

        Returns:
            list: concatenated control flow using the labels from label_activities
        """
        new_list = [] # new list to list out all items within the control flows list
        labelled_control_flows = [] # list of the concatenated strings for the control flows
        list_map = {} # new dictionary to map out the labels to the activities
        try:
            for sublist in cf_list: # going through the sublists to add them to the new list
                new_list += sublist
            #print(new_list)
            given_labels = self.label_activities(new_list) # giving unique labels to all items within the passed control flows list
            #print(given_labels) 
            list_map = self.map_labels_to_activities(given_labels, unique_strings(new_list)) # creating a dict of the labels and the unique list items
            #print(list_map)
            # creating the concatenation of characters for each sublist
            list_map_rev = {v: k for k, v in list_map.items()} # reverse the dictionary so that the characters are the values instead of keys
            for sublist in cf_list: # going through the control flows within the original list
                control_flow = "" # string for the control flow labels
                for given_activity in sublist:
                    if given_activity in list_map_rev:
                        control_flow += list_map_rev[given_activity] # adds the character label to the control flow label
                    else:
                        raise KeyError # key corresponding to given_activity not found within the list
                labelled_control_flows.append(control_flow) # adds the labelled control flow to the list
        except KeyError:
            print("There was a problem finding one of the labels")
        except: 
            print("Something went wrong with concatenation!")
        return labelled_control_flows

    def get_levenshtein_distances(self, cf_list: list) -> list:
        """

        Args:
            cf_list (list): list of control flows

        Returns:
            list: distances[[]] between all pairs of control flows (represented by strings) in a list of control flows
        """
        labelled_list = self.label_control_flows(cf_list)
        distances = []
        # First pointer, outer loop: traverse each word in the list once
        # The number of inner lists within distances = the number of strings in the first iteration
        try:
            for firstStrings in labelled_list:
                sub_distances = [
                    levdistance(firstStrings, secondStrings)
                    for secondStrings in labelled_list
                ]
                distances.append(sub_distances)
            return distances
        except TypeError:
            print("Invalid input for the Levenshtein distance function, please enter a list with control flows")
        except Exception as exception_type:
            print(
                'An error/exception occured while trying to calculate the Levenshtein distance of type {0}. Arguments:\n{1!r}'.format(
                    type(exception_type).__name__, exception_type.args
                )
            )

class EuclideanDistance:

    def __init__(self, list):
        self.list = list

    def get_euclidean_distances(self, vectors: list) -> list:
        """

        Args:
            vectors (list): list of vectors

        Returns:
            list: Euclidean distances between all pairs of vectors in two lists of strings
        """
        try:
            distance = DistanceMetric.get_metric('euclidean')
            return distance.pairwise(vectors)
        except TypeError:
            print("Invalid input for the Euclidean distance function, please enter a list with numerical values")
        except Exception as exception_type:
            print("An error/exception occured while trying to calculate the Euclidean distance of type {0}. Arguments:\n{1!r}".format(type(exception_type).__name__, exception_type.args))

class BooleanDistance:

    def __init__(self, list):
        self.list = list

    def get_boolean_distances(self, str_list: list) -> list:
        """

        Args:
            str_list (list): list of strings

        Returns:
            list: distances[[]] between all pairs of strings in a list of strings
        """
        distances = []
        try:
            # First pointer, outer loop: traverse each word in the list once
            # The number of inner lists within distances = the number of strings in the first iteration
            for firstStrings in str_list:
                sub_distances = []
                # Second pointer, inner loop: traverse each word for each time it is traversed in the outer loop
                # The number of output booleans = the number of strings in the second iteration
                for secondStrings in str_list:
                    # If both strings are equivalent, add 1 to the inner list
                    if firstStrings == secondStrings:
                        sub_distances.append(1)
                    # If both strings are not equivalent, add 0 to the inner list
                    else:
                        sub_distances.append(0)
                distances.append(sub_distances)
            # This part is to normalise distance matrices with non-zero diagonals into zero diagonals
            for i in range(len(distances)):
                distances[i][i] = 0
        except TypeError:
            print("Invalid input for the Boolean distance function, please enter a list with control flows")
        except Exception as exception_type:
            print(
                'An error/exception occured while trying to calculate the Boolean distance of type {0}. Arguments:\n{1!r}'.format(
                    type(exception_type).__name__, exception_type.args
                )
            )

        return distances


def calculate_average_dist_matr(objects: list, attributes: list) -> list:
    """

    Args:
        objects (list): List with all the necessary object information of selected object type
        attributes (list): [description]

    Returns:
        list: The average distance matrix for the objects of selected object type
    """
    # List holds all distinct distance matrices
    distance_matrices = []

    # Iterate over every attribute and calculate the distance matrix with the right technique
    for key, value in objects[0]["attributes"][0].items():
        if key in attributes or not attributes:
            # If the attribute is type float or int, then calculate the Euclidean distance
            if isinstance(value, (float, int)):
                # Iterate over all objects and save the attribute value into list
                # Use this list to calculate the distance matrix
                values_euclidean = []
                for obj in objects:
                    val = [obj["attributes"][0][key]]
                    values_euclidean.append(val)
                print("{} is an attribute of type float".format(key))
                print("We calculate the distance matrix with the Euclidean distance")
                euclidean = EuclideanDistance(values_euclidean)
                #print("The distance matrix is: ")
                #print(euclidean.get_euclidean_distances(values_euclidean))
                try: 
                    distance_matrices.append(euclidean.get_euclidean_distances(values_euclidean).tolist())
                except: 
                    distance_matrices.append(euclidean.get_euclidean_distances(values_euclidean))
            elif isinstance(value, list):
                values_levenshtein = [obj["attributes"][0][key] for obj in objects]
                print("{} is an attribute of type control-flow".format(key))
                print("We calculate the distance matrix with the Levenshtein distance")
                levenshtein = LevenshteinDistance(values_levenshtein)
                #print("The distance matrix is: ")
                #print(levenshtein.get_levenshtein_distances(values_levenshtein))
                try:
                    distance_matrices.append(levenshtein.get_levenshtein_distances(values_levenshtein).tolist())
                except:
                    distance_matrices.append(levenshtein.get_levenshtein_distances(values_levenshtein))
            elif isinstance(value, str):
                values_boolean = [obj["attributes"][0][key] for obj in objects]
                print("{} is an attribute of type string".format(key))
                print("We calculate the distance matrix with the Boolean distance")
                boolean = BooleanDistance(values_boolean)
                #print("The distance matrix is: ")
                #print(boolean.get_boolean_distances(values_boolean))
                try:
                    distance_matrices.append(boolean.get_boolean_distances(values_boolean).tolist())
                except:
                    distance_matrices.append(boolean.get_boolean_distances(values_boolean))

    numpy_distance_matrix = np.array(distance_matrices)
    summed_distance_matrix = numpy_distance_matrix.sum(axis=0)
    #print("We divide the summed distance matrix by {} and get the new average distance matrix: ".format(len(distance_matrices)))
    #print(avg_distance_matrix)
    return summed_distance_matrix / len(distance_matrices)
