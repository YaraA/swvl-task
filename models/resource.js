const mongoose = require('mongoose');
const ResourceSchema = new mongoose.Schema({
    name: String
  });
module.exports = mongoose.model('Resource', ResourceSchema);
