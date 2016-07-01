var mongoose = require('mongoose');
var Schema = mongoose.Schema; // enable use of schema property

// create heroSchema with chosen fields and data type, let MongoDB handle generating _id for each instance
var heroSchema = new Schema ({
  alias: {type: String},
  first_name: {type: String},
  last_name: {type: String},
  city: {type: String},
  power_name: {type: String}
}); // end heroSchema

var Hero = mongoose.model('heroes', heroSchema); // creates model from heroSchema called Hero, and stores in heroes 'collection' (use all lowercase and plural for name) of docs within herodb

module.exports = Hero;
