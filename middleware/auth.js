const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateToken = async (req, res, next) => {
  const token = req.header("Authorization")?.replace('Bearer ', '');

  if (!token) {
    return (res.status(401).json({ message: "You need to be authenticated to access this resource" }))
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = await User.findById(decoded.userId);

    if (!req.user) {
      return res.status(401).json({
        message: "Invalid token"
      });
    }
    next();
  } catch (error) {
    return (res.status(401).json({ message: "You need to be authenticated to access this resource" }))
  }
}

module.exports = authenticateToken;