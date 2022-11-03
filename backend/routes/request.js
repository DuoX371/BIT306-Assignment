const router = require('express').Router();
const Request = require('../models/request');
const Offer = require('../models/offer');
const checkAuth = require('../middleware/check-auth');

router.use((req, res, next) => {
  next();
})

//sadmin creates a new request
router.post('/submitRequest', checkAuth('sadmin'), async (req, res) => {
  const newRequest = new Request(req.body);
  newRequest.save().then((result) => {
    return res.status(200).send(result);
  }).catch((err) => {
    return res.status(500).send(err);
  })
})

//home page gets all new requests
router.get('/getAllNewRequests', async (req, res) => {
  const request = await Request.aggregate([
    {
      $lookup: {
        from: 'users',
        let: { 'userId': {$toObjectId: "$sadminId"} },
        pipeline: [
          { $match: { $expr: { $eq: [ "$_id", "$$userId" ] } } },
          { $project: { _id: 0, schoolId: 1 } }
        ],
        as: 'user'
      },
    },
    {$unwind: "$user"},
    {
      $lookup: {
        from: 'schools',
        let: { 'schoolId': {$toObjectId: "$user.schoolId"} },
        pipeline: [
          { $match: { $expr: { $eq: [ "$_id", "$$schoolId" ] } } },
          { $project: { name: 1, address: 1, city: 1 } }
        ],
        as: 'school'
      },
    },
    {$unwind: "$school"},
    {$match: {status: 'NEW'}
    }
  ]).catch((err) => {
    return res.status(500).send(err);
  })
  for(let i = 0; i < request.length; i++) {
    const r = request[i];
    r.city = r.school.city;
    r.school = r.school.name;
    if(req.query.userId){
      const offer = await Offer.findOne({requestId: r._id, volunId: req.query.userId})
      r.offerStatus = offer === null ? 'no' : 'yes';
    }
  }
  return res.status(200).send(request);
});

//sadmin get self requests
router.get('/getSelfRequest', checkAuth('sadmin'), async (req, res) => {
  const request = await Request.find({sadminId: req.query.sadminId}).catch((err) => {
    return res.status(500).send(err);
  })
  for(let i = 0; i < request.length; i++){
    const r = request[i];
    let offer = await Offer.find({requestId: r._id})
    r['offers'] = offer.length
    r.time = `${parseInt(r.time.split(':')[0]) > 12 ? parseInt(r.time.split(':')[0]) - 12 : parseInt(r.time.split(':')[0])}:${r.time.split(':')[1]} ${parseInt(r.time.split(':')[0]) >= 12 ? 'PM' : 'AM'}`;
  }
  return res.status(200).send(request);
})

//sadmin close the request
router.post('/closeRequest', checkAuth('sadmin'), async (req, res) => {
  const { requestId, userId } = req.body;
  if(!requestId) return res.status(400).send({message: 'requestId is required'});
  if(!userId) return res.status(400).send({message: 'userId is required'});
  const request = await Request.findOneAndUpdate({ _id: requestId, sadminId: userId }, { status: 'CLOSED' }, { new: true }).catch((err) => {
    return res.status(500).send(err);
  })
  return res.status(200).send(request);
})

module.exports = router;
