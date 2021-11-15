from Levenshtein import distance as levdistance
from sklearn.utils.multiclass import unique_labels as unique_strings
import string


# Return: labels mapped to unique activities
# Input: labels = list of labels
#        activities = list of activities
def map_labels_to_activities(labels: list, activities: list) -> list:
    map = {}
    if len(labels) != len(activities):
        print(0) # needs to return an error if they are not equal
    for given_label, labelled_activity in zip(labels, activities): # for each given label
        if (given_label not in map.keys()): # if the key is not already in the map
            map[given_label] = labelled_activity # create key and add the corresponding activity
        else:
            print(0) # needs to return an error if they are not unique
    #print(map)
    return map

# Map test
#la_activities = ['doing nothing', 'drinking', 'drinking and eating', 'drinking and sleeping', 'eating', 'showering', 'sleeping', 'sleeping and eating']
#la_labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

#map_labels_to_activities(la_labels, la_activities)

# Return: alphabet labels for each activity/object within a control flow
# Input: list = list of activities/objects within a control flow
def label_activities(list: list) -> list:
    #print(list)
    activity_labels = [] # array for the unique activity/object labels
    unique_activities = unique_strings(list) # sorting throught the input and using only unique strings
    labels_map = {} # dictionary to map out each activity by a 
    #print(unique_activities)
    labels = string.ascii_letters + string.digits + string.punctuation # alphabet, digit and, punctuation labels
    label_counter = 0 # counter for traversing through the labels
    for items in unique_activities: 
        activity_labels.append(labels[label_counter])
        label_counter += 1
    #print(activity_labels)
    labels_map = map_labels_to_activities(activity_labels, unique_activities) # to see which labels belong to which activities
    #print(labels_map)
    return activity_labels # return unique labels

# Labelling test
#tolabel_activities = ['eating', 'drinking', 'sleeping', 'drinking', 'drinking and sleeping', 'showering', 'eating']
#label_activities(tolabel_activities)

# Return: concatenated control flow using the labels from label_activities
# Input: list = list of control flows 
def concatenate_labels(list: list) -> list:
    new_list = [] # new list to list out all items within the control flows list
    labelled_control_flows = [] # list of the concatenated strings for the control flows
    list_map = {} # new dictionary to map out the labels to the activities
    for sublist in list: # going through the sublists to add them to the new list
        new_list += sublist
    #print(new_list)
    given_labels = label_activities(new_list) # giving unique labels to all items within the passed control flows list
    #print(given_labels) 
    list_map = map_labels_to_activities(given_labels, unique_strings(new_list)) # creating a dict of the labels and the unique list items
    #print(list_map)
    # creating the concatenation of characters for each sublist
    list_map_rev = {v: k for k, v in list_map.items()} # reverse the dictionary so that the characters are the values instead of keys
    for sublist in list: # going through the control flows within the original list
        control_flow = "" # string for the control flow labels
        for given_activity in sublist:
            if given_activity in list_map_rev.keys():
                control_flow += list_map_rev[given_activity] # adds the character label to the control flow label
            else:
                print(0) # should give an error if it is not a key
        labelled_control_flows.append(control_flow) # adds the labelled control flow to the list
        #print(control_flow)
        #print(labelled_control_flows)
    return labelled_control_flows # returns the labelled control flows

# Concatenation test
#con_activities = [['eating', 'drinking', 'sleeping', 'drinking', 'drinking and sleeping', 'showering', 'eating'], 
#             ['drinking', 'eating', 'drinking and eating', 'sleeping', 'doing nothing', 'eating', 'drinking and sleeping'],
#             ['sleeping', 'drinking', 'eating', 'eating', 'sleeping and eating', 'showering', 'drinking'],
#             ['eating', 'drinking', 'sleeping', 'drinking', 'drinking and sleeping', 'eating']]

#concatenate_labels(con_activities)

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
