var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
require('dotenv').config({ path: `${__dirname}/../.env` });
const config = require("./config.js");

const upload = require('./upload');
const cors = require('cors');
const mongoose = require('mongoose');

const url = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

var routes = require('./routes/index');
var users = require('./routes/userRoutes');
var courses = require('./routes/courseRoutes');
var assignments = require('./routes/assignmentRoutes');
var papers = require('./routes/paperRoutes');
var citations = require('./routes/citationRoutes');
var rubrics = require('./routes/rubricRoutes');
var feedback = require("./routes/feedbackRoutes");

var app = express();

//this line is just for the file uypload test
app.engine('html', require('ejs').renderFile);

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};

if (app.get('env') === 'production') {
  app.use(logger('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
  }));
} else {
  app.use(logger('dev'));
}

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/upload', upload);

app.use('/', routes);
app.use('/users', users);
app.use('/courses', courses);
app.use('/assignments', assignments);
app.use('/papers', papers);
app.use('/citations', citations);
app.use('/rubrics', rubrics);
app.use('/feedback', feedback);


if (app.get('env') === 'production') {
  app.get('*', (req, res) => {
    console.log(path.join(__dirname + '/../client/build/index.html'));
    res.sendFile(path.join(__dirname + '/../client/build/index.html'));
  });
}

module.exports = app;


