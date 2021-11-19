from pm4pymdl.objects.ocel.importer import importer as ocel_importer
from pm4pymdl.algo.mvp.utils import succint_mdl_to_exploded_mdl 
from readocel import *
import numpy as np
import json


def get_object_attributes(object_information: list, object: str) -> list:
    for obj in object_information:
        if obj["object_type"] == object:
            return obj["attributes"]
    return []

# Returns all drawn DFG`s
# Input: Path_to_file is the path to the file of the ocel
#        object_information is the dict that returns the object types and the attributes
#        object_type is the object which will be clustered
def main_draw(path_to_file: str, object_information: list, object_type: str):

    # Create a dict for all the object instances
    object = []

    event_df, object_df = ocel_importer.apply(file_path=path_to_file)

    # Flatten the event dataframe
    flattened_event_df =succint_mdl_to_exploded_mdl.apply(event_df)
    
    # Select all attributes of object
    object_attributes = get_object_attributes(object_information, object_type)

    # Get all unique objects
    #unique_object_values = event_df[object_type].unique()

    object_ids = object_df.loc[object_df['object_type'] == object_type].object_id.tolist()

    # Creates a dict with all necessary information about the object 
    for id in object_ids:
        attribute_values = []
        for attribute in object_attributes:
            if attribute == "control flow":
                attribute_value = np.asarray(flattened_event_df.loc[flattened_event_df[object_type] == id].event_activity.unique())
            else :
                attribute_value = object_df.loc[object_df['object_id'] == id][attribute]
            attribute_values.append(attribute_value)
        dict = {
            "object_type": object_type,
            "object_id": id,
            "cluster": 0,
            "attributes": object_attributes,
            "attribute_values": attribute_values
        }
        object.append(dict)


    print(json.dumps(object, indent=4))




main_draw("./media/running-example.jsonocel", get_object_types("./media/running-example.jsonocel"), "orders")