# Importing required libraries

from sklearn.cluster import AgglomerativeClustering
#import numpy as np

# Return: this function returns the cluster labels after hierarchical clustering
# Input: input a distance matrix
def cluster_agglomerative(distance_matrix: list) -> list:
    clustering = AgglomerativeClustering(affinity='precomputed', linkage='single').fit(distance_matrix)
    return clustering.labels_

#test:
#matrix = [[0, 2, 2, 3, 3.6, 3.6],
#[2, 1, 4, 3.6, 3, 5],
#[2, 4, 0, 3.6, 5, 3],
#[3, 3.6, 3.6, 0, 2, 2],
#[3.6, 3, 5, 2, 0, 4],
#[3.6, 5, 3, 2, 4, 0]]

#cluster_agglomerative(matrix)
