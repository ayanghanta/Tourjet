const express = require('express');

const tourController = require('./../controllers/tourController');

const router = express.Router();

router.route('/category/:category').get(tourController.toursByCategory);

router
  .route('/')
  .get(tourController.getAlltours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .delete(tourController.deleteTour)
  .patch(tourController.updateTour);

module.exports = router;
