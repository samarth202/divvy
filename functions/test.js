const trips = require('./trips');

setTimeout(async () => {
  console.log('testing');
  const result = trips.getRiders({
    endStationIds: ['56', '59'],
    endDate: '2019-04-01',
  });

  console.log(result);
}, 7 * 1000);
