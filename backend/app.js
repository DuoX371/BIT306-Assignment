const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const mongoose = require('mongoose')

// connect to the database
require('./db')()

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})

app.get('/', async (req, res) => {
  res.status(200).send(`Hello World`)
})

// Import all the routes here
app.use('/api/index', require('./routes/index'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/school', require('./routes/school'))

module.exports = app;
