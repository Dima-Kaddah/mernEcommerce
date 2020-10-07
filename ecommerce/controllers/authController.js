const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { errorHandler } = require('../helpers/dbErrorHandler');
const HttpError = require('../helpers/http-error');
const User = require('../models/user');

const signUp = async (req, res, next) => {
  const user = await new User(req.body);

  try {
    // Save user
    await user.save();
  } catch (err) {
    const error = errorHandler(err);
    return next(error);
  }

  // const modifiedUser = newUser.toObject({ getters: true });
  user.salt = undefined;
  user.hashed_password = undefined;

  res.status(201).json({ user });
};

// login signIn the user
const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  let identifiedUser;
  let isPasswordCorrect;
  try {
    // Check if user exists
    identifiedUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, check your credentials and try again!',
      500,
    );
    return next(error);
  }

  if (!identifiedUser || !identifiedUser.authenticate(password)) {
    const error = new HttpError('Credentials are incorrect!', 403);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: identifiedUser.id, email: identifiedUser.email },
      process.env.JWT_SECRET,
    );
    res.cookie('T', token, { expire: new Date() + 9999 });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, check your credentials and try again!',
      500,
    );
    return next(error);
  }

  const modifiedUser = identifiedUser.toObject({ getters: true });
  res.status(200).json({
    token,
    user: {
      userId: modifiedUser.id,
      name: modifiedUser.name,
      email: modifiedUser.email,
      role: modifiedUser.role,
    },
  });
};

//signOut user
const signOut = async (req, res, next) => {
  try {
    await res.clearCookie('T');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, cant siginout, please try again!',
      500,
    );
    return next(error);
  }

  res.json({ message: 'Signout Success' });
};

const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'], // added later
  userProperty: 'auth',
});

exports.signUp = signUp;
exports.signIn = signIn;
exports.signOut = signOut;
exports.requireSignin = requireSignin;
