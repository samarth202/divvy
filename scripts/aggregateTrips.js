const fs = require('fs');
const trips = require('../config/Divvy_Trips_2019_Q2.json');

// const map = trips.reduce((obj, e) => {
//   const tripId = e['01 - Rental Details Rental ID'];
//   if (!obj[tripId]) {
//     obj[tripId] = [];
//   }
//   obj[tripId].push(e);

//   return obj;
// }, {});


// fs.writeFileSync('reduced.json', JSON.stringify(map));


console.log('loaded');
