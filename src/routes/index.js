var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ title: 'Spotifree API by Yinghao Wang!' });
});

module.exports = router;
