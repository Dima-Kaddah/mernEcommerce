const express = require('express');
const router = express.Router();
const { requireSignin } = require('../controllers/authController');
const { userById } = require('../controllers/userController');

router.get('/secret/:userId', requireSignin, userById);

module.exports = router;
