const express = require('express');
const stations = require('./stations');
const trips = require('./trips');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

router.use('/stations', stations);
router.use('/trips', trips);

module.exports = router;
