const jwt = require('jsonwebtoken')

// users can be string or array format
// leave empty if anyone can use it
module.exports = (users) =>{
  return (req, res, next) => {
    try {
      let token = req.get('authorization')
      if(token === undefined) throw new Error('Invalid method', 'test')
      token = token.split(' ')[1]
      const decoded = jwt.verify(token, "some_very_long_secret_and_i_am_trying_to_make_it_even_longer");
      res.userData = decoded;
      if(users === undefined) return next();
      if(users.constructor === Array) {
        if(!users.includes(decoded.type)) throw new Error('User does not have permission')
      }else {
        if(users !== decoded.type) throw new Error('User does not have permission')
      }
      next();
    } catch (error) {
      // console.log(error)
      res.status(401).json({ message: "Auth failed!" , error: error.message});
    }
  }
}
