const express = require('express');
const { validateSignup } = require('../validator');
const router = express.Router();

const { findById } = require('../controllers/userController');

router.get('/signup', findById);

module.exports = router;
