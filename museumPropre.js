/* why manhattan is safe
db.marches.aggregate(
  { 
      $group: { 
        _id : "$city", 
        count: { $sum: 1 }
      }
  }
  ) 
*/
/*
db.hospitals.aggregate([  { $group: { 
        _id : "$Borough", 
        count: { $sum: 1 }
      }
  }
  ])
  */
/*
db.hospitals.aggregate([
  { $match : { Borough : "Manhattan"}},
  { $group: { 
        _id : "$Facility", 
        count: { $sum: 1 }
      }
  }
  ])
  db.hospitals.aggregate([
  { $match : { Borough : "Brooklyn"}},
  { $group: { 
        _id : "$Facility", 
        count: { $sum: 1 }
      }
  }
  ])
*/
db.stations.createIndex({geometry:"2dsphere"});
db.getCollection('stations').find(
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
/* Il s'avère que les lignes 1,2 et 3 sont les plus proches.
   On cherche donc les stations qui sont sur ces 3 lignes*/
db.getCollection('stations').aggregate([
{ $project : { "properties.objectid":1,"properties.name":1 , geometry : 1, nb_stations : { $split: ["$properties.line", "-"]}, qty : 1 }},
{ $match : { nb_stations: { $in: [ /1/, /2/, /3/ ] }}} 
])
db.getCollection('stations').aggregate([
{ $project : { "properties.objectid":1,"properties.name":1 , geometry : 1, nb_stations : { $split: ["$properties.line", "-"]}, qty : 1 }},
{ $match : { nb_stations: { $in: [ /1/, /2/, /3/] }}},
{ $out : "mes_stations"}
])   

/* on requete les museums et théatres*/
db.getCollection("museums").aggregate([
{$group :
    {_id : "$properties.zip", 
        count: { $sum: 1 } }
    },
{$sort : { count : -1}}
])
db.getCollection("museums").aggregate([
{$group : {_id : "$properties.zip", count: { $sum: 1 } }},
{$sort : { count : -1}}
])

db.getCollection("museums").find(
{"properties.zip" : "10011.0"}
).forEach(function( station) {
         print( station.geometry.coordinates[1]+", "+ station.geometry.coordinates[0]);}
)       

db.getCollection('museums').aggregate([
{ $project : { "properties.zip":1,"properties.adress1":1 , geometry : 1, nb_stations : { $split: ["$properties.line", "-"]}, qty : 1 }},
{$group: { 
_id : "$properties.adress1", 
count: { $sum: 1 }
}}])
db.getCollection('museums').findOne({"properties.adress1" : "15 W. 16th St."})
/* on récupère une coordonnée GPS */
/* on voudrait celle qui soit proche de cinémas et museums*/
//db.mes_stations.createIndex({geometry:"2dsphere"});
db.getCollection("mes_stations").aggregate([
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

