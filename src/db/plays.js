const db = require('./index');

const createPlay = async (user_id, video_id) => {
  const query =
    'INSERT INTO plays(user_id, video_id) VALUES($1, $2) RETURNING id';
  return db.oneOrNone(query, [user_id, video_id]);
};

const getUserPlays = async (user_id) => {
  const query = 'SELECT * FROM plays WHERE user_id = $1';
  return db.any(query, [user_id]);
};

const getUserPlaysByVideoId = async (user_id, video_id) => {
  const query = 'SELECT * FROM plays WHERE user_id = $1 AND video_id = $2';
  return db.any(query, [user_id, video_id]);
};

const getVideoPlays = async (video_id) => {
  const query = 'SELECT * FROM plays WHERE video_id = $2';
  return db.any(query, [video_id]);
};

const getRecentlyPlayed = async (count = 5, interval = '7 days') => {
  const query = `SELECT v.*, COUNT(p.video_id) AS play_count
    FROM plays p JOIN videos v ON p.video_id = v.id
    WHERE p.created_at >= NOW() - INTERVAL $2
    GROUP BY v.id
    ORDER BY play_count DESC
    LIMIT $1`;
  return db.any(query, [count, interval]);
};

module.exports = {
  createPlay,
  getUserPlays,
  getUserPlaysByVideoId,
  getVideoPlays,
  getRecentlyPlayed
};
