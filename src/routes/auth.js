const express = require('express');
const bcrypt = require('bcryptjs');
const { createUser, getUserByUsername } = require('../db/users');
const logger = require('../utils/logger');
const { generateToken } = require('../utils/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, hashedPassword);
    logger.info(`User registered successfully: ${username}`);
    res.status(201).json({ userId: user.id });
  } catch (error) {
    logger.error(`Error registering user ${username}: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = generateToken(user.id);
    logger.info(`User logged in successfully: ${username}`);
    res.json({ token });
  } catch (error) {
    logger.error(`Error logging in user ${username}: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
