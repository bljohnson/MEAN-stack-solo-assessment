var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var connectToDB = mongoose.connect('mongodb://localhost:/27017/DATABASENAMEGOESHERE!!!!!').connection;

// middleware
app.use(bodyParser.json()); // parse text as JSON to req.body

// test db connection
connectToDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});
connectToDB.once('open', function () {
  console.log('mongodb connection open!');
});

// spin up server
app.listen(3000, 'localhost', function (req, res) {
  console.log('Now serving 3000');
});

// make public folder static
app.use(express.static('public'));

// base URL; console logs to Atom terminal since coming from server side
app.get('/', function (req, res) {
  console.log('in base URL');
  res.sendFile(path.resolve('views/index.html')); // gets this path and sends to base URL as response
});
