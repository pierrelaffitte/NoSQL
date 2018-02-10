#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Feb  8 11:54:25 2018

@author: pierre
"""
import pymongo
import json
import pprint
cnx_string = "mongodb://localhost:27017"
cnx = pymongo.MongoClient(cnx_string)
db = cnx.datas
## ----------------------------------------------------------------------------
# Requête 1
ma_requete =  [ { 
      "$group": { 
        "_id" : "$Borough", 
        "count": { "$sum": 1 }
      }
  }]
print("Requête 1 ") 
pprint.pprint(list(db.hospitals.aggregate(ma_requete)))
print("\n\n")
