cursor =db.marches.aggregate({$group: { _id : "$city",count: { $sum: 1 }}});
while (cursor.hasNext()){
	printjson(cursor.next());
}
