var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    groups: [String],
    resources: [String]
  });
//module.exports = mongoose.model('User', UserSchema);
