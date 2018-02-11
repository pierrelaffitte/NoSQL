#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Feb  9 21:34:13 2018

@author: pierre
"""

import pymongo
import json
import os

# load museums
json_data = open("museum.geojson")
data = json.load(json_data)
lignes = data["features"]

datas = []
for ligne in lignes:
    datas.append(ligne)

cnx_string = "mongodb://localhost:27017"
cnx = pymongo.MongoClient(cnx_string)
db = cnx.datas
db.museums.insert(datas)



# load stations métro
json_data = open("station_metro.geojson")
data = json.load(json_data)
lignes = data["features"]
datas = []
for ligne in lignes:
    datas.append(ligne)

db.stations.insert(datas)

### load marches
datas = []
json_data = open("marche.json")
data = json.load(json_data)
colNames = []
for elem in data["meta"]["view"]["columns"]:
    colNames.append(elem["fieldName"])
colNames
for elem in data["data"]:
    id_ = elem[colNames.index(":id")]
    facilityName = elem[colNames.index("facilityname")]
    addinfo = elem[colNames.index("facilityaddinfo")]
    streetname = elem[colNames.index("facilitystreetname")]
    city = elem[colNames.index("facilitycity")]
    state = elem[colNames.index("facilitystate")]
    zipcode = elem[colNames.index("facilityzipcode")]
    latitude = elem[colNames.index("latitude")]
    longitude = elem[colNames.index("longitude")]

    datas.append({
            "id": id_,
            "facilityName":facilityName,
            "add_info":addinfo,
            "streetName": streetname,
            "city":city,
            "state":state,
            "zipcode":zipcode,
            "geometry" : {"type" : "Point","coordinates" : [latitude,longitude]}
            })
json_data.close()

with open("./marcheStructure.json", "w") as outfile:
    json.dump(datas,outfile,indent=4)
json_data = open("marcheStructure.json")
data = json.load(json_data)

db.marches.insert(data)

### load hospital

datas = []
json_data = open("hospital.json")
data = json.load(json_data)
for i in range(0,len(data["data"])):
    print(data["data"][i])
    elem = data["data"][i]
    datas.append({"id":elem[0], "Facility Name":elem[10] ,"Facility":elem[8], "Borough":elem[9]})
    
json_data.close()

with open("./hospitalStructure.json", "w") as outfile:
    json.dump(datas,outfile,indent=4)
json_data = open("hospitalStructure.json")
data = json.load(json_data)

db.hospitals.insert(data)
