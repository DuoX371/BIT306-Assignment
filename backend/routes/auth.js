const router = require('express').Router();
const User = require('../models/user');
const md5 = require('md5');

router.use((req, res, next) => { next(); })

router.post('/registerSchoolAdmin', (req, res) => {
  const newSAdmin = new User(req.body);
  newSAdmin.password = md5(newSAdmin.password);
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
  newVolunteer.password = md5(newVolunteer.password);
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
  const user = await User.findOne({username: username, password: md5(password)});
  if(user === null){
    return res.status(400).send({login: false, message: 'Username or password is incorrect'})
  }
  return res.status(200).send({login: true, user: user})
})

module.exports = router;
