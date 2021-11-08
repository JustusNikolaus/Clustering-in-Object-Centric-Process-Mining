# Importing required libraries

from sklearn.cluster import AgglomerativeClustering
import numpy as np

#input must be distance matrix
def cluster_agglomerative(matrix):

    clustering = AgglomerativeClustering(affinity='precomputed', linkage='single').fit(matrix)

    clustering.labels_
    #print(clustering.labels_)
    return clustering.labels_
#output is an array to tell in which cluster each object is


#test:
#matrix = [[0, 2, 2, 3, 3.6, 3.6],
#[2, 1, 4, 3.6, 3, 5],
#[2, 4, 0, 3.6, 5, 3],
#[3, 3.6, 3.6, 0, 2, 2],
#[3.6, 3, 5, 2, 0, 4],
#[3.6, 5, 3, 2, 4, 0]]

#cluster_agglomerative(matrix)
