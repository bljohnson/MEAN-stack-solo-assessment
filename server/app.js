var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var connectToDB = mongoose.connect('mongodb://localhost:27017/herodb').connection; // no whack in front of 27017 or will create db
var Hero = require('../models/hero'); // require model file that creates heroSchema

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
app.listen(4242, 'localhost', function (req, res) {
  console.log('Now serving 4242');
});

// make public folder static
app.use(express.static('public'));

// base URL; console logs to Atom terminal since coming from server side
app.get('/', function (req, res) {
  console.log('in base URL');
  res.sendFile(path.resolve('views/index.html')); // gets this path and sends to base URL as response
});

// get all heroes in herotrackerdb
app.get('/getHeroes', function(req, res){
  Hero.find()
  .then(function(data){
    res.send(data);
  });
}); // end '/getHeroes' app.get

// create post route to herotrackerdb
app.post('/postHero', function(req, res) {
  console.log('hero posted successfully');
  console.log('req.body = ', req.body);
// creates object to store in herotrackerdb using object received by server, property names need to match those in model schema
  var newHero = new Hero({ // create new Hero to create new instance of Hero model in herotrackerdb, using the following values
    alias: req.body.alias,
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    city: req.body.city,
    power_name: req.body.powerName
  });
// saves object to db; .save is a method specific to Mongoose
  newHero.save(function(err) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log('Hero saved successfully!');
      res.sendStatus(200);
    } // end if/else statement
  }); // end newHero save function
}); // end app.post /postHero route

// delete hero from db
app.post('/deleteHero', function(req, res) {
  console.log('delete route');
  Hero.findOne({'_id': req.body.id}, function (err, hero) {
    if (err) {
      console.log (err);
    } else {
      Hero.remove({'_id': req.body.id}, function (err) {
        if (err) {
          console.log ('remove ' + err);
        }
      }); // end remove function
    } // end if/else statement
  }); // end findOne function
}); // end /deleteHero route
