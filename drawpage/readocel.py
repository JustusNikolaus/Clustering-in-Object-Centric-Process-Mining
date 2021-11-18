from pm4pymdl.objects.ocel.importer import importer as ocel_importer

# Return: dictionary containing the objects of OCEL and its not null attributes
# Input: path_to_file = Path to selected OCEL file
def get_object_information(path_to_file: str) -> dict:
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
                if column_name != "object_id" and column_name != "object_type":
                    if len(rows_of_obj.loc[rows_of_obj[column_name].notnull()]) > 0:
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