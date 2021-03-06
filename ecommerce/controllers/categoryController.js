const Category = require('../models/category');
const { errorHandler } = require('../helpers/dbErrorHandler');

const create = async (req, res, next) => {
  const category = await new Category(req.body);

  try {
    // Save category
    await category.save();
  } catch (err) {
    const error = errorHandler(err);
    return next(error);
  }

  res.status(201).json({ category });
};

exports.create = create;
