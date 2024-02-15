const { isValidObjectId } = require('mongoose');
const { HttpError } = require('../helpers');

const isValidBreedId = (req, res, next) => {
  const id = req.params.breedId;
  if (!isValidObjectId(id)) {
    next(HttpError(404, `${id} is not a valid id format`));
  }
  next();
};

module.exports = isValidBreedId;
