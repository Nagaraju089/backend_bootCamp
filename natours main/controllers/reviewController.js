const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { request } = require('../app');


exports.getAllReviews = catchAsync(async(req, res, next) => {

    const reviews = await Review.find();

    res.status(200).json({
        status: "success",
        result: reviews.length,
        data: {
            
        reviews
        }

    })

})

exports.createReview = catchAsync(async(req,res,next) => {

    //nested routes
    if(!req.body.tour) req.body.tour = req.params.tourId;
    if(!req.body.user) req.body.user = req.user.id;
    
    const  newReview = await Review.create(req.body);

    res.status(200).json({
        status: "success",
        data: newReview
    })
})