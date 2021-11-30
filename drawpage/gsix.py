# Library imports 
from pm4pymdl.objects.ocel.importer import importer as ocel_importer
from pm4pymdl.algo.mvp.utils import succint_mdl_to_exploded_mdl
from pm4pymdl.visualization.mvp.gen_framework3 import visualizer as visualizer
import json
from pm4pymdl.algo.mvp.gen_framework3 import discovery
import pandas as pd
import os
from django.conf import settings
from pm4py.objects.log.importer.xes import importer
from pm4py.algo.discovery.dfg import algorithm as dfg_discovery
from pm4py.algo.discovery.dfg import algorithm as dfg_factory

def dfg_to_g6(dfg):
    unique_nodes = []
    print(dfg)
    for i in dfg:
        print(dfg)
   


log = importer.apply("./media/temp-log.xes")
dfg = dfg_factory.apply(log)
this_data,temp_file = dfg_to_g6(dfg)

#event_df, object_df = ocel_importer.apply(file_path="./media/running-example.jsonocel")
#model = discovery.apply(event_df, parameters={"epsilon": 0, "noise_threshold": 0})




