const express = require('express')
const fetch = require('node-fetch')
const app = express()

app.get('/', async (req, res) => {
  // res.status(400).send(`Hello World`)
  res.send(`Server is up and running`)
})

// Import all the routes here
app.use('/api/index', require('./routes/index'))
app.use('/api/auth', require('./routes/auth'))

module.exports = app;
