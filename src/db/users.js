const db = require('./index');

const createUser = async (username, hashedPassword) => {
  const query =
    'INSERT INTO users(username, password) VALUES($1, $2) RETURNING id';
  return db.one(query, [username, hashedPassword]);
};

const getUserByUsername = async (username) => {
  const query = 'SELECT * FROM users WHERE username = $1';
  return db.oneOrNone(query, [username]);
};

const getAllUsers = async () => {
  const query = 'SELECT id, username FROM users';
  return await db.any(query);
};

module.exports = {
  createUser,
  getUserByUsername,
  getAllUsers
};
