
const fetch = require('node-fetch');
const config = require('../config/config.json');

module.exports = {

  async getStation(id) {
    const response = await fetch(config.stationsUrl)
      .then((res) => res.json());

    const { data: { stations = [] } = {} } = response;

    const results = stations.filter((e) => e.station_id === id);

    return results[0] || null;
  },

  async getStations(ids = []) {
    const results = [];
    await Promise.all(ids.map(async (id) => {
      const result = this.getStation(id);

      if (result) {
        results.push(results);
      }
    }));

    return results;
  },
};
