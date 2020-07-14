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
  routeValidation: () => (req, res, next) => {
    const schema = Joi.object().keys({
      url: Format.string,
      base64: Format.string,
      width: Format.number,
      height: Format.number,
      format: Format.string,
      top: Format.number,
      left: Format.number,
      angle: Format.number,
    });
    return validator(schema, req.body, res, next);
  },
};

module.exports = validations;
