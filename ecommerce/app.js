const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('./util/connectDB');
const expressValidator = require('express-validator');
const authRoutes = require('./routes/authRoute');

//middleware
app.use(morgan('dev')); //give route in console//good for development
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());

//routes
app.use('/api', authRoutes);

//server listen
const port = process.env.PORT || 8080;
const server = () => {
  app.listen(port, () => {
    console.log(`Listening to port ${port}!`);
  });
};
//db
connectDB(server);
