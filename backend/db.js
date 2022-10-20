const mongoose = require('mongoose');

module.exports = () => {
  const uri = `mongodb+srv://tetratheos:tetratheos123@cluster0.komisgc.mongodb.net/bit-306?retryWrites=true&w=majority`
  return mongoose.connect(uri).then(() => {
    console.log('Connected to database!')
  }).catch(() => {
    console.log('Connection failed!')
  })
}
