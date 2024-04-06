const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_TOKEN || 'Test';

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token[0]) {
    return res.status(401).send({ msg: 'Token is missing' });
  }
  // Extract the token from the Authorization header if present
  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).send({ msg: 'Invalid token format' });
  }

  jwt.verify(tokenParts[1], secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ msg: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

