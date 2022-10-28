const router = require('express').Router();
const Offer = require('../models/offer')

router.use((req, res, next) => {
  next();
})

// Get current logged in school admin school
router.get('/getOfferByRequestId', async (req, res) => {
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

router.post('/approveOffer', async (req, res) => {
  const id = req.body.id;
  if(!id) return res.status(400).send({message: 'id is required'});
  await Offer.findOneAndUpdate({_id: id}, {status: 'APPROVED'}, {new: true});
  //NOTIFIY THEIR EMAIL
  return res.status(200).send({message: 'Offer approved'});
})

module.exports = router;
