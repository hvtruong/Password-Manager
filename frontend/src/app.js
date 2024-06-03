const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const backendPath = path.join(__dirname, '..', '..', 'backend');

// Setup middlewares
// Requests logger
const { logger } = require(path.join(backendPath, 'middleware', 'logger'));
// Error logger
const errorLogger = require(path.join(backendPath, 'middleware', 'errorHandler'));

// Cross-origin resource sharing
const cors = require('cors');
const corsOptions = require(path.join(backendPath, 'config', 'corsOptions'));

// Connect MongoDB
const connectDB = require(path.join(backendPath, 'config', 'DBConnection'));
const mongoose = require('mongoose')

// Passport for authentication
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const session = require('express-session');

// Setup all routers
const homeRouter = require(path.join(backendPath, 'routes', 'home'));
const loginRouter = require(path.join(backendPath, 'routes', 'login'));
const registerRouter = require(path.join(backendPath, 'routes', 'register'));
const authenticateRouter = require(path.join(backendPath, 'routes', 'authenticate'));
const dashBoardRouter = require(path.join(backendPath, 'routes', 'dashboard'));;

const bodyParser= require('body-parser');
const app = express();

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger);
app.use(cors(corsOptions));

connectDB();

// Use session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// Link the page to associated router
app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/authenticate', authenticateRouter);
app.use('/dashboard', dashBoardRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Handle errors
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: '404 Not Found'});
});

app.use(errorLogger);

module.exports = app;