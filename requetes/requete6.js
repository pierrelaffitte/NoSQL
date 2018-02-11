cursor = db.getCollection('stations').aggregate([
{ $project : { "properties.objectid":1,"properties.name":1 , geometry : 1, nb_stations : { $split: ["$properties.line", "-"]}, qty : 1 }},
{ $match : { nb_stations: { $in: [ /1/, /2/, /3/ ] }}},
{ $limit : 5} 
])
while (cursor.hasNext()){
	printjson(cursor.next());
}
cursor = db.getCollection('stations').aggregate([
{ $project : { "properties.objectid":1,"properties.name":1 , geometry : 1, nb_stations : { $split: ["$properties.line", "-"]}, qty : 1 }},
{ $match : { nb_stations: { $in: [ /1/, /2/, /3/] }}},
{ $out : "mes_stations"}
])  
