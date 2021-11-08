# Return: distances[[]] between all pairs of strings in a list of strings
# Input: list = list of strings
def get_boolean_distances(list: list) -> list:
    distances = []
    # First pointer, outer loop: traverse each word in the list once
    # The number of inner lists within distances = the number of strings in the first iteration
    for firstStrings in list:
        sub_distances = []
        # Second pointer, inner loop: traverse each word for each time it is traversed in the outer loop
        # The number of output booleans = the number of strings in the second iteration
        for secondStrings in list:
            # If both strings are equivalent, add 1 to the inner list
            if firstStrings == secondStrings: 
                sub_distances.append(1)
            # If both strings are not equivalent, add 0 to the inner list
            else:
                sub_distances.append(0)
        distances.append(sub_distances)
    #print(distances)
    return distances

# Example list to test
#list = ["one", "two", "three", "six", "two", "five"]

# For testing
#get_boolean_distances(list)