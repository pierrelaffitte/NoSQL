db.mes_stations.createIndex({geometry:"2dsphere"});
cursor = db.getCollection("mes_stations").aggregate([
   {
     $geoNear: {
        near: { type: "Point", coordinates: [-73.993764493639, 40.7380275429741] },
        distanceField: "dist.calculated",
        maxDistance: 500,
        //query: { type: "public" },
        includeLocs: "dist.location",
        num: 1,
        spherical: true
     }
   }
])
printjson(cursor._batch);

