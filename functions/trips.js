const csv = require('csv-parser');
const fs = require('fs');

fs.createReadStream('../config/Divvy_Trips_2019_Q2.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log('Loaded');
  });
