const Joi = require("@hapi/joi");
require("@hapi/joi");

const validator = async (schema, toValidate, res, next) => {
  try {
    await schema.validateAsync(toValidate);
    next();
  } catch (error) {
    return res.status(422).json({
      status: false,
      message: error.message,
    });
  }
};

const Format = {
  string: Joi.string(),
  number: Joi.number(),
};

const validations = {
  resizingValidation: () => (req, res, next) => {
    const schema = Joi.object().keys({
      url: Format.string,
      base64: Format.string,
      width: Format.number,
      height: Format.number,
      format: Format.string,
    });
    return validator(schema, req.query, res, next);
  },
  croppingValidation: () => (req, res, next) => {
    const schema = Joi.object().keys({
      url: Format.string,
      base64: Format.string,
      width: Format.number.required(),
      height: Format.number.required(),
      top: Format.number.required(),
      left: Format.number.required(),
      format: Format.string,
    });
    return validator(schema, req.query, res, next);
  },
  rotationValidation: () => (req, res, next) => {
    const schema = Joi.object().keys({
      url: Format.string,
      base64: Format.string,
      angle: Format.number.required(),
      format: Format.string,
    });
    return validator(schema, req.query, res, next);
  },
};

module.exports = validations;
