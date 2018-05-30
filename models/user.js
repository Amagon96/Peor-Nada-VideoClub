const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const schema = Schema({
  name: String,
  lastName: String,
  email: String,
  password: String,
  saltKey: String
});

schema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', schema);
