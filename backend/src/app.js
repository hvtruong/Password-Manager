// Create express app
const express = require('express');
const app = express();

// Setup middlewares
// Requests logger
const {logger} = require('./middleware/logger');
app.use(logger);

// Errors logger
const errorLogger = require('./middleware/errorHandler');
app.use(errorLogger);

// CSRF
const csrf = require('csurf');
app.use(csrf());

// Cross-origin resource sharing
const cors = require('cors');
app.use(
    cors({
      origin: true,
      credentials: true,
    })
);

// Connect to MongoDB
const db = require('./config/DBConnection');

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Session setup for passport middleware
const session = require('express-session');
const MongoStore = require('connect-mongo');
app.use(session({
  secret: 'secret key', // Key to be changed when in production
  resave: false, // Do not save session if unmodified
  saveUninitialized: false, // Do not create session until something stored
  store: new MongoStore({mongoUrl: db.client.s.url})
}));

// Passport middleware for authentication
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
userModel = require('./models/User');
const strategy = new LocalStrategy(userModel.authenticate())

passport.use(strategy);
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

// Setup all routers
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const dashBoardRouter = require('./routes/dashboard');

// Setup view engine
app.set('views', '../frontend/src/views');
app.set('view engine', 'jade');

// Built-in middleware to parses incoming requests with JSON payloads
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Middleware to compress response bodies
const compression = require('compression');
app.use(compression());

// Static middleware
app.use(express.static('../frontend/src/public'));
app.use(express.static('../frontend/src/views'));



// Setup API routes
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/dashboard', dashBoardRouter);

// Catch 404 and forward to error handler
const createError = require('http-errors');
app.use(function(req, res, next) {
  next(createError(404));
});

// Handle errors
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error', {title: '404 Not Found'});
});

module.exports = app;