cursor = db.getCollection('museums').aggregate([
{ $project : { "properties.zip":1,"properties.adress1":1 , geometry : 1, nb_stations : { $split: ["$properties.line", "-"]}, qty : 1 }},
{$group: { 
_id : "$properties.adress1", 
count: { $sum: 1 }
}}])
while (cursor.hasNext()){
	printjson(cursor.next());
}
