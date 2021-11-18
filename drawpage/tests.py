#from django.test import TestCase
from kmedoids import cluster_kmedoids
from distance_techniques import LevenshteinDistance, BooleanDistance, EuclideanDistance
import numpy as np

# Create your tests here.

# Test k_medoids
lev_activities = [['eat', 'sleep', 'rave', 'repeat'],
                   ['eat', 'sleep', 'rave', 'Not repeat'],
                   ['eat', 'sleep', 'Not rave', 'Not repeat'],
                   ['eat', 'Not sleep', 'Not rave', 'Not repeat'],
                   ['Not eat', 'Not sleep', 'Not rave', 'Not repeat']]

bool_activities = ['Not eat', 'Not sleep', 'Not rave', 'Not repeat', 'eat', 
                    'Not sleep', 'Not rave', 'Not repeat', 'Not eat', 'Not sleep', 
                    'Not rave', 'Not repeat', 'eat', 'Not sleep', 'Not rave', 
                    'Not repeat']

euc_activities = np.random.randint(20, size=(3,35))

test_lev = LevenshteinDistance(lev_activities).get_levenshtein_distances(lev_activities)
test_bool = BooleanDistance(bool_activities).get_boolean_distances(bool_activities)
test_euc = EuclideanDistance(euc_activities).get_euclidean_distances(euc_activities)
#print(test_lev, "\n")
print(cluster_kmedoids(distance_matrix=test_lev), "\n-----------")
#print(test_bool, "\n")
print(cluster_kmedoids(distance_matrix=test_bool), "\n-----------")
#print(test_euc, "\n")
print(cluster_kmedoids(distance_matrix=test_euc), "\n-----------")