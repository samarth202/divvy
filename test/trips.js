
const assert = require('assert');
const tripFunctions = require('../functions/trips');

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

describe('functions/stations', () => {
  it('throw an error, data set is not loaded', async () => {
    try {
      await tripFunctions.getRiders({
        endStationIds: [
          '56',
          '59',
        ],
        endDate: '2019-04-01',
      });
    } catch (ex) {
      assert(ex.message === 'Trips not loaded to memory yet, Please wait and try again');
    }
  });

  it('should sleep for 7 seconds and query rider stats by age', async () => {
    // Might need more or less time - adjust this if it fails.
    await sleep(10000);
    const result = await tripFunctions.getRiders({
      endStationIds: [
        '56',
      ],
      endDate: '2019-04-01',
    });

    assert.equal(
      result['0-20'] === 0
      && result['21-30'] === 13
      && result['31-40'] === 19
      && result['41-50'] === 5
      && result['51+'] === 3
      && result.unknown === 0, true,
    );
  }).timeout(12000);

  it('should query last 20 trips for station id 56', async () => {
    // Might need more or less time - adjust this if it fails.
    const result = await tripFunctions.getLastNTrips({
      endStationIds: [
        '56',
      ],
      endDate: '2019-04-01',
      n: 20,
    });
    assert.equal(
      result['56'].length === 20, true,
    );
  });
});
