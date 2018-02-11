cursor = db.hospitals.aggregate([  { $group: { 
        _id : "$Borough", 
        count: { $sum: 1 }
      }
  }
  ])
while (cursor.hasNext()){
	printjson(cursor.next());
}
