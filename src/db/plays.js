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

module.exports = {
  createPlay,
  getUserPlays,
  getUserPlaysByVideoId,
  getVideoPlays
};
