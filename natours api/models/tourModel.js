const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');


//creating a schema
//new mongoose.schema--to specify a schema for our data
const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tour must have a name'],  //the array is a validator which validates whether 'name' is there or not 
      unique: true,
      trim: true
  
    },
    slug: String,
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration'],
      },
      
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a maxGroupSize'],
      },

    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty']
      },
    
    ratingsAverage: {
      type: Number,
      default: 0,
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },

  
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },

    priceDiscount: Number,
    summary: {
        type: String,
        trim: true, //all the spaces are trimmed,
        required: [true, 'A tour must have a price']
      },
      description: {
        type: String,
        trim: true,
        //required: [true, 'A tour must have a price']
      },
      imageCover: {
        type: String,  //name of the image read from filesystem
       // required: [true, 'A tour must have an imageCover'],
      },
      images: [String],

      createdAt: {
        type: Date,
        default: Date.now,
        select: false
      },
      startDates: [Date],
      secretTour: {
        type: Boolean,
        default: false

      }
    

},
{
  //each time the data is ouputted as JSON  and when virtuals=true thenthe virtuals are part of output
  toJSON: { virtuals: true},
  toObject: { virtuals: true}
},
);


    tourSchema.virtual('durationWeeks').get(function() {
      return this.duration /7;
    

    });

   
//DOCUMENT MIDDLEWARE  runs before .save() and .create() //VIRTUAL PROPERTY
    tourSchema.pre('save', function(next) {
      this.slug = slugify(this.name, {lower: true});
      next();
    })

    

    // tourSchema.pre('save', function(next) {
    //   console.log("will save the document....");
    //   next();
    // });

    // tourSchema.post('save', function(doc,next) { //has acces to previous doc and next
    //   //console.log(doc);
    //  next();
    // });
    
    //QUERY MIDDLEWARE
    //tourSchema.pre('find', function(next) {
     // next();
   // })

   tourSchema.pre(/^find/, function(next) {
    this.find({ secretTour: { $ne: true } });
  
    this.start = Date.now();
    next();
  });
  
  tourSchema.post(/^find/, function(docs, next) {
    console.log(`Query took ${Date.now() - this.start} milliseconds!`);
    next();
  });
  
  // AGGREGATION MIDDLEWARE
  tourSchema.pre('aggregate', function(next) {
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  
    console.log(this.pipeline());
    next();
  });

  
    
  //creating a model for the schema
  const Tour = mongoose.model('Tour', tourSchema)

  module.exports = Tour;
  