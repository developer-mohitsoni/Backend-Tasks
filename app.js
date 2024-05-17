var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const multer = require("multer");

const bodyParser = require("body-parser");

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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

// error handler for multer
app.use((error,req,res,next)=>{
  if(error instanceof multer.MulterError){
    if(error.code === "LIMIT_FILE_SIZE"){
      return res.status(400).json({message: "file is too large"});
    }
    if(error.code === "LIMIT_FILE_COUNT"){
      return res.status(400).json({message: "File limit reached"});
    }
    if(error.code === "LIMIT_UNEXPECTED_FILE"){
      return res.status(400).json({
        message: "File must be an image",
      });
    }
  }
})

module.exports = app;
