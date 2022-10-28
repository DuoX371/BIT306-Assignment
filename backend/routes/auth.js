const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

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
  //check if username exist
  if(user === null) return res.status(400).send({login: false, message: 'Invalid Username'})
  //password comparison
  const result = await bcrypt.compare(password, user.password)
  if(!result) return res.status(400).send({login: false, message: 'Username or password is incorrect'})
  const token = jwt.sign(
    JSON.parse(JSON.stringify(user)),
    `some_very_long_secret_and_i_am_trying_to_make_it_even_longer`,
    {expiresIn: 60 * 60}
  )
  return res.status(200).send({login: true, user: user, token: token})
})

router.get('/getAllUsers', checkAuth, async (req, res) => {
  const users = await User.find();
  const list = JSON.parse(JSON.stringify(users));
  list.map((user) => {
    if(user.type !== 'sadmin') return

  })
  return res.status(200).send(users);
})

module.exports = router;
