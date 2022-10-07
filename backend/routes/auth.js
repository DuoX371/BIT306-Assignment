const router = require('express').Router();
const fetch = require('node-fetch')
router.use((req, res, next) => { next(); })


module.exports = router;
