const router = require('express').Router();
const Request = require('../models/request');
const Offer = require('../models/offer');

router.use((req, res, next) => {
  next();
})

router.post('/submitRequest', async (req, res) => {
  const newRequest = new Request(req.body);
  newRequest.save().then((result) => {
    return res.status(200).send(result);
  }).catch((err) => {
    return res.status(500).send(err);
  })
})

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
  request.map((r) =>{
    r['city'] = r.school.city
    r['school'] = r.school.name
  })
  return res.status(200).send(request);
});

 // this.requests = this.requests.map(r => {
    //   const school = this.requestService.getSchoolByRequestID(r.id)
    //   r['school'] = school.name;
    //   r['city'] = school.city;
    //   if(this.authService.getCurrentUser()?.type === 'volunteer'){
    //     r['offerStatus'] = this.offerSerivce.getUserOffer(r.id) === undefined ? 'no' : 'yes';
    //   }
    //   return r;
    // })


router.get('/getSelfRequest', async (req, res) => {
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


module.exports = router;
