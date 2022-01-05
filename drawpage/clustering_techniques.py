# Library imports
from sklearn.cluster import AgglomerativeClustering
from sklearn.metrics import silhouette_score
from sklearn_extra.cluster import KMedoids
import numpy as np

# Local imports
from drawpage.distance_techniques import *

# Return: this function returns the cluster labels after hierarchical clustering
# Input: input a distance matrix
def cluster_agglomerative(distance_matrix: list) -> list:
    clustering = AgglomerativeClustering(affinity='precomputed', linkage='single').fit(distance_matrix)
    return clustering.labels_

# Return: cluster labels after clustering with k-medoids
# Input:  Two dimensional array of integers that defines a distance matrix
def cluster_kmedoids(distance_matrix: list) -> list:
    print("K-Medoids is started with distance matrix: ")
    #for item in distance_matrix:
    #    print(item)
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
            #print("Silhouette average for {} is: {}".format(number_of_clusters, silhouette_score_for_n))
            #print(cluster_labels)
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
    