const mongoose = require('mongoose');
const offerSchema = mongoose.Schema({
  remarks: {type: String, required: true},
  status: {type: String, required: true},
  requestId: {type: String, required: true},
  volunId: {type: String, required: true},
});

module.exports = mongoose.model('Offer', offerSchema);
