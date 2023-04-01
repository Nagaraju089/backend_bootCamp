const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

//we use mergeParams coz by default each router has access to the parameters of their specific routes


// router.param('id', tourController.checkID);

//POST/:tourrId/reviews
// router
//   .route('/:tourId/reviews')
//   .post(authController.protect, authController.restrictTo('user'), reviewController.createReview);



router.use('/:tourId/reviews', reviewRouter);  //redirects to reviewRoutes when /:tourdId/reviews endpoint is hit


router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'user'),
    tourController.deleteTour
  );
 
  
module.exports = router;
