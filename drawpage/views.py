# Library imports
from django.shortcuts import render
from django.conf import settings
import json
import os

# Local imports
from drawpage import main, readocel


def drawpage_view(request):
    # Initialize returns
    file_list = []
    object_type_list = []
    clustering_method = ['', '']
    event_assignment = ['', '']
    dfg_file_path_list = []

    # If a form got posted
    if request.method == 'POST':
        # If file_select_form
        if 'file_select' in request.POST:
            selected_file = request.POST['file_select']

            # Clear old object_type_cookie
            if 'object_type_cookie' in request.session:
                del request.session['object_type_cookie']

            # Save file_cookie
            request.session['file_cookie'] = selected_file
        # If object_type_select_form
        elif 'object_type_select' in request.POST:
            selected_object_type = request.POST['object_type_select']

            # Save object_type_cookie
            request.session['object_type_cookie'] = selected_object_type
        # If clustering_method_select and event_assignment_select
        elif 'clustering_method_select' in request.POST and 'event_assignment_select' in request.POST:
            selected_clustering_method = request.POST['clustering_method_select']
            selected_event_assignment = request.POST['event_assignment_select']

            if selected_clustering_method == "kmeans":
                clustering_method = ['checked', '']
            elif selected_clustering_method == "hierarchical":
                clustering_method = ['', 'checked']

            if selected_event_assignment == "all":
                event_assignment = ['checked', '']
            elif selected_event_assignment == "existence":
                event_assignment = ['', 'checked']

            # Save clustering_method_cookie
            request.session['clustering_method_cookie'] = selected_clustering_method
            # Save event_assignment_cookie
            request.session['event_assignment_cookie'] = selected_event_assignment

            if 'file_cookie' in request.session:                 
                # Call main_draw
                if 'object_type_cookie' in request.session:
                    path_to_file = 'media/' + request.session['file_cookie']
                    print("Path to file is: {}".format(path_to_file))
                    object_information = readocel.get_object_types(path_to_file)
                    print("Object information is: {}".format(object_information))
                    dfg_file_path_list, clustered_dataframes, object_and_cluster = main.main_draw(path_to_file, object_information, request.session['object_type_cookie'], selected_clustering_method, selected_event_assignment)
                    print("The clustered dataframes are: \n")
                    print(clustered_dataframes)
                    print("The results of the clustering are: \n")
                    print(object_and_cluster)
                    # Remove leading '.' from file paths
                    dfg_file_path_list = [sub[1 : ] for sub in dfg_file_path_list]

    # Refresh file_list
    ext = ('.csv','.jsonocel')
    for files in os.listdir('media/'):
        if files.endswith(ext):
            file_list.append(files)
        else:
            continue
    if 'file_cookie' in request.session:
        file_list.insert(0, request.session['file_cookie'])

        # Refresh object_type_list
        ocel_object_dict_list = readocel.get_object_types('media/' + request.session['file_cookie'])
        for i in ocel_object_dict_list:
            object_type_list.append(i.get('object_type'))
        if 'object_type_cookie' in request.session:
            object_type_list.insert(0, request.session['object_type_cookie'])

    # Keep clustering_method
    if 'clustering_method_cookie' in request.session:
        if request.session['clustering_method_cookie'] == "kmeans":
            clustering_method = ['checked', '']
        elif request.session['clustering_method_cookie'] == "hierarchical":
            clustering_method = ['', 'checked']

    # Keep event_assignment
    if 'event_assignment_cookie' in request.session:
        if request.session['event_assignment_cookie'] == "all":
            event_assignment = ['checked', '']
        elif request.session['event_assignment_cookie'] == "existence":
            event_assignment = ['', 'checked']

    # FOR DEBUGGING: print all cookies
    if 'file_cookie' in request.session:
        print("----->File: " + request.session['file_cookie'])
    if 'object_type_cookie' in request.session:
        print("----->Object Type: " + request.session['object_type_cookie'])
    if 'clustering_method_cookie' in request.session:
        print("----->Clustering Method: " + request.session['clustering_method_cookie'])
    if 'event_assignment_cookie' in request.session:
        print("----->Event assignment: " + request.session['event_assignment_cookie'])

    return render(request, 'drawpage/drawpage.html', {
        'file_list':file_list,
        'object_type_list':object_type_list,
        'clustering_method':clustering_method,
        'event_assignment':event_assignment,
        'dfg_file_path_list':dfg_file_path_list
    })


