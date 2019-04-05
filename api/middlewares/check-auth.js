const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // get the part with the encoded string of the array splitted
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch(err) {
    return res.status(401).json({ message: 'Auth Failed' }); // return 401 if fail
  }
}