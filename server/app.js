var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

var routes = require('./routes/index');
var cars = require('./routes/carRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/cars', cars);

// this code is deprecated
// we want to ultimately call CitationsController.show
app.get('/get_citations/:prof/:name', function (req, res) {
  const data = require('./json/' + req.params.prof + '/' + req.params.name + '.json')
  res.json(data);
});

module.exports = app;


