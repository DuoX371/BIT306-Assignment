const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "some_very_long_secret_and_i_am_trying_to_make_it_even_longer");
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: "Auth failed!" });
  }
}
