const { check } = require('express-validator');

const validateCreatePost = [
  check('title').not().isEmpty().isLength({ min: 4, max: 150 }),
  check('body').not().isEmpty().isLength({ min: 4, max: 2000 }),
];

module.exports = validateCreatePost;
