const mongoose = require('mongoose');
const GroupSchema = new mongoose.Schema({
    name: String,
    description: String,
    resources: [{ type: mongoose.Schema.Types.ObjectId, ref:'Resource' }]
  });
module.exports = mongoose.model('Group', GroupSchema);
