const router = require('express').Router();

router.use((req, res, next) => {
  next();
})

// Example api get request
router.get('/', async (req, res) => {
  res.send('Hello World')
})

module.exports = router;
