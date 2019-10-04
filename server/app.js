//Some comments are from https://github.com/passport/express-4.x-facebook-example/blob/master/server.js
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

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
var rubrics = require('./routes/rubricRoutes');
var feedback = require("./routes/feedbackRoutes");

var app = express();
var router = express.Router();




//this line is just for the file uypload test
app.engine('html', require('ejs').renderFile);

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('/home/citing_insights/citing-insights-phase-1/client/build/'));



app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/upload', upload);

app.use('/users', users);
app.use('/courses', courses);
app.use('/assignments', assignments);
app.use('/papers', papers);
app.use('/citations', citations);
app.use('/rubrics', rubrics);
app.use('/feedback', feedback);

// this delivers a test uploader page
app.get('/file_upload', function (req, res) {
  res.render('test.html');
})

app.get('*', (req, res) => {

  console.log(req);
  console.log(res);
  console.log(path.join(__dirname + '../../client/build/index.html'));
  res.sendFile(path.join(__dirname + '../../client/build/index.html'));
});


module.exports = app;


