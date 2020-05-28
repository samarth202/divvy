const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const validations = require('../validations/stations')

router.route('/register')
    .post(validate(validations.), controller.register);

module.exports = router;