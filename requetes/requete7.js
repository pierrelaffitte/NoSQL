cursor = db.getCollection("museums").aggregate([
{$group :
    {_id : "$properties.zip", 
        count: { $sum: 1 } }
    },
{$sort : { count : -1}}
])
while (cursor.hasNext()){
	printjson(cursor.next());
}
