# Library imports
from pm4pymdl.objects.ocel.importer import importer as ocel_importer
from pm4pymdl.algo.mvp.utils import succint_mdl_to_exploded_mdl 

def get_object_attributes(object_information: list, object: str) -> list:
    for obj in object_information:
        if obj["object_type"] == object:
            return obj["attributes"]
    return []


# Return: dictionary containing the objects of OCEL and its not null attributes
# Input: path_to_file = Path to selected OCEL file
def get_object_types(path_to_file: str) -> list:
    object_information = []
    try:
        event_df, object_df = ocel_importer.apply(path_to_file)
        # Stores unique values of column 'object_type' into array object_types
        object_types = object_df.object_type.unique()
        # Loop over every object_type
        for obj in object_types:
            # Give default control flow attribute
            attributes = ["control flow"]
            rows_of_obj = object_df.loc[object_df['object_type']==obj]
            # Get all columns that are not null for select object_type
            for (column_name, series) in object_df.iteritems():
                if (
                    column_name not in ["object_id", "object_type"]
                    and len(
                        rows_of_obj.loc[rows_of_obj[column_name].notnull()]
                    )
                    > 0
                ):
                    attributes.append(column_name)
            # Create a dict that stores the information for given object_type
            ocel_dict = {
                "object_type": obj,
                "attributes": attributes
            }
            object_information.append(ocel_dict)
    except:
        print("File import failed.")
    return object_information

# Return: A dictionary that contains all the information about the objects of a given type
# Input:  path_to_file is the filepath for the OCEL
#         object_information is the dict that contains every unique object type and its attributes
#         object_type is the selected object type that is clustered
def get_objects(path_to_file: str, object_information: list, object_type: str) -> dict:

    # Create a dict for all the object instances
    objects = []

    event_df, object_df = ocel_importer.apply(file_path=path_to_file)

    # Select all attributes of object
    object_attributes = get_object_attributes(object_information, object_type)

    # Flatten the event dataframe
    flattened_event_df =succint_mdl_to_exploded_mdl.apply(event_df)

    # Save all object ids into list
    object_ids = object_df.loc[object_df['object_type'] == object_type].object_id.tolist()

    # Creates a dict with all necessary information about the object
    for id in object_ids:
        dict = {
            "object_type": object_type,
            "object_id": id,
            "cluster": 0,
        }
        attributes_list = []
        attributes = {}

        # Store key: attribute name, value: attribute value into one dictionary
        # Loop over all attributes
        for attribute_name in object_attributes:
            # Save value for attribute of object_id
            if attribute_name == "control flow":
                attribute_value = flattened_event_df.loc[flattened_event_df[object_type] == id].event_activity.unique().tolist()
            else :
                attribute_value = object_df.loc[object_df['object_id'] == id][attribute_name].item()
            # Store the value and key into the dictionary
            attributes[attribute_name] = attribute_value
        # Store the full dictionary into a list
        attributes_list.append(attributes)
        # Store the list into the overall dict
        dict["attributes"] = attributes_list
        # Append the overall dict into the list of overall dicts
        objects.append(dict)

    # Return the dictionary
    return objects
