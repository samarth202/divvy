
const assert = require('assert');
const stationFunctions = require('../functions/stations');

describe('functions/stations', () => {
  it('should query the station via the api', async () => {
    const result = await stationFunctions.getStation('56');

    assert(result.station_id === '56', 'station ids match');
    assert(result.name === 'Desplaines St & Kinzie St', 'station name match');
  });
});
