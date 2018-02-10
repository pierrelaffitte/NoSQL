mkdir ~/PierreLaffitte/1-Data
cd ~/PierreLaffitte/1-Data

wget -O station_metro.geojson 'https://data.cityofnewyork.us/api/geospatial/arq3-7z49?method=export&format=GeoJSON'
wget -O marche.json https://data.cityofnewyork.us/api/views/j8gx-kc43/rows.json?accessType=DOWNLOAD
wget -O hospital.json https://data.cityofnewyork.us/api/views/ymhw-9cz9/rows.json?accessType=DOWNLOAD
wget -O museum.geojson 'https://data.cityofnewyork.us/api/geospatial/ekax-ky3z?method=export&format=GeoJSON'
wget -O theater.json https://data.cityofnewyork.us/api/views/2hzz-95k8/rows.json?accessType=DOWNLOAD

