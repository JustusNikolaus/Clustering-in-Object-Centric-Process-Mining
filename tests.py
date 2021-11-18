from drawpage.distance_techniques import *
from drawpage.agglomerative import *
from drawpage.kmedoids import *

def prettyprint(matrix):
    s = [[str(e) for e in row] for row in matrix]
    lens = [max(map(len, col)) for col in zip(*s)]
    fmt = '\t'.join('{{:{}}}'.format(x) for x in lens)
    table = [fmt.format(*row) for row in s]
    print('\n'.join(table))


control_flow = [['eat', 'sleep', 'rave', 'repeat'],
                  ['eat', 'sleep', 'rave', 'Not repeat'],
                  ['eat', 'sleep', 'Not rave', 'Not repeat'],
                  ['eat', 'Not sleep', 'Not rave', 'Not repeat'],
                  ['Not eat', 'Not sleep', 'Not rave', 'Not repeat']]
print("The control flow matrix is as follows: ")
prettyprint(control_flow)
print("\n")
print("Now we calculate the distance matrix with the levenshtein distance: ")
control_flow_distance = LevenshteinDistance(control_flow).get_levenshtein_distances(control_flow)
prettyprint(control_flow_distance)
print("\n")
print("Now we cluster the distance matrix with k-medoids: ")
print(cluster_kmedoids(distance_matrix=control_flow_distance))
print("\n")
print("Now we cluster the distance matrix with hierarchical clustering: ")
print(cluster_agglomerative(control_flow_distance))


