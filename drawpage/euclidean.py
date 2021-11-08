from sklearn.neighbors import DistanceMetric


# Return: Euclidean distances between all pairs of vectors in two lists of strings
# Input: vectors = list of vectors
def get_euclidean_distances(vectors: list) -> list:
    #print(distance.pairwise(vectors))
    distance = DistanceMetric.get_metric('euclidean')
    return distance.pairwise(vectors)

# For testing
#X = [[0, 1, 2],
#         [3, 4, 5]]

#get_euclidean_distances(X)
