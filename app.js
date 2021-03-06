require('../dotenv').config(); 
const createError = require('http-errors');
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport')
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require('body-parser'); 
// const seedPost = require('./seeds');
// seedPost();

//Models
const User = require('./models/user');

//Require routes
const indexRouter     = require('./routes/index');
const postsRouter     = require('./routes/posts');
const reviewsRouter   = require('./routes/reviews');

const app = express();

//Connect to the database
// let uri = 'mongodb://localhost:27017/surf-shop-mapbox'
let uri = 'mongodb://localhost:27017/surf-shop'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log("You're connected to mongoDB!");
})

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

 //set public assets directory
 app.use(express.static('public'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

//Configure passport and sessions
app.use(session({
  secret: 'this is a secret',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//set local variables middleware
app.use((req, res, next) => {
  req.user = {
    '_id' : '604531adc440b13379afa41b', //'603c11a280e116234843efb3',
    'username' : 'test3',//'test1'
  };
  res.locals.currentUser = req.user;
  //set default page title
  res.locals.title = 'Surf Shop';
  //set success flash message
  res.locals.success = req.session.success || '';
  delete req.session.success;
  //set error flash message
  res.locals.error = req.session.error || '';
  delete req.session.error;
  next();
});

//Mount routes
app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/reviews', reviewsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  console.log(err);
  req.session.error = err.message;
  res.redirect('back');
});

module.exports = app;