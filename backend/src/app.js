// Create express app
const express = require('express');
const app = express();

// Setup path to backend
const path = require('path');

// Setup middlewares
// Requests logger
const { logger } = require('./middleware/logger');
app.use(logger);

// Errors logger
const errorLogger = require('./middleware/errorHandler');
app.use(errorLogger);

// Cross-origin resource sharing
const cors = require('cors');
app.use(
    cors({
      origin: true,
      credentials: true,
    })
);

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

// Middleware to parse and populate req.cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

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