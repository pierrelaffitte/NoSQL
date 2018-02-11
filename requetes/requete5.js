db.stations.createIndex({geometry:"2dsphere"});
cursor = db.getCollection('stations').find(
   {
     geometry:
       { $near :
          {
            $geometry: { type: "Point",  coordinates: [ -73.989496042, 40.750330332] },
            $maxDistance: 1000
          }
       }
   }
)
printjson(cursor.next());

