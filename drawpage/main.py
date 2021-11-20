from pandas.io.formats.format import FloatArrayFormatter
from pm4pymdl.objects.ocel.importer import importer as ocel_importer
from pm4pymdl.algo.mvp.utils import succint_mdl_to_exploded_mdl
from scipy.spatial import distance 
from readocel import *
import numpy as np
from distance_techniques import calculate_average_dist_matr
from kmedoids import cluster_kmedoids
from agglomerative import cluster_agglomerative
from pm4pymdl.algo.mvp.gen_framework3 import discovery
from pm4pymdl.visualization.mvp.gen_framework3 import visualizer as visualizer

# Returns all drawn DFG`s
# Input: Path_to_file is the path to the file of the ocel
#        object_information is the dict that returns the object types and the attributes
#        object_type is the object which will be clustered
def main_draw(path_to_file: str, object_information: list, object_type: str, cluster_type: str):

    # Create a dict for all the object instances
    objects = get_objects(path_to_file, object_information, object_type)

    # Import selected OCEL
    event_df, object_df = ocel_importer.apply(file_path=path_to_file)

    # Flatten the event dataframe
    flattened_event_df =succint_mdl_to_exploded_mdl.apply(event_df)

    # Calculate the average distance matrix
    avg_distance_matrix = calculate_average_dist_matr(objects)
    
    # Cluster based on the selected technique
    if cluster_type == "K-Means": 
        cluster_labels = cluster_kmedoids(avg_distance_matrix)
    elif cluster_type == "Hierarchical":
        cluster_labels = cluster_agglomerative(avg_distance_matrix)
    unique_clusters = list(set(cluster_labels))
    counter = 0
    # Assign every object the clustered label
    for obj in objects: 
        obj["cluster"] = cluster_labels[counter]
        counter += 1
        print("{}: {}".format(obj["object_id"], obj["cluster"]))
    
    # Iterate over every cluster and create the dataframe based on the event ids of each cluster
    clustered_dataframes = []
    for label in unique_clusters:
        object_ids_in_cluster = []
        event_ids = []
        for obj in objects:
            if obj["cluster"] == label:
                object_ids_in_cluster.append(obj["object_id"])
        event_ids.append(flattened_event_df.loc[flattened_event_df[object_type].isin(object_ids_in_cluster)]['event_id'].unique())
        print("Die event ids von Cluster {} sind {}".format(label,event_ids[0]))
        clustered_df = event_df.loc[event_df["event_id"].isin(event_ids[0])]
        clustered_dataframes.append(clustered_df)
        

    print(clustered_dataframes)
    
# model = discovery.apply(event_df, parameters={"epsilon": 0, "noise_threshold": 0})
# gviz = visualizer.apply(model, parameters={"min_act_freq": 1, "min_edge_freq": 1})
# visualizer.save(gviz, "model.png")




    
main_draw("./media/running-example.jsonocel", get_object_types("./media/running-example.jsonocel"), "customers", "Hierarchical")
