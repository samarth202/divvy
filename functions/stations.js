
const fetch = require('node-fetch');
const config = require('../config/config.json');

let stations = [];


const stationFunctions = {

  async fetchStations() {
    const response = await fetch(config.stationsUrl)
      .then((res) => res.json());

    const { data: { stations = [] } = {} } = response;

    return stations;
  },

  async getStation(id) {
    const results = stations.filter((e) => e.station_id === id);

    return results[0] || null;
  },

  async getStations(ids = []) {
    const results = [];
    await Promise.all(ids.map(async (id) => {
      const result = await this.getStation(id);

      if (result) {
        results.push(results);
      }
    }));

    return results;
  },
};

console.log('Fetching stations, Please wait...');
stationFunctions.fetchStations().then((res) => {
  stations = res;
  console.log('Stations fetched, count:', stations.length);
}).catch((err) => {
  console.error('Error fetching stations', err);
});


module.exports = stationFunctions;
