const router = require('express').Router();
const User = require('../models/user');
const Request = require('../models/request');

router.use((req, res, next) => {
  next();
})

router.post('/submitRequest', async (req, res) => {
  const newRequest = new Request(req.body);
  newRequest.save().then((result) => {
    return res.status(200).send(result);
  }).catch((err) => {
    return res.status(500).send(err);
  })
})

module.exports = router;
