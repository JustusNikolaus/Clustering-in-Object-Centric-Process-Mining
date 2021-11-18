#from math import dist
#from scipy.spatial import distance
#from sklearn import cluster
from sklearn_extra.cluster import KMedoids
#from sklearn.datasets import make_blobs
from sklearn.metrics import silhouette_score
#from sklearn.metrics import silhouette_samples
from distance_techniques import LevenshteinDistance
#from distance_techniques import EuclideanDistance
#import matplotlib.pyplot as plt
#import matplotlib.cm as cm
import numpy as np

def test():
    con_activities = [['eat', 'sleep', 'rave', 'repeat']]


    X = LevenshteinDistance(con_activities).get_levenshtein_distances(con_activities)
    max_sils = 0
    opt_n_clusters = 0
    distance_matrix=np.asarray(X,dtype=float)
    number = 1
    for number in range(2, len(distance_matrix)):
        kmedoids = KMedoids(
                n_clusters=number,
                metric='precomputed',
                method='pam',
                init='k-medoids++')
        kmedoids.fit_predict(distance_matrix)
        cluster_labels = kmedoids.labels_
        print(cluster_labels)
        silhouette_avg = silhouette_score(X=distance_matrix, labels=cluster_labels, metric="precomputed")
        if silhouette_avg > max_sils:
            max_sils = silhouette_avg
            opt_n_clusters = number
        print("Silhouette Average for {} is: {}".format(number, silhouette_avg))
        number += 1
        # The silhouette_score gives the average value for all the samples.
        # This gives a perspective into the density and separation of the formed
        # clusters

        # print(
        #     "For n_clusters =",
        #     n_clusters,
        #     "The average silhouette_score is :",
        #     silhouette_avg,
        # )

    return opt_n_clusters

test()