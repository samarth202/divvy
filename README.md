# NodeJS Back-End for the Chicago Divvy Bike Rental platform using the Divvy API and provided trip data.

## NOTE:
This repo requires LFS installed in the machine, in order to pull the 'Divvy_Trips_2019_Q2.csv' in ./config/Divvy_Trips_2019_Q2.csv

```bash
brew install git-lfs
git lfs pull
```

## Endpoint features:

 - Returns the information for one station given a station id  
 - Given one or more stations, it returns the number of riders in the following age groups [0-20,21-30,31-40,41-50,51+, unknown], who ended their trip at that station for a given day. 
 - Given one or more stations, it returns the last 20 trips that ended at each station for a single day.

## Additional features

 - JWT API Authorization
 - Test cases
 - Script to containerize deployment

## Getting Started

#### Clone the repo and make it yours:

```bash
git clone https://github.com/samarth202/divvy.git
cd divvy
```

#### Install dependencies:

```bash
npm i
```
### Starting the server locally (on PORT 3000)
#### via nodeJS:

```bash
npm start
```

#### OR mutli-Core via nodeJS using cluster:
Note: I ran this on my multi core MacBookPro, The app drove my CPU fans to full speed because the app loaded the trip dataset on booting up, ie. NodeJS loads the dataset n times altogether (n = no. of cores). I recommend running one copy of the app in a load balanced distributed environment for a more stable behaviour.
```bash
npm run start-multicore
```

#### OR via Docker:
Grant execute access to build script using chmod, then :
```bash
./build.sh
```

To stop container :
```bash
docker stop divvy-express-app
```

#### Running tests locally:

```bash
npm run test
```

## Endpoints
#### Get Station by ID
```bash
curl --location --request GET 'localhost:3000/v1/stations/56' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaXZ2eSIsIm5hbWUiOiJ0ZXN0In0.VeWz823FdZY4X9CM0Zq_czLj14m5TKXB_HxGyGpySxc'
```
#### Get age distribution by end-station ID
```bash
curl --location --request POST 'localhost:3000/v1/trips/query/stations/end/riders/age' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaXZ2eSIsIm5hbWUiOiJ0ZXN0In0.VeWz823FdZY4X9CM0Zq_czLj14m5TKXB_HxGyGpySxc' \
--header 'Content-Type: application/json' \
--data-raw '{
    "endStationIds": [
        "56"
    ],
    "endDate": "2019-04-01"
}'
```
#### Get Last N trips by end-stationId
```bash
curl --location --request POST 'localhost:3000/v1/trips/query/stations/end/last?n=20' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaXZ2eSIsIm5hbWUiOiJ0ZXN0In0.VeWz823FdZY4X9CM0Zq_czLj14m5TKXB_HxGyGpySxc' \
--header 'Content-Type: application/json' \
--data-raw '{
    "endStationIds": [
        "56"
    ],
    "endDate": "2019-04-01"
}'
```
