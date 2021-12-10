# Library imports 
from numpy import string_
from pm4pymdl.objects.ocel.importer import importer as ocel_importer
from pm4pymdl.algo.mvp.utils import succint_mdl_to_exploded_mdl
from pm4pymdl.visualization.mvp.gen_framework3 import visualizer as visualizer
import json
from pm4pymdl.algo.mvp.gen_framework3 import discovery
import pandas as pd
import json

# Local imports
from drawpage.readocel import *
from drawpage.distance_techniques import calculate_average_dist_matr
from drawpage.kmedoids import cluster_kmedoids
from drawpage.agglomerative import cluster_agglomerative

def draw(clustered_dataframes: list, object_type: str, min_act_freq: int, min_edge_freq: int):
    dfg_filepaths = []
    i = 0
    for clustered_df in clustered_dataframes:
        clustered_df.type = "succint"
        model = discovery.apply(clustered_df, parameters={"epsilon": 0, "noise_threshold": 0})
        gviz = visualizer.apply(model, parameters={"min_act_freq": min_act_freq, "min_edge_freq": min_edge_freq})
        if i == 0:
            path_to_image = "./media/tmp/Frequency-{}-Unclustered-minactivity-{}-minedge-{}.png".format(object_type, min_act_freq, min_edge_freq)
        else:
            path_to_image = "./media/tmp/Frequency-{}-Cluster-{}-minactivity-{}-minedge-{}.png".format(object_type, i, min_act_freq, min_edge_freq)
        visualizer.save(gviz, path_to_image)
        dfg_filepaths.append(path_to_image)
        i = i + 1
    return dfg_filepaths

# Returns list of all graphviz objects in order to draw the DFGs
# Input: Path_to_file is the path to the file of the ocel
#        object_information is the dict that returns the object types and the attributes
#        object_type is the object which will be clustered
#        cluster_type is the clustering technique
def main_draw(path_to_file: str, object_information: list, object_type: str, cluster_type: str, event_assignment: str, attributes: list, min_act_freq = 0, min_edge_freq = 0) -> list:
    # Import selected OCEL
    event_df, object_df = ocel_importer.apply(file_path=path_to_file)

    # Create a dict for all the object instances
    print("The objects list is being created")
    objects = get_objects(path_to_file, object_information, object_type)

    #obj_json = json.loads(objects)
    print(json.dumps(objects, indent=4, sort_keys=True))

    # Flatten the event dataframe
    flattened_event_df = succint_mdl_to_exploded_mdl.apply(event_df)

    # Calculate the average distance matrix
    print("We now create the average distance matrix: ")
    print("\n")
    avg_distance_matrix = calculate_average_dist_matr(objects, attributes)
    
    # Cluster based on the selected technique
    if cluster_type == "kmeans": 
        print("\n")
        print("We use K-Medoids for clustering")
        cluster_labels = cluster_kmedoids(avg_distance_matrix)
    elif cluster_type == "hierarchical":
        print("\n")
        print("We use Hierarchical for clustering")
        cluster_labels = cluster_agglomerative(avg_distance_matrix)
    else:
        print("The input of the clustering technique is not correct!")
        return
    unique_clusters = list(set(cluster_labels))
    counter = 0

    object_and_cluster = []
    # Assign every object the clustered label
    print("\n")
    print("The result of clustering is: ")
    for obj in objects: 
        obj["cluster"] = cluster_labels[counter]
        counter += 1
        print("{}: {}".format(obj["object_id"], obj["cluster"]))
        object_and_cluster.append({obj["object_id"]: obj["cluster"]})

    #dfg_filepaths = []
    # Iterate over every cluster and create the dataframe based on the event ids of each cluster
    clustered_dataframes = []
    clustered_dataframes.append(event_df)

    for label in unique_clusters:
        object_ids_in_cluster = []
        event_ids = []
        # Save all object ids that belong to the given cluster
        for obj in objects:
            if obj["cluster"] == label:
                object_ids_in_cluster.append(obj["object_id"])
        # Save all event ids that are in at least one of the objects of the given cluster
        # Assign all events, that are only in objects from given cluster
        if event_assignment == "All":
            # Save all event ids of objects in the cluster
            id_in_cluster = flattened_event_df.loc[flattened_event_df[object_type].isin(object_ids_in_cluster)]['event_id'].unique().tolist()
            # Save all event ids of objects that are not in cluster
            id_notin_cluster = flattened_event_df.loc[~flattened_event_df[object_type].isin(object_ids_in_cluster)]['event_id'].unique().tolist()
            # Remove all event ids that are in both lists
            for id_in in id_in_cluster:
                if id_in in id_notin_cluster:
                    id_in_cluster.remove(id_in) 
            # Append the ones that remain to the list that is used to filter the dataframe
            event_ids.append(id_in_cluster)
        # Assign event if the object from given cluster is inside that event
        elif event_assignment == "Existence":
            event_ids.append(flattened_event_df.loc[flattened_event_df[object_type].isin(object_ids_in_cluster)]['event_id'].unique().tolist())
        else:
            print("The given event assignment is neither all nor existence.")
            print("As default, we do existence")
            event_ids.append(flattened_event_df.loc[flattened_event_df[object_type].isin(object_ids_in_cluster)]['event_id'].unique().tolist())

        print("The Event IDs for Cluster {} are {}".format(label,event_ids[0]))

        # Create a new dataframe with all the event ids
        clustered_df = event_df.loc[event_df["event_id"].isin(event_ids[0])]

        # Save dataframe into list of all dataframes
        clustered_dataframes.append(clustered_df)

    dfg_filepaths = draw(clustered_dataframes, object_type, min_act_freq, min_edge_freq)

    # Return the list of all graphviz objects to views.py
    return dfg_filepaths, clustered_dataframes, object_and_cluster


#main_draw("./media/running-example.jsonocel", get_object_types("./media/running-example.jsonocel"), "customers", "kmeans", "All")
