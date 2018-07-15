const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    groups: [String],
    resources: [String]
  });
module.exports = mongoose.model('User', UserSchema);
