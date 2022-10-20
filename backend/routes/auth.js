const router = require('express').Router();
const User = require('../models/user');

router.use((req, res, next) => { next(); })

router.post('/registerSchoolAdmin', async (req, res) => {
  const newSAdmin = new User(req.body);
  newSAdmin.save((err) =>{
    if(err){
      return res.status(400).json(err.errors)
    } else {
      return res.status(200).send({register: true})
    }
  });
})

module.exports = router;
