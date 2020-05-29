# NodeJS Back-End for the Chicago Divvy Bike Rental platform using the Divvy API and provided trip data.


## Endpoint features:

 - Returns the information for one station given a station id  
 - Given one or more stations, it returns the number of riders in the following age groups [0-20,21-30,31-40,41-50,51+, unknown], who ended their trip at that station for a given day. 
 - Given one or more stations, it returns the last 20 trips that ended at each station for a single day.

## Additional features

 - API Authorization
 - Test cases
 - Script to containerize deployment

## Getting Started

#### Clone the repo and make it yours:

```bash
git clone repo-url
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

#### via Docker:
Grant execute access to build script using chmod, then :
```bash
./build.sh
```

#### Running tests locally:

```bash
npm run test
```



## Endpoints
#### Get Station by ID
```bash
curl --location --request GET 'localhost:3000/v1/stations/56'
```
#### Get age distribution by end-station ID
```bash
curl --location --request POST 'localhost:3000/v1/trips/query/stations/end/riders/age' \
--header 'Content-Type: application/json' \
--data-raw '{
    "endStationIds": [
        "56",
        "59"
    ],
    "endDate": "2019-04-01"
}'
```
#### Get Last N trips by end-stationId
```bash
curl --location --request POST 'localhost:3000/v1/trips/query/stations/end/last?n=20' \
--header 'Content-Type: application/json' \
--data-raw '{
    "endStationIds": [
        "56",
        "59"
    ],
    "endDate": "2019-04-01"
}'
```


