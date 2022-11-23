const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
// refer https://www.npmjs.com/package/mongoose-unique-validator

const userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}, // Min length validation should be done before password is encrypted
  type: {type: String, required: true},
  // volun/schooladmin
  fullname: {type: String, required: false},
  email: {type: String, required: false, unique: true},
  phone: {type: String, required: false},
  // volun
  occupation: {type: String, required: false},
  dateofbirth: {type: String, required: false},
  // schooladmin
  staffid: {type: String, required: false},
  position: {type: String, required: false},
  schoolId: {type: String, required: false},
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
