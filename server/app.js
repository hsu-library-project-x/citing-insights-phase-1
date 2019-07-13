//Some comments are from https://github.com/passport/express-4.x-facebook-example/blob/master/server.js
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const upload = require('./upload');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

var routes = require('./routes/index');
var users = require('./routes/userRoutes');
var courses = require('./routes/courseRoutes');
var assignments = require('./routes/assignmentRoutes');
var papers = require('./routes/paperRoutes');
var citations = require('./routes/citationRoutes');

var app = express();

const passport = require('passport');

const Strategy = require('passport-google-oauth20').Strategy;

const user = require("./models/userModel");

const GOOGLE_CLIENT_ID = "203897182687-719pq9jrvlgksp6ej5hvoiugf5ofjd6n.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "SrRjyLv81h4HtIJcbvgCZaPT";

// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.

passport.use(new Strategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/return'
},
function(accessToken, refreshToken, profile, cb) {
  // In this example, the user's Facebook profile is supplied as the user
  // record.  In a production-quality application, the Facebook profile should
  // be associated with a user record in the application's database, which
  // allows for account linking and authentication with other identity
  // providers.
  return cb(null, profile);
}));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  user.findById(id).then(foundUser => {
    done(null, foundUser);
  });
});

//this line is just for the file uypload test
app.engine('html', require('ejs').renderFile);

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors(corsOptions));

app.post('/upload', upload);

app.use('/', routes);
app.use('/users', users);
app.use('/courses', courses);
app.use('/assignments', assignments);
app.use('/papers', papers);
app.use('/citations', citations);



app.get('/login/google',
  passport.authenticate('google'));

app.get('/return', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/login',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });



  
// this delivers a test uploader page
app.get('/file_upload', function (req, res) {
  res.render('test.html');
})

/* this code is deprecated
// we want to ultimately call CitationsController.show
app.get('/get_citations/:prof/:name', function (req, res) {
  const data = require('./json/' + req.params.prof + '/' + req.params.name + '.json')
  res.json(data);
}); */

module.exports = app;


