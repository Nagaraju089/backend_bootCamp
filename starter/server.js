const mongoose = require('mongoose');

const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
dotenv.config({ path: './config.env' });
const app = require('./app');  //imported from app.js


const DB =process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

//const connections =mongoose.connections
mongoose.connect(DB, {
  //useNewUrlParser: true,
  //useCreateIndex: true,
  //useFindAndModify: false
})

.then(() =>{
  //console.log(connections);
  console.log("Database connceted successfully");
});

//listening to requests
const port = process.env.PORT || 3000;  //port number should be either coming from process.env.PORT or 3000
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});