# Library imports
from pm4pymdl.objects.ocel.importer import importer as ocel_importer
from pm4pymdl.algo.mvp.utils import succint_mdl_to_exploded_mdl
import pm4py
import pkgutil

def get_object_attributes(object_information: list, object: str) -> list:
    for obj in object_information:
        if obj["object_type"] == object:
            return obj["attributes"]
    return []

def get_object_types(path_to_file: str) -> list:
    """

    Args:
        path_to_file (str): Path to selected OCEL file

    Returns:
        list: dictionary containing the objects of OCEL and its not null attributes
    """
    object_information = []
    try:
        _, object_df = ocel_importer.apply(path_to_file)
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

def get_ocel_summary(path_to_file: str) -> dict:
    """

    Args:
        path_to_file (str): Path to selected OCEL file

    Returns:
        list: dictionary containing a basic summary of the ocel
    """
    ocel = pm4py.read_ocel(path_to_file)
    dict = {
        "Number of events": len(ocel.events),
        "Number of objects": len(ocel.objects),
        "Number of activities": ocel.events[ocel.event_activity].nunique(),
        "Number of object_types": ocel.objects[ocel.object_type_column].nunique(),
        "Number of activities_occurences": str(ocel.events[ocel.event_activity].value_counts().to_dict()),
        "Number of object_occurences": str(ocel.objects[ocel.object_type_column].value_counts().to_dict())
    }
    return dict

def validate_ocel_jsonocel(input_path: str, parameters=None):
    """

    Args:
        input_path (str): Path to selected OCEL file
        validation_path (str): Path to the json schema used for validation

    Returns:
        bool: if the input is valid
    """
    if not pkgutil.find_loader("jsonschema"):
        raise Exception("please install jsonschema in order to validate a JSONOCEL file.")

    import json
    import jsonschema
    from jsonschema import validate

    if parameters is None:
        parameters = {}

    schema_content = json.load(open("./media/validation/schema.json", "rb"))
    try:
        file_content = json.load(open(input_path, "rb"))
        validate(instance=file_content, schema=schema_content)
        return True
    except jsonschema.exceptions.ValidationError as err:
        print(err)
        return False
    except json.decoder.JSONDecodeError as err:
        print(err)
        return False

def get_objects(path_to_file: str, object_information: list, object_type: str):
    """

    Args:
        path_to_file (str): the filepath for the OCEL
        object_information (list): the dict that contains every unique object type and its attributes
        object_type (str): the selected object type that is clustered

    Returns:
        dict: A dictionary that contains all the information about the objects of a given type
    """

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
