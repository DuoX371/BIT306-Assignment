const router = require('express').Router();
const Offer = require('../models/offer')
const User = require('../models/user')
const checkAuth = require('../middleware/check-auth')
const transporter = require('../nodemailer').transporter;

router.use((req, res, next) => {
  next();
})
// Get current logged in school admin school
router.get('/getOfferByRequestId', checkAuth('sadmin'), async (req, res) => {
  const id = req.query.id;
  if(!id) return res.status(400).send({message: 'id is required'});
  let offers = await Offer.aggregate([
    {
      $lookup: {
        from: 'users',
        let: { 'userId': {$toObjectId: "$volunId"} },
        pipeline: [
          { $match: { $expr: { $eq: [ "$_id", "$$userId" ] } } },
          { $project: { _id: 0, username: 1, fullname: 1, email: 1, occupation: 1, phone: 1, dateofbirth: 1 } }
        ],
        as: 'user'
      }
    },
    {$unwind: "$user"},
    {$match: {requestId: id}}
  ])
  offers = offers.map(o => {
    const obj = {
      volunteer: o.user.fullname,
      age: new Date().getFullYear() - parseInt(o.user.dateofbirth.split('-')[0]),
      occupation: o.user.occupation
    }
    return {...o, ...obj}
  })
  return res.send(offers)
})

router.post('/approveOffer', checkAuth('sadmin'), async (req, res) => {
  const id = req.body.id;
  if(!id) return res.status(400).send({message: 'id is required'});
  await Offer.findOneAndUpdate({_id: id}, {status: 'ACCEPTED'}, {new: true});
  //NOTIFIY THEIR EMAIL
  const offer = await Offer.findOne({_id: id})
  const volun = await User.findOne({_id: offer.volunId})
  const info = await transporter.sendMail({
    from: '"Tetratheos" <choojiahan@gmail.com>', // sender address
    to: volun.email, // list of receivers
    subject: `Offer Accepted #${offer._id}`, // Subject line
    text: `Hello ${volun.fullname}. I would like to inform you that your offer for #${offer._id} has been accepted.`, // plain text body
  }).catch(err => console.log(err))
  // Send to the school admin that approve
  const info2 = await transporter.sendMail({
    from: '"Tetratheos" <choojiahan@gmail.com', // sender address
    to: res.userData.email, // list of receivers
    subject: `Offer Accepted #${offer._id}`, // Subject line
    text: `Hello ${res.userData.fullname}. You have accepted the offer #${offer._id} by user ${volun.fullname}.`, // plain text body
  }).catch(err => console.log(err))
  console.log(info)
  console.log(info2)
  // Add a loader to the frontend
  return res.status(200).send({message: 'Offer accepted'});
})

router.get('/getMyOffers', checkAuth('volunteer'), async (req, res) => {
  const id = req.query.userId;
  if(!id) return res.status(400).send({message: 'id is required'});
  const offers = await Offer.aggregate([
    {
      $lookup: {
        from: 'requests',
        let: { 'requestId': {$toObjectId: "$requestId"} },
        pipeline: [
          { $match: { $expr: { $eq: [ "$_id", "$$requestId" ] } } },
          { $project: { _id: 0, description: 1, date: 1, time: 1} }
        ],
        as: 'request'
      }
    },
    {$unwind: "$request"},
    {$match: {volunId: id}}
  ])
  res.status(200).send(offers)
})

router.post('/addOffer', checkAuth('volunteer'), async (req, res) => {
  const newOffer = new Offer(req.body);
  const offerCheck = await Offer.findOne(
    {requestId: req.body.requestId, volunId: req.body.volunId},
  );

  if (offerCheck != null){
    return res.status(400).send({data: "Error"});
  }
  newOffer.save().then((result) => {
    return res.status(200).send(result);
  }).catch((err) => {
    return res.status(500).send(err);
  })
}
)

module.exports = router;
