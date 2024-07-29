const { body, validationResult } = require('express-validator');

const registerValidation = [
  body('username').isLength({ min: 3 }),
  body('password').isLength({ min: 5 })
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  registerValidation,
  validate
};
