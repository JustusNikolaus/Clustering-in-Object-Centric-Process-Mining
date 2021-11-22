# Library imports
import numpy as np
from sklearn_extra.cluster import KMedoids
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

# Return: cluster labels after clustering with k-medoids
# Input:  Two dimensional array of integers that defines a distance matrix
def cluster_kmedoids(distance_matrix: list) -> list:
    print("K-Medoids is started with distance matrix: ")
    for i in range(len(distance_matrix)):
        print(distance_matrix[i])
    opt_n_clusters = len(distance_matrix)
    #Format distance matrix to np.array of type float to avoid error message from silhouette_score
    distance_matrix_as_array = np.asarray(distance_matrix, dtype=float)
    # Calculate optimal number of clusters
    max_silhouette_score = 0
    try:
        # Iterate over length of distance matrix
        for number_of_clusters in range(2, len(distance_matrix)):
            # Create new kmedoids object
            kmedoids = KMedoids(
                    n_clusters=number_of_clusters,
                    metric='precomputed',
                    method='pam',
                    init='k-medoids++')
            # Calculate cluster labels
            cluster_labels = kmedoids.fit_predict(distance_matrix)
            silhouette_score_for_n = silhouette_score(X=distance_matrix_as_array, labels=cluster_labels, metric="precomputed")
            # Check if the new silhouette score is higher than the maximum
            if silhouette_score_for_n > max_silhouette_score:
                max_silhouette_score = silhouette_score_for_n
                opt_n_clusters = number_of_clusters
            print("Silhouette average for {} is: {}".format(number_of_clusters, silhouette_score_for_n))
            print(cluster_labels)
        # Create kmedoids Object with optimal number of clusters
        print("The optimal number of clusters is: {}".format(opt_n_clusters))
        kmedoids = KMedoids(
            n_clusters=opt_n_clusters,
            metric='precomputed',
            method='pam',
            init='k-medoids++')
        kmedoids.fit(distance_matrix_as_array)
    except TypeError:
        print("Incorrect type for the kmedoids input; list needed")
    except: 
        print("There was an error in the kmedoids clustering")
    return kmedoids.labels_

# Test k_medoids
# con_activities = [['eat', 'sleep', 'rave', 'repeat'],
#                   ['eat', 'sleep', 'rave', 'Not repeat'],
#                   ['eat', 'sleep', 'Not rave', 'Not repeat'],
#                   ['eat', 'Not sleep', 'Not rave', 'Not repeat'],
#                   ['Not eat', 'Not sleep', 'Not rave', 'Not repeat']]

# test = LevenshteinDistance(con_activities).get_levenshtein_distances(con_activities)
# print(cluster_kmedoids(distance_matrix=test))

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
        print("ERROR! No elbow found. The maximum number of clusters is used.")
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