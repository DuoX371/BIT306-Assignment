const router = require('express').Router();
const User = require('../models/user');

router.use((req, res, next) => { next(); })

router.post('/registerSchoolAdmin', (req, res) => {
  const newSAdmin = new User(req.body);
  newSAdmin.save((err) =>{
    if(err){
      return res.status(400).json(err.errors)
    } else {
      return res.status(200).send({register: true})
    }
  });
})

router.post('/registerVolunteer', (req, res) => {
  const newVolunteer = new User(req.body);
  newVolunteer.save((err) =>{
    if(err){
      return res.status(400).json(err.errors)
    } else {
      return res.status(200).send({register: true})
    }
  });
})

router.post('/login', async (req, res) => {
  const {username, password} = req.body;
  const user = await User.findOne({username: username, password: password});
  console.log(user)
  res.send('ello')
})

module.exports = router;
