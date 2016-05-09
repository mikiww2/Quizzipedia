var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  _id: Number,
  name: String,
  surname: String
});

module.exports = mongoose.model('User', UserSchema); 