from jsonschema.validators import validate
from readocel import validate_ocel, get_ocel_summary

test = validate_ocel("./media/validation/test.jsonocel")
print(test)

print(validate_ocel("./media/running-example.jsonocel"))

print(get_ocel_summary("./media/running-example.jsonocel"))