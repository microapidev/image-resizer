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
      imageExtention: Format.string,
    });
    return validator(schema, req.body, res, next);
  },
};

module.exports = validations;
