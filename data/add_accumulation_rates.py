# -*- coding: utf-8 -*-
"""
Created on Wed Nov  1 17:01:00 2023

@author: grace
"""

import pandas as pd
deid = pd.read_csv("DEID_raw.csv", index_col=0)
deid["SWEAccRate"] = deid["SWE"].diff(periods=1)
deid["SnowAccRate"] = deid["SnowAcc"].diff(periods=1)
deid.to_csv("DEID.csv")