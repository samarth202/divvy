const express = require('express');

const router = express.Router();
const stationFunctions = require('../functions/stations');


router.route('/:id')
  .get(async (req, res) => {
    try {
      const result = await stationFunctions.getStation(req.params.id);
      res.send(result);
    } catch (ex) {
      console.error(ex);
      res.status(500).send({ error: { message: ex.message } });
    }
  });


module.exports = router;
