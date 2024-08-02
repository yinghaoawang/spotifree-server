var express = require('express');
const { getRecentlyPlayed, getTopUsers } = require('../db/plays');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ title: 'Spotifree API by Yinghao Wang!' });
});

router.get('/recent', async function (req, res, next) {
  const recent = await getRecentlyPlayed();
  res.json({ recent });
});

router.get('/leaderboard', async function (req, res, next) {
  const topUsers = await getTopUsers();
  res.json({ top_users: topUsers });
});

module.exports = router;
