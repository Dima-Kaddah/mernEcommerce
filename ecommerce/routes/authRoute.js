const express = require('express');
const { validateSignup } = require('../validator');
const router = express.Router();

const {
  signUp,
  signIn,
  signOut,
  requireSignin,
} = require('../controllers/authController');

router.post('/signup', validateSignup, signUp);
router.post('/signin', signIn);
router.get('/signout', signOut);

module.exports = router;
