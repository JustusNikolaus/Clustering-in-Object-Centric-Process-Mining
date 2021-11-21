# Library imports
#from django.test import TestCase
import numpy as np

# Local imports
from drawpage.kmedoids import cluster_kmedoids
from drawpage.agglomerative import cluster_agglomerative
from drawpage.distance_techniques import LevenshteinDistance, BooleanDistance, EuclideanDistance


# Create your tests here.

# List of control flows
lev_activities = [['eat', 'sleep', 'rave', 'repeat'],
                   ['eat', 'sleep', 'rave', 'Not repeat'],
                   ['eat', 'sleep', 'Not rave', 'Not repeat'],
                   ['eat', 'Not sleep', 'Not rave', 'Not repeat'],
                   ['Not eat', 'Not sleep', 'Not rave', 'Not repeat']]

# List of objects
bool_activities = ['Not eat', 'Not sleep', 'Not rave', 'Not repeat', 'eat', 
                    'Not sleep', 'Not rave', 'Not repeat', 'Not eat', 'Not sleep', 
                    'Not rave', 'Not repeat', 'eat', 'Not sleep', 'Not rave', 
                    'Not repeat']

# List of datapoints
matrix_size_x = np.random.randint(low = 2, high = 20)
matrix_size_y = np.random.randint(low = 2, high = 500)
euc_activities = np.random.randint(20, size=(matrix_size_x, matrix_size_y))



test_lev = LevenshteinDistance(lev_activities).get_levenshtein_distances(lev_activities)
print("Calculated Levenshtein distances:\n", test_lev, "\n-----------")
test_bool = BooleanDistance(bool_activities).get_boolean_distances(bool_activities)
print("Calculated Boolean distances:\n", test_bool, "\n-----------")
test_euc = EuclideanDistance(euc_activities).get_euclidean_distances(euc_activities)
print("Calculated Euclidean distances (matrix size {} by {}):\n".format(matrix_size_x, matrix_size_y), test_euc, "\n-----------")

# Test k_medoids

print("Calculated clusters for k-medoids clustering with Levenshtein distances:\n", cluster_kmedoids(distance_matrix=test_lev), "\n-----------")
print("Calculated clusters for k-medoids clustering with Boolean distances:\n", cluster_kmedoids(distance_matrix=test_bool), "\n-----------")
print("Calculated clusters for k-medoids clustering with Euclidean distances:\n", cluster_kmedoids(distance_matrix=test_euc), "\n-----------")

# Test agglomerative

print("Calculated clusters for hierarchical clustering with Levenshtein distances:\n", cluster_agglomerative(distance_matrix=test_lev), "\n-----------")
print("Calculated clusters for hierarchical clustering with Boolean distances:\n", cluster_agglomerative(distance_matrix=test_bool), "\n-----------")
print("Calculated clusters for hierarchical clustering with Euclidean distances:\n", cluster_agglomerative(distance_matrix=test_euc), "\n-----------")