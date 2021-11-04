from kneed import KneeLocator
from sklearn.cluster import KMeans

# Return: kmeans object which contains all necessary information
# Input: data_points = data_points that are clustered
#        max_n_clusters = maximum number of clusters
#        init = type of how to initialise the centroids position
#        n_init = number of initializations. Important because k-means is nondeterministic
#        max_iter = number of iterations per initialization 
def cluster_kmeans(data_points: list, max_n_clusters: int, init:str, n_init: int, max_iter: int) -> object:
    # Create dict for initialization of KMeans objects
    kmeans_kwargs = {
        "init": init,
        "n_init": n_init,
        "max_iter": max_iter,
        "random_state": 42
    }
    # Safe sse of every loop
    sse = []
    # Loop through all possible numbers of clusters
    for k in range(1, max_n_clusters):
        kmeans = KMeans(n_clusters=k, **kmeans_kwargs)
        kmeans.fit(data_points)
        sse.append(kmeans.inertia_)
    # Locate optimum number of clusters
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
