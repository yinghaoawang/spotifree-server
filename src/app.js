var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var protectedRoutes = require('./routes/protected');
var authRoutes = require('./routes/auth');
var userRouter = require('./routes/user');
var searchRouter = require('./routes/search');
const { registerValidation, validate } = require('./utils/validators');

var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', registerValidation, validate, authRoutes);
app.use('/protected', protectedRoutes);

app.use('/user', userRouter);
app.get('/users', (req, res, next) => {
  req.url = '/';
  userRouter.handle(req, res, next);
});

app.use('/search', searchRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
