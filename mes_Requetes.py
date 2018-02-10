#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Feb  8 11:54:25 2018

@author: pierre
"""

cnx_string = "mongodb://localhost:27017"
cnx = pymongo.MongoClient(cnx_string)
db = cnx.datas
db = pymongo.MongoClient()
result = db.things.insert_many([{"x": 1, "tags": ["dog", "cat"]},
                                 {"x": 2, "tags": ["cat"]},
                                 {"x": 2, "tags": ["mouse", "cat", "dog"]},
                                 {"x": 3, "tags": []}])
result.inserted_ids


pipeline = [
   {"$unwind": "$tags"},
  {"$group": {"_id": "$tags", "count": {"$sum": 1}}},
 ]
import pprint
pprint.pprint(list(db.things.aggregate(pipeline)))


## ----------------------------------------------------------------------------
# Requête 1
ma_requete =  [ { 
      "$group": { 
        "_id" : "$Borough", 
        "count": { "$sum": 1 }
      }
  }]
  
pprint.pprint(list(db.hospitals.aggregate(ma_requete)))
