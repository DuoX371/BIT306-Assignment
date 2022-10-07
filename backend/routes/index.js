const router = require('express').Router();
const fetch = require('node-fetch')

router.use((req, res, next) => {
  next();
})

// Example api get request
router.get('/', async (req, res) => {
  const result = await fetch('https://jsonplaceholder.typicode.com/todos/1').then(res => res.json())
  return res.send(result)
})

module.exports = router;
