/* ************************************************************************************
 * App.js - the core of the application.
 * Here middlewares are connected to the main istance of express
 * that are used to defining errors, cors exceptions, routes, connections
 * to the database(s)
 * ************************************************************************************/

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const db_connection = require('./db_connection');
const cors_middleware = require('./api/middlewares/cors_middleware')

// GETTING ROUTES
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');


// var config = require('./config.js').get();

// MAKE CONNECTION TO THE DB
db_connection()

// EXPRESS MAIN ISTANCE
const app = express();

// MIDDLEWARES
app.use(morgan('dev')); // logs into server console requests made

app.use('/upload', express.static('upload')); // define static directory for files

app.use(bodyParser.urlencoded({ extended: false })); // type of parsing - simple parser
app.use(bodyParser.json()); //extract json from body request

// CORS ERRORS prevent middleware
app.use(cors_middleware);

// ROUTE middlewares
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(morgan('dev')) // logging

// ERROR middlewares
app.use((req, res, next) => { // Not found error catcher
  const error = new Error('NOT FOUND');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => { // other errors catcher
  // console
  res.status(err.status || 500);
  res.json({ error: { message: err.message }});
});

module.exports = app;