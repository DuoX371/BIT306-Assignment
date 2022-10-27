const router = require('express').Router();
const User = require('../models/user');

// Password encryption
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.use((req, res, next) => { next(); })

router.post('/registerSchoolAdmin', async (req, res) => {
  const newSAdmin = new User(req.body);
  newSAdmin.password = await bcrypt.hash(newSAdmin.password, saltRounds)
  newSAdmin.save((err) =>{
    if(err){
      return res.status(400).json(err.errors)
    } else {
      return res.status(200).send({register: true})
    }
  });
})

router.post('/registerVolunteer', async (req, res) => {
  const newVolunteer = new User(req.body);
  newVolunteer.password = await bcrypt.hash(newVolunteer.password, saltRounds)
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
  const user = await User.findOne({username: username});
  if(user === null) return res.status(400).send({login: false, message: 'Invalid Username'})
  // console.log
  //password comparison
  const result = await bcrypt.compare(password, user.password)
  if(!result) return res.status(400).send({login: false, message: 'Username or password is incorrect'})
  return res.status(200).send({login: true, user: user})
})

router.get('/getAllUsers', async (req, res) => {
  const users = await User.find();
  const list = JSON.parse(JSON.stringify(users));
  list.map((user) => {
    if(user.type !== 'sadmin') return

  })
  return res.status(200).send(users);
})

module.exports = router;
