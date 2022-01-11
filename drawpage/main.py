# Library imports 
from pm4pymdl.objects.ocel.importer import importer as ocel_importer
from pm4pymdl.algo.mvp.utils import succint_mdl_to_exploded_mdl
from pm4pymdl.algo.mvp.gen_framework3 import discovery
from pm4pymdl.visualization.mvp.gen_framework3 import visualizer
import pickle

# Local imports
from drawpage.readocel import *
from drawpage.distance_techniques import calculate_average_dist_matr
from drawpage.clustering_techniques import cluster_kmedoids, cluster_agglomerative
from .models import Log

def draw(object_type: str, min_act_freq: int, min_edge_freq: int): 
    """
    Creates .png files visualizing the DFGs. Also saves these files in /media/tmp/ and associates them with the Log model

    Args:
        object_type (str): the object type for which to cluster
        min_act_freq (int): Minimum frequency of activity to display. Defaults to 0.
        min_edge_freq (int): Minimum frequency of edges to display. Defaults to 0.

    Returns:
        dfg_filepaths (list): A list containing the filepaths to all created .png files
    """
    dfg_filepath_list = []
    models = list(Log.objects.values_list('log_model', flat=True))
    for i, model in enumerate(models):
        model = pickle.loads(model)
        gviz = visualizer.apply(model, parameters={"min_act_freq": min_act_freq, "min_edge_freq": min_edge_freq})
        if i == 0:
            path_to_image = "./media/tmp/Frequency-{}-Unclustered-minactivity-{}-minedge-{}.png".format(object_type, min_act_freq, min_edge_freq)
        else:
            path_to_image = "./media/tmp/Frequency-{}-Cluster-{}-minactivity-{}-minedge-{}.png".format(object_type, i, min_act_freq, min_edge_freq)
        visualizer.save(gviz, path_to_image)
        dfg_filepath_list.append(path_to_image)
        Log.objects.filter(log_name="tmp_" + str(i) + ".pkl").update(log_image=path_to_image[7:])

    # Remove leading '.' from file paths
    dfg_filepath_list = [sub[1 : ] for sub in dfg_filepath_list]
    return dfg_filepath_list

def main_draw(path_to_file: str, object_information: list, object_type: str, cluster_type: str, event_assignment: str, attributes: list, min_act_freq = 0, min_edge_freq = 0) -> list:
    """

    Args:
        path_to_file (str): path to the file of the ocel
        object_information (list): dict containing the object types and the attributes
        object_type (str): the object type for which to cluster
        cluster_type (str): clustering technique. Can either be 'kmeans' or 'hierarchical'
        event_assignment (str): the event assignment method. Can either be 'all' or 'existence'
        attributes (list): the attributes for which to cluster
        min_act_freq (int, optional): Minimum frequency of activity to display. Defaults to 0.
        min_edge_freq (int, optional): Minimum frequency of edges to display. Defaults to 0.

    Returns:
        dfg_filepath_list (list):
        clustered_dataframes_list (list):  
        object_and_cluster (list):
    """
    # Import selected OCEL
    event_df, object_df = ocel_importer.apply(file_path=path_to_file)

    # Create a dict for all the object instances
    print("The objects list is being created")
    objects = get_objects(path_to_file, object_information, object_type)

    # Flatten the event dataframe
    flattened_event_df = succint_mdl_to_exploded_mdl.apply(event_df)

    # Calculate the average distance matrix
    print("Creating the average distance matrix ...")
    avg_distance_matrix = calculate_average_dist_matr(objects, attributes)

    # Cluster based on the selected technique
    if cluster_type == "hierarchical":
        print("Hierarchical clustering ...")
        cluster_labels = cluster_agglomerative(avg_distance_matrix)
    elif cluster_type == "kmeans":
        print("K-Medoids clustering ...")
        cluster_labels = cluster_kmedoids(avg_distance_matrix)
    else:
        print("The input of the clustering technique is not correct!")
        return
    unique_clusters = list(set(cluster_labels))
    object_and_cluster = []
    # Assign every object the clustered label
    #print("The result of clustering is: ")
    for counter, obj in enumerate(objects): 
        obj["cluster"] = cluster_labels[counter]
        #print("{}: {}".format(obj["object_id"], obj["cluster"]))
        object_and_cluster.append({obj["object_id"]: obj["cluster"]})

    # Iterate over every cluster and create the dataframe based on the event ids of each cluster
    clustered_dataframes_list = [event_df]
    for label in unique_clusters:
        event_ids = []
        object_ids_in_cluster = [
            obj["object_id"] for obj in objects if obj["cluster"] == label
        ]

        # Save all event ids that are in at least one of the objects of the given cluster
        # Assign all events, that are only in objects from given cluster
        if event_assignment == "all":
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
        else:
            #print("The given event assignment is neither all nor existence.")
            #print("As default, we do existence")
            event_ids.append(flattened_event_df.loc[flattened_event_df[object_type].isin(object_ids_in_cluster)]['event_id'].unique().tolist())

        #print("The Event IDs for Cluster {} are {}".format(label,event_ids[0]))

        # Create a new dataframe with all the event ids
        clustered_df = event_df.loc[event_df["event_id"].isin(event_ids[0])]

        # Save dataframe into list of all dataframes
        clustered_dataframes_list.append(clustered_df)

    # Pickle clustered_dataframes_list
    for i, df in enumerate(clustered_dataframes_list):
        df.type = "succint"
        model = discovery.apply(df, parameters={"epsilon": 0, "noise_threshold": 0})
        Log.objects.create(log=pickle.dumps(df), log_model=pickle.dumps(model), log_name='tmp_' + str(i) + '.pkl')

    dfg_filepath_list = draw(object_type, min_act_freq, min_edge_freq)

    # Return the list of all graphviz objects to views.py
    return dfg_filepath_list, clustered_dataframes_list, object_and_cluster


#main_draw("./media/running-example.jsonocel", get_object_types("./media/running-example.jsonocel"), "customers", "kmeans", "All")
