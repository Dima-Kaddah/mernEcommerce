const findById = async (req, res, next) => {};

// //get user by id
// const getUserById = async (req, res, next) => {
//   const { userId } = req.params;
//   let foundUser;
//   try {
//     foundUser = await User.findById(userId);
//   } catch (err) {
//     const error = new HttpError(
//       'Something went wrong, could not find user',
//       500,
//     );
//     return next(error);
//   }
//   if (!foundUser) {
//     const error = new HttpError(
//       'Could not find a user with the provided ID!',
//       404,
//     );
//     return next(error);
//   }
//   // Make "id" property available
//   const modifiedUser = foundUser.toObject({ getters: true });
//   return res.status(200).json(modifiedUser);
// };

exports.findById = findById;
