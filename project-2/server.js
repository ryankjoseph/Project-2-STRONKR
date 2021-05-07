var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require("express-session")
var logger = require('morgan');
var methodOverride = require("method-override");
var flash = require("req-flash");
require('./config/database');

var indexRouter = require('./routes/index');
var stronkrRouter = require('./routes/stronkr');
var activitiesRouter=require("./routes/activities");
var schedulesRouter = require('./routes/schedules');
//var performersRouter = require('./routes/destinations');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: '123' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(methodOverride("_method"));

app.use('/', indexRouter);
app.use('/stronkr', stronkrRouter);
app.use('/activities', activitiesRouter);
app.use("/schedule", schedulesRouter);
//app.use('/', performersRouter);

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

module.exports = app;
