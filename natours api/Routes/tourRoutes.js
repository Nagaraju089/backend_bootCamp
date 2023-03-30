

const express = require('express')
const tourController = require('./../controllers/tourController');// imported from tourController.js
const router = express.Router(); //router is another router instance, it is used instead of 'app'(app.use)
const authController = require('./../controllers/authController');
//it is also a middleware 

//router.param('id',tourController.checkId);  // 
router.route('/top-5-cheap')
 .get(tourController.aliasTopTours, tourController.getAllTours); //aliasTopTours is a middleware,, when user hits top-5-cheap then the middleware functionality gets executed 
 
 
router
.route('/tour-stats')
.get(tourController.getTourStats);

router
.route('/monthly-plan/:year')
.get(tourController.getMonthlyPlan);

router
.route('/')
.get(authController.protect, tourController.getAllTours) 
.post(tourController.createTour);


router
.route('/:id')
.get(tourController.getTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour)

module.exports = router; //to export the router and to import it in the main application(app.js here)
