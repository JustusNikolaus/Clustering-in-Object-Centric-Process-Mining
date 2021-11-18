# Function for validating the input file 

def ask_ocel(prompt='OCEL format file?'):
    name = input(prompt)
    if name[-4:] in {'.xmlocel', '.jsonocel'}: return name
    return ask_ocel(prompt='The name has to end in ".jsonocel" or ".xmlocel", please retry: ')
