# Return: distances[[]] between all pairs of strings in two lists of strings
# Input: list1 = first list of strings
#        list2 = second list of strings
def get_boolean_distances(list1: list, list2: list) -> list:
    distances = []
    # For each string within the first list, go through the strings in the second list
    # The number of inner lists within distances = the number of strings in the first list
    for firstStrings in list1:
        sub_distances = []
        # For each string within the second list, compare both the first string and the second string
        # The number of output booleans = the number of strings in the second list
        for secondStrings in list2:
            if firstStrings == secondStrings: 
                sub_distances.append(1)
            else:
                sub_distances.append(0)
        distances.append(sub_distances)
    print(distances)
    return distances 

# Example for list1 and list2 to test
#listOne = ["one", "two", "three", "six", "two", "five"]
#listTwo = ["one", "two", "four", "five", "two"]

# For testing
#get_boolean_distances(listOne, listTwo)