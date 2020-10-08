const formidable = require('formidable');
const _ = require('lodash');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

const create = async (req, res, next) => {
  const product = await new Product(req.body);

  try {
    // Save category
    await product.save();
  } catch (err) {
    const error = errorHandler(err);
    return next(error);
  }

  res.status(201).json({ product });
};

exports.create = create;
