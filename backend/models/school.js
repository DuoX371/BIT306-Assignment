const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
// refer https://www.npmjs.com/package/mongoose-unique-validator

const schoolSchema = mongoose.Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  city: {type: String, required: true},
  sadminId: {type: String, required: true},
})

// schoolSchema.plugin(uniqueValidator)

module.exports = mongoose.model('School', schoolSchema)
