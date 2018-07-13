var mongoose = require('mongoose');
var GroupSchema = new mongoose.Schema({
    name: String,
    description: String,
    resources: [String]
  });
module.exports = mongoose.model('Group', GroupSchema);
