const HttpError = require('../helpers/http-error');
const User = require('../models/user');

//get user by id
const userById = async (req, res, next) => {
  const { userId } = req.params;
  let foundUser;
  try {
    foundUser = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find user',
      500,
    );
    return next(error);
  }
  if (!foundUser) {
    const error = new HttpError(
      'Could not find a user with the provided ID!',
      404,
    );
    return next(error);
  }

  req.profile = foundUser;
  return res.status(200).json({ user: req.profile });
};

exports.userById = userById;
