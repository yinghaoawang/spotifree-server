const { verifyToken } = require('../utils/auth');
const logger = require('../utils/logger');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null)
    return res.status(401).json({ error: 'No token provided' });

  const user = verifyToken(token);
  if (user == null) {
    logger.warn('Failed to authenticate token');
    return res.status(440).json({ error: 'Invalid token' });
  }

  req.user = user;
  next();
};

module.exports = authenticateToken;
