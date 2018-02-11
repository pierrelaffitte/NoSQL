cursor = db.hospitals.aggregate([
  { $match : { Borough : "Manhattan"}},
  { $group: { 
        _id : "$Facility", 
        count: { $sum: 1 }
      }
  }
  ])
while (cursor.hasNext()){
	printjson(cursor.next());
}
