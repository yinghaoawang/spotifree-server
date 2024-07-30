const db = require('./index');

const createVideo = async (video_id, title, artist_name, duration, art_src) => {
  const query =
    'INSERT INTO videos(id, title, artist_name, duration, art_src) VALUES($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING RETURNING id ';
  return db.oneOrNone(query, [video_id, title, artist_name, duration, art_src]);
};

module.exports = { createVideo };
