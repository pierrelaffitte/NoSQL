cursor = db.getCollection('museums').findOne({"properties.adress1" : "15 W. 16th St."})
printjson(cursor);


