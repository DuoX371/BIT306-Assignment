const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
  description: {type: String, required: true},
  date: {type: String, required: true},
  time: {type: String, required: true},
  studentLevel: {type: String, required: true},
  expectedStudents: {type: Number, required: true},
  status: {type: String, required: true},
  sadminId: {type: String, required: true},
  requestDate: {type: String, required: true},
  offers: {type: Number, required: false}
});

module.exports = mongoose.model('Request', requestSchema);
