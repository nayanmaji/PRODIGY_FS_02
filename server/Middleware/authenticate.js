const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).json({ message: 'Access denied. Invalid token.' });
    }
    jwt.verify(token.split(' ')[1], 'secret', (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

  module.exports = authenticate;