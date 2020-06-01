const csv = require('csv-parser');
const fs = require('fs');

const loadedTrips = [];
let loaded = false;
const CURRENT_YEAR = new Date().getFullYear();
const CSV_PATH = `${__dirname}/../config/Divvy_Trips_2019_Q2.csv`;
try {
  if (fs.existsSync(CSV_PATH)) {
    console.log('Please wait while the dataset is being loaded to memory...');
    fs.createReadStream(CSV_PATH)
      .pipe(csv())
      .on('data', (data) => {
        loadedTrips.push({
          startTime: data['01 - Rental Details Local Start Time'],
          endTime: data['01 - Rental Details Local End Time'],
          startStationId: data['03 - Rental Start Station ID'],
          endStationId: data['02 - Rental End Station ID'],
          birthYear: data['05 - Member Details Member Birthday Year'],
          age: CURRENT_YEAR - (data['05 - Member Details Member Birthday Year'] || NaN),
        });
      })
      .on('end', () => {
        console.log('CSV loaded succesfully');
        loaded = true;
      });
  } else {
    console.error(`${CSV_PATH}, not found.`);
  }
} catch (err) {
  console.error('Error while reading CSV', err.message);
}


module.exports = {
  getTrips() {
    if (loaded) {
      return loadedTrips;
    }
    throw new Error('Trips not loaded to memory yet, Please wait and try again');
  },


  getRiders({ endStationIds = [], endDate = 'yyyy-mm-dd' }) {
    const results = this.getTrips().filter((e) => endStationIds.includes(e.endStationId)
     && e.endTime.slice(0, 10) === endDate);
    // OPTIMIZE : Can try using switch case here.
    const result = results.reduce((obj, item) => {
      if (item.age > 0 && item.age <= 20) {
        obj['0-20']++;
      } else if (item.age > 21 && item.age <= 30) {
        obj['21-30']++;
      } else if (item.age > 31 && item.age <= 40) {
        obj['31-40']++;
      } else if (item.age > 41 && item.age <= 50) {
        obj['41-50']++;
      } else if (item.age > 51) {
        obj['51+']++;
      } else if (isNaN(item.age)) {
        obj.unknown++;
      }
      return obj;
    }, {
      '0-20': 0,
      '21-30': 0,
      '31-40': 0,
      '41-50': 0,
      '51+': 0,
      unknown: 0,
    });

    return result;
  },


  getLastNTrips({ endStationIds = [], endDate = 'yyyy-mm-dd', n = 20 }) {
    const trips = {};
    endStationIds.forEach((id) => {
      const stationTrips = this.getTrips().filter(
        (e) => e.endStationId === id && e.endTime.slice(0, 10) === endDate,
      );

      trips[id] = stationTrips.sort(
        (a, b) => new Date(b.endTime) - new Date(a.endTime),
      ).slice(0, n);
    });

    return trips;
  },
};
