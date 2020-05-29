const express = require('express');

const router = express.Router();
const tripFunctions = require('../functions/trips');


router.route('/query/stations/end/riders/age')
  .post(async (req, res) => {
    try {
      const { endStationIds, endDate } = req.body;
      const result = await tripFunctions.getRiders({ endStationIds, endDate });
      res.send(result);
    } catch (ex) {
      console.error(ex);
      res.status(500).send({ error: { message: ex.message } });
    }
  });

router.route('/query/stations/end/last')
  .post(async (req, res) => {
    try {
      const { n = '20' } = req.query;
      const { endStationIds, endDate } = req.body;
      const result = await tripFunctions.getLastNTrips({ endStationIds, endDate, n });
      res.send(result);
    } catch (ex) {
      console.error(ex);
      res.status(500).send({ error: { message: ex.message } });
    }
  });


module.exports = router;
