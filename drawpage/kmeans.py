import matplotlib.pyplot as plt
from kneed import KneeLocator
from scipy.sparse.construct import random
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler

# Return: distance between two lists of strings based on jaccard similarity
# Input: list1 = list of strings
#        list2 = list of strings
def get_jaccard_similarity(list1: list, list2: list) -> float:
    return 1 - float(len(set(list1).intersection(list2))) / float(len(set(list1).union(list2)))

# Return: distance[[]] where distance[i][j] returns the distance between list i and list j
def jaccard_similarity(events: list) -> list:
    distances = []
    for event1 in events:
        sub_distances = []
        for event2 in events:
            sub_distances.append(get_jaccard_similarity(event1, event2))
        distances.append(sub_distances)
    for i in range(0,len(events)):
        print(distances[i])
    return distances

# Return: kmeans object which contains all necessary information
# Input: data_points = data_points that are clustered
#        max_n_clusters = maximum number of clusters
#        init = type of how to initialise the centroids position
#        n_init = number of initializations. Important because k-means is nondeterministic
#        max_iter = number of iterations per initialization 
def cluster_kmeans(event_list: list, max_n_clusters: int, init:str, n_init: int, max_iter: int) -> object:
    # Calculate distance between control flows 
    data_points = jaccard_similarity(event_list)
    # Create dict for initialization of KMeans objects
    kmeans_kwargs = {
        "init": init,
        "n_init": n_init,
        "max_iter": max_iter,
        "random_state": 42
    }
    
    # Try to calculate the optimal number of clusters
    try:
        # Safe sse of every loop
        sse = []
        # Loop through all possible numbers of clusters
        for k in range(1, max_n_clusters):
            kmeans = KMeans(n_clusters=k, **kmeans_kwargs)
            kmeans.fit(data_points)
            sse.append(kmeans.inertia_)
        kl = KneeLocator(
            range(1, max_n_clusters), sse, curve="convex", direction="decreasing"
        )
        opt_n_clusters = kl.elbow
        # Create kmeans Object
        kmeans = KMeans(
            init=init,
            n_clusters = opt_n_clusters,
            n_init=n_init,
            max_iter=max_iter,
            random_state=42
        )
        # Calculate label of every data point
        kmeans.fit(data_points)
        return kmeans
    except:
        print("ERROR! No Elbow found. The maximum number of clusters is used")
        kmeans = KMeans(
            init=init,
            n_clusters = max_n_clusters,
            n_init=n_init,
            max_iter=max_iter,
            random_state=42
        )
        # Calculate label of every data point
        kmeans.fit(data_points)
        return kmeans