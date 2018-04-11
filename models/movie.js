const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const schema = Schema({
  title: String,
  genre: String,
  duration: Number,
  director: String,
  actors: [String]
});

schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Movie', schema);
