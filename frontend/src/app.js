const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');

const path = require('path');
const backendPath = path.join(__dirname, '..', '..', 'backend');

// Setup middlewares
// Requests logger
const { logger } = require(path.join(backendPath, 'middleware', 'logger'));

// Error logger
const errorLogger = require(path.join(backendPath, 'middleware', 'errorHandler'));

// Cross-origin resource sharing
const cors = require('cors');
const corsOptions = require(path.join(backendPath, 'config', 'corsOptions'));

// Setup all routers
const homeRouter = require(path.join(backendPath, 'routes', 'home'));
const loginRouter = require(path.join(backendPath, 'routes', 'login'));
const registerRouter = require(path.join(backendPath, 'routes', 'register'));
const authenticateRouter = require(path.join(backendPath, 'routes', 'authenticate'));
const dashBoardRouter = require(path.join(backendPath, 'routes', 'dashboard'));;

const app = express();

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger);
app.use(cors(corsOptions));

// Built-in middleware to parses incoming requests with JSON payloads
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// Static middleware
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
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error', {title: '404 Not Found'});
});

app.use(errorLogger);

module.exports = app;