# NoSQL Project
# author : Pierre Laffitte
# Date : 10/02/2018

# 1. install python3 and packages
sudo apt-get install python3-pip
pip3 install pymongo
pip3 install json
#pip3 install jupyter
#sudo apt-get install jupyter-core

# 2. install mongodb
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
sudo apt-get update
sudo apt-get install -y mongodb-org


# start mongo
sudo service mongod start

# 3. Download databases
wget -O station_metro.geojson 'https://data.cityofnewyork.us/api/geospatial/arq3-7z49?method=export&format=GeoJSON'
wget -O marche.json https://data.cityofnewyork.us/api/views/j8gx-kc43/rows.json?accessType=DOWNLOAD
wget -O hospital.json https://data.cityofnewyork.us/api/views/ymhw-9cz9/rows.json?accessType=DOWNLOAD
wget -O museum.geojson 'https://data.cityofnewyork.us/api/geospatial/ekax-ky3z?method=export&format=GeoJSON'
wget -O theater.json https://data.cityofnewyork.us/api/views/2hzz-95k8/rows.json?accessType=DOWNLOAD

# 4. load databases in mongoDB
python3 loadPythonCleanv2.py

# 5. launch queries
mongo
