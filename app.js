
require('dotenv').config();
global.db = require('./database');
var express = require('express');
var app = express();
const path = require('path');

const securityBack = require('./security center/back/securityBack');
const securityFront = require('./security center/front/securityFront');
const securityUsers = require('./security center/users/securityUsers');
const securityBridge = require('./security center/link/securityBridge');
const securityDb = require('./security center/db/securityDb');
const securityPerformance = require('./security center/performance/securityPerformance');
const ipStore = require('./security center/shared/ipStore');
const faviconPath = path.join(__dirname, 'public', 'logo.png');



var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', true);
app.disable('x-powered-by');

app.get('/favicon.ico', (req, res) => {
  res.sendFile(faviconPath);
});

securityDb.runStartupChecks();

// Cadeia de segurança centralizada
app.use(ipStore.ipCapture('entry'));
app.use(securityPerformance.measureResponse());
app.use(securityBridge.enforceAllowedOrigins());
app.use(securityBack.basicHardening());
app.use(securityBack.rateLimitBack());
app.use(securityUsers.guardSensitive());
app.use(securityUsers.rateLimitAuth());
app.use(securityFront.frontHeaders());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Rotas
// health check
app.get('/health', function(req, res){
  res.status(200).send('OK');
});



module.exports = app;
