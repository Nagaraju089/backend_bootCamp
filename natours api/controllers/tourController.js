const { aggregate } = require('./../models/tourModel');
const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
exports.aliasTopTours = (req, res, next) => {
    req.query.limit ='5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields ='name,price,ratingsAverage,summary, difficulty';
    next();
    //in the query field these wil be replaced if user hits 'top-5-cheap'

}


// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

    //checking if the 'id'is greater than the specified ones
   
    

    //exports. is used inorder to export the entire functionalities to tourRoutes.js
    //wrapping the function into 'catchAsync' to catch any errors and further sending to global error handling middleware
exports.getAllTours = catchAsync(async(req, res,next) => {
    
        //using ... feature of (ES6) it takes all the fields out of object and by specifying curly braces we create a new object
            
             const features = new APIFeatures(Tour.find(), req.query)
             .filter()
             .sort()
             .limitFields()
             .paginate();
             //EXECUTE QUERY
              const tours = await features.query; 
           
        
          /* const tours = await Tour.find({
       /duration: 5,
        difficulty: "easy" })         ------> To fetch the result as specified in the query string(2 ways)
       get all tours from database*/

      /* const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');*/

          
   
    res.status(200).json({
        status: "success",
       // requestedAt: req.requestTime,
        result: tours.length,
        Data: { 
        tours
     }
    })

});

exports.getTour =catchAsync( async(req, res,next) => {
        const tour = await Tour.findById(req.params.id); 
      //  Tour.findOne({_id: req.params.id});
        //params is the place where the variables(id,name,price) are stored
         //assigns value to our variable(id in our program)

         if(!tour) {
            return next(new AppError("No tour found with that ID", 404))
         }

    
    res.status(200).json({
        status: "success",
       Data: { 
        tour
      }
    });

});



exports.createTour = catchAsync(async (req, res, next) => {

//    const newTour = new Tour({});
//    new.Tour.save();
    const newTour = await Tour.create(req.body)    //req.body the body coming from post request
    res.status(201).json({
        status: "success",
         Data: {
            tour: newTour
         }
    });

   
});

exports.updateTour =catchAsync(async(req, res,next) => {
   
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true ,
         //options data,, to return the modified document rather than original by default: false
         runValidators: true  //the validators will run again for every update
    });

    if(!tour) {
        return next(new AppError("No tour found with that ID", 404))
     }
    
  
    res.status(200).json({
        status: "success",
        Data: { 
            tour
     }
    
    });
  
});

exports.deleteTour = catchAsync(async(req, res) => {
   
  /*  if( req.params.id>tours.length)
    res.status(404).send(
        {
            status: "failed",
            message: "Inavlid Id"
        })*/
        const tour = await Tour.findByIdAndDelete(req.params.id, req.body);
        if(!tour) {
            return next(new AppError("No tour found with that ID", 404))
         }
    res.status(204).json({
        status: "success",
        Data: null
     
    });

});

exports.getTourStats = catchAsync(async(req,res,next) => {
    
        const stats = await Tour.aggregate([
            {
            $match: { 
                ratingsAverage : { $gte: 4.5 }}
        },
       {

        $group: {
            _id: { $toUpper: "$difficulty"},
            numTours: { $sum: 1},
            numRatings: { $sum: "$ratingsQuantity"},
            avgRating: { $avg: "$ratingsAverage" },
            avgPrice: { $avg: "$price" },
            minPrice: { $min: "$price" },
            maxPrice: { $max: "$price"}
        }

        },
        {
            $sort: 
                { avgPrice: 1 }
            
        }

       
        ]);

        res.status(200).json({
            status: "success",
            data: {
                 stats
        }
         
        });
    
    })

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
    
    const year  = req.params.year * 1;
    const plan = await Tour.aggregate([
        {
            $unwind: "$startDates"
        },

        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),  //getting tours for only specified year
                    $lte: new Date(`${year}-12-31`),
                }
            }

        },

        {
            $group: {
                _id: { $month:  '$startDates'},  //$month returns the for a date from Jan to Dec
                numTourStarts : {$sum: 1},  //$sum adds the documents
                tours: {$push: '$name'} //tours is an array and $push pushes names of the tour into the array
            }
        },

        {
           $addFields: { month: '$_id'}
        },

       {
        $project: {   //reshapes the documents bu adding a new field or deleting an existing field
            _id: 0
        }

        },

        {
            $sort: { numTourStarts: -1} 
        },

         {
            $limit: 12 //to give us specified no. of documents
        }

       
    ]);
    res.status(200).json({
        status: "success",
        data: {
            plan
    }
})

});
  
