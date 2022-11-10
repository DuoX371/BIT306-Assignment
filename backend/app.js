const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var cors = require('cors');

// connect to the database
require('./db')()

app.use(bodyParser.json())
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
})

app.get('/', async (req, res) => {
  res.status(200).send(`Hello World`)
})

// Import all the routes here
app.use('/api/auth', require('./routes/auth'))
app.use('/api/school', require('./routes/school'))
app.use('/api/request', require('./routes/request'))
app.use('/api/offer', require('./routes/offer'))

module.exports = app;
