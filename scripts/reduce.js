const csv = require('csv-parser');
const fs = require('fs');

const results = [];
let loaded = false;

fs.createReadStream(`${__dirname}/../config/Divvy_Trips_2019_Q2.csv`)
  .pipe(csv())
  .on('data', (data) => {
    results.push({
      startTime: new Date(data['01 - Rental Details Local Start Time']),
      endTime: new Date(data['01 - Rental Details Local Start Time']),
      startStationId: data['03 - Rental Start Station ID'],
      endStationId: data['02 - Rental End Station ID'],
    });
  })
  .on('end', () => {
    console.log('CSV loaded succesfully');
    loaded = true;
  });


//   const fs = require('fs');
// const trips = require('../config/Divvy_Trips_2019_Q2.json');

// // const map = trips.reduce((obj, e) => {
// //   const tripId = e['01 - Rental Details Rental ID'];
// //   if (!obj[tripId]) {
// //     obj[tripId] = [];
// //   }
// //   obj[tripId].push(e);

// //   return obj;
// // }, {});


// // fs.writeFileSync('reduced.json', JSON.stringify(map));


// console.log('loaded');
