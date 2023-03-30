const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController');
//both of these are imported because we exported in tourRoutes.js
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//.use is used to use middleware and to add middleware to middleware stack
// 1) MIDDLEWARES
//'morgan' is a middleware is a popuar logging middleware which allows to see request data in the console 
//for ex: HTTP method, status code, Time it has taken to send back the response.

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//NODE_ENV=development nodemon server.js
//express.json() wil cal json() function and returns a function and that function wil be added to middleware stack
//express.json() will parse incoming requests with JSON payload
//payload means {
 /*  "cid": 1,
   "cname": "Hubspot",
}*/// in this the 1  anf Hubspot is the payload
app.use(express.json());
//app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Thankyou!!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//error handler for undefined routes
app.all('*', (req,res,next) =>{
 
  next(new AppError(`Can't find ${req.originalUrl} on this server`));
  /*res.status(404).json({
    status: 'failed',
    message: `Can't find the ${req.originalUrl} on this server`*/
   
    
  });
//middleware for global error handler 
  app.use(globalErrorHandler);

      
  


module.exports = app;  //inorder to use it in the server.js we exported
