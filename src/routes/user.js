var express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const { getAllUsers } = require('../db/users');
const { createVideo } = require('../db/videos');
const { createPlay, getUserPlaysByVideoId } = require('../db/plays');
var router = express.Router();

/* GET home page. */
router.get('/', authenticateToken, async function (req, res, next) {
  const users = await getAllUsers();
  res.json({ users });
});

router.post('/add_play', authenticateToken, async function (req, res, next) {
  const { video_id, title, artist_name, duration, art_src } = req.body;
  const { userId } = req.user;
  const video = await createVideo(
    video_id,
    title,
    artist_name,
    duration,
    art_src
  );
  const play = await createPlay(userId, video_id);
  res.json({ video, play });
});

router.post('/get_plays', authenticateToken, async function (req, res, next) {
  const { video_id } = req.body;
  const { userId } = req.user;
  const plays = await getUserPlaysByVideoId(userId, video_id);
  const playCount = plays?.length;
  res.json({ playCount });
});

module.exports = router;
