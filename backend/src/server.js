require('dotenv').config()
require('express-async-errors')

const createError = require('http-errors');
const cookieParser = require('cookie-parser');

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

// Cross-origin resource sharing
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
app.use(cors(corsOptions));

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

app.use(cookieParser());

// Static middleware
app.use(express.static('../frontend/src/public'));
app.use(express.static('../frontend/src/views'));

// Link the page to associated router
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/dashboard', dashBoardRouter);

// Catch 404 and forward to error handler
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

app.use(errorLogger);

// Get port from environment and store in Express.
const {normalizePort, onError, onListening} = require('./utils/serverUtils')
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Listen on provided port, on all network interfaces.
{}
app.listen(port);
app.on('error', onError);
app.on('listening', onListening);

module.exports = app;