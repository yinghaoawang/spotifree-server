var express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const { getAllUsers } = require('../db/users');
var router = express.Router();

/* GET home page. */
router.get('/', authenticateToken, async function (req, res, next) {
  const users = await getAllUsers();
  res.json({ users });
});

module.exports = router;
