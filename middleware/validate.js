const validator = require('express-validator');

const validate = (req, res, next) => {
  const errors = validator.validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(400).json({
    success: false,
    message: 'Validation failed',
    errors: extractedErrors,
  });
};

module.exports = {
  validate
};
