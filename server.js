var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var logger     = require('morgan');
var routes     = require('./app/routes/routes');

// Setup logger
app.use(logger('dev')); // log requests to the console

// Configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set server port
var port       = process.env.PORT || 8080;

// Mongo Setup
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/bw-recipes'); // connect to our database

// REGISTER OUR ROUTES -------------------------------
app.use('/api', routes);  // From "/app/routes/*.js"

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server running on: ' + port);
