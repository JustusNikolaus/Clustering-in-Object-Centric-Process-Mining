from Levenshtein import distance as levdistance
from sklearn.utils.multiclass import unique_labels
import string

# Return: alphabet labels for each activity/object within a control flow
# Input: list = list of activities/objects within a control flow
def label_activities(list: list) -> list:
    #print(list)
    activity_labels = [] # array for the unique activity/object labels
    unique_activities = unique_labels(list) # sorting throught the input and using only unique strings
    #print(unique_activities)
    labels = string.ascii_letters + string.digits + string.punctuation # alphabet, digit and, punctuation labels
    label_counter = 0 # counter for traversing through the labels
    for items in unique_activities: 
        activity_labels.append(labels[label_counter])
        label_counter += 1
    print(activity_labels)
    labels_map = zip(unique_activities, activity_labels) # to see which labels belong to which activities
    print(set(labels_map))

# Labelling test
#activities = ['eating', 'drinking', 'sleeping', 'drinking', 'drinking and sleeping', 'showering', 'eating']
#label_activities(activities)

# Return: concatenated control flow using the labels from label_activities
# Input: list = list of control flows 
#def concatenate_labels(list: list) -> list:

# Return: distances[[]] between all pairs of control flows (represented by strings) in a list of control flows
# Input: list = list of control flows
def get_levenshtein_distances(list: list) -> list:
    distances = []
    # First pointer, outer loop: traverse each word in the list once
    # The number of inner lists within distances = the number of strings in the first iteration
    for firstStrings in list:
        sub_distances = []
        # Second pointer, inner loop: traverse each word for each time it is traversed in the outer loop
        # The number of output integers = the number of strings in the second iteration
        for secondStrings in list:
            sub_distances.append(levdistance(firstStrings, secondStrings))
        distances.append(sub_distances)
    #print(distances)
    return distances

# Example list to test
#list = ['AAAABBBCBDB', 'AAABCBAD', 'AAAABBBCBDB', 'AAAABBBCBEG', 'AAAABBBCBDB', 'AAAABCBAD']

# For testing
#get_levenshtein_distances(list)