# Library imports
import unittest
#from django.test import TestCase
import numpy as np

# Local imports
from .clustering_techniques import cluster_kmedoids, cluster_agglomerative
from .distance_techniques import LevenshteinDistance, BooleanDistance, EuclideanDistance

class MyTestCase(unittest.TestCase):



    def test_levenshtein(self):

        # List of control flows
        lev_activities = [['eat', 'sleep', 'rave', 'repeat'],
                          ['eat', 'sleep', 'rave', 'Not repeat'],
                          ['eat', 'sleep', 'Not rave', 'Not repeat'],
                          ['eat', 'Not sleep', 'Not rave', 'Not repeat'],
                          ['Not eat', 'Not sleep', 'Not rave', 'Not repeat']]

        test_lev = LevenshteinDistance(lev_activities).get_levenshtein_distances(lev_activities)

        correct_result = [[0, 1, 2, 3, 4], [1, 0, 1, 2, 3], [2, 1, 0, 1, 2], [3, 2, 1, 0, 1], [4, 3, 2, 1, 0]]

        self.assertEqual(test_lev, correct_result)  # add assertion here

    def test_boolean(self):
        # List of objects
        bool_activities = ['Not eat', 'Not sleep', 'Not rave', 'Not repeat', 'eat',
                           'Not sleep', 'Not rave', 'Not repeat', 'Not eat', 'Not sleep',
                           'Not rave', 'Not repeat', 'eat', 'Not sleep', 'Not rave',
                           'Not repeat']

        test_bool = BooleanDistance(bool_activities).get_boolean_distances(bool_activities)



        correct_result = [[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                          [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
                          [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
                          [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
                          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
                          [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
                          [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
                          [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
                          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                          [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                          [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                          [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                          [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                          [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
                          [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                          [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0]]

        self.assertEqual(test_bool, correct_result)  # add assertion here

    def test_euclidean(self):
        # List of objects
        euclidean_activities = [[0, 1, 2, 3, 4], [1, 0, 1, 2, 3], [2, 1, 0, 1, 2], [3, 2, 1, 0, 1], [4, 3, 2, 1, 0]]

        test_euclidean= EuclideanDistance(euclidean_activities).get_euclidean_distances(euclidean_activities)


        correct_result = [[0., 2.23606798, 4.,  5.38516481, 6.32455532],
                        [2.23606798, 0., 2.23606798, 4., 5.38516481],
                         [4.,2.23606798, 0., 2.23606798, 4.],
                        [5.38516481, 4., 2.23606798, 0., 2.23606798],
                        [6.32455532, 5.38516481, 4., 2.23606798, 0.]]

        np.testing.assert_almost_equal(test_euclidean, correct_result)  # add assertion here



if __name__ == '__main__':
    unittest.main()
