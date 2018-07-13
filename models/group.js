var mongoose = require('mongoose');
var GroupSchema = new mongoose.Schema({
    name: String,
    description: String,
    users: [String],
    resources: [String]
  });
//module.exports = mongoose.model('Group', GroupSchema);
