const router = require('express').Router();
const checkAuth = require('../middleware/check-auth');
const School = require('../models/school');
const User = require('../models/user');

router.use(checkAuth(['admin', 'sadmin']), (req, res, next) => {
  next();
})

// Get current logged in school admin school
router.get('/getSAdminSchool', async (req, res) => {
  const id = req.query.id;
  if(!id) return res.status(400).send({message: 'id is required'});
  const sadmin = await User.findOne({schoolId: id});
  if(sadmin === null) return res.status(200).send({school: null, message: 'No school found'});
  const school = await School.findOne({_id: sadmin.schoolId});
  return res.send({school: school})
})

router.post('/registerSchool', async (req, res) => {
  const newSchool = new School(req.body);
  const school = await newSchool.save()
  await User.findOneAndUpdate({_id: req.body.sadminId}, {schoolId: school._id});
  res.status(200).send({message: 'School registered successfully', school: school})
})

// manage users
router.get('/getSchoolBySAdminId', async (req, res) => {
  const id = req.query.id;
  if(!id) return res.status(400).send({message: 'id is required'});
  const school = await School.findOne({sadminId: id}).catch(err => {
    return res.status(400).send(err)
  })
  return res.status(200).send(school)
})

module.exports = router;
