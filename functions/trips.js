const csv = require('csv-parser');
const fs = require('fs');

const allTrips = [];
let loaded = false;
const CURRENT_YEAR = new Date().getFullYear();

fs.createReadStream(`${__dirname}/../config/Divvy_Trips_2019_Q2.csv`)
  .pipe(csv())
  .on('data', (data) => {
    allTrips.push({
      startTime: data['01 - Rental Details Local Start Time'],
      endTime: data['01 - Rental Details Local End Time'],
      startStationId: data['03 - Rental Start Station ID'],
      endStationId: data['02 - Rental End Station ID'],
      birthYear: data['05 - Member Details Member Birthday Year'],
      age: CURRENT_YEAR - data['05 - Member Details Member Birthday Year'],
    });
  })
  .on('end', () => {
    console.log('CSV loaded succesfully');
    loaded = true;
  });


module.exports = {
  getRiders({ endStationIds = [], endDate = 'yyyy-mm-dd' }) {
    const results = allTrips.filter((e) => endStationIds.includes(e.endStationId)
     && e.endTime.slice(0, 10) === endDate);
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
      } else if (item.age.isNaN) {
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

  getLast20Trips({ endStationIds = [], endDate = 'yyyy-mm-dd' }) {

  },
};
// 0-20,21-30,31-40,41-50,51+, unknown
