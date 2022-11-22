const mongoose = require('mongoose');
const username = 'tetratheos';
const password = 'tetratheos123';
const db = 'bit-306'

module.exports = () => {
  const uri = `mongodb+srv://${username}:${password}@cluster0.komisgc.mongodb.net/${db}?retryWrites=true&w=majority`
  return mongoose.connect(uri).then((e) => {
    console.log('Connected to database!')
  }).catch((e) => {
    console.log(e)
    console.log('Connection failed!')
  })
}
