///
/// NodeJS server file: sets view engine to EJS, connects to DB, uses 'passport' for sessions. 
///

// set up ======================================================================
// get all the tools we need
  //! "Fast, unopinionated, minimalist web framework for node."
var express  = require('express');
  //! "The app object conventionally denotes the Express application."
var app      = express();
  //! Set the environment variable used to define the port number. 
var port     = process.env.PORT || 8080;
  //! "A MongoDB object modeling tool."
var mongoose = require('mongoose');
  //! "For working with asynchronous JavaScript."
var async = require('async');
  //! helps with authentication in Node.js applications.
var passport = require('passport');
  //! "Flash messages are stored in the session."
var flash    = require('connect-flash');
  //! "Create a new morgan logger middleware function using the given format and options."
var morgan       = require('morgan');
  //! "Parse Cookie header and populate req.cookies with an object keyed by the cookie names."
var cookieParser = require('cookie-parser');
  //! "Parse incoming request bodies in a middleware before your handlers, available under the req.body property."
var bodyParser   = require('body-parser');
  //! "Create a session middleware with the given options."
var session      = require('express-session');

  //! Settings for connecting to the database.
var configDB = require('./config/database.js');

// configuration ===============================================================
  //! Connect to our database.
mongoose.connect(configDB.url);

  //! Pass passport for configuration.
require('./config/passport')(passport);

// set up our express application
  //! Log every request to the console.
app.use(morgan('dev'));
  //! Read cookies (needed for auth).
app.use(cookieParser());
  //! Needed for getting information from html forms.
app.use(bodyParser());

app.use("/styles", express.static(__dirname + '/styles'));
app.use("/config", express.static(__dirname + '/config'));
app.use("/images", express.static(__dirname + '/images'));

  //! Set up EJS for templating.
app.set('view engine', 'ejs');

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); //! session secret
app.use(passport.initialize());
  //! Persistent login sessions. 
app.use(passport.session());
  //! Use connect-flash for flash messages stored in session. 
app.use(flash());

// routes ======================================================================
  //! Load routes, pass in app, and fully configured passport.
require('./app/routes.js')(app, passport);

// launch ======================================================================
  //! Start listening for HTTP requests at (port).
app.listen(port);
console.log('The magic happens on port ' + port);
