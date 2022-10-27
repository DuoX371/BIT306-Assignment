const mongoose = require('mongoose');
const username = 'tetratheos';
const password = 'tetratheos123';
const db = 'bit-306'

module.exports = () => {
  const uri = `mongodb+srv://${username}:${password}@cluster0.komisgc.mongodb.net/${db}?retryWrites=true&w=majority`
  return mongoose.connect(uri).then(() => {
    console.log('Connected to database!')
  }).catch(() => {
    console.log('Connection failed!')
  })
}
