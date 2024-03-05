const express = require('express');

const tourController = require('./../controllers/tourController');

const router = express.Router();

router.route('/').get(tourController.getAlltours);

module.exports = router;
