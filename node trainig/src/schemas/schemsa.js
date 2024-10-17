const joi = require("joi");

const schema = {
  userSchema: joi
    .object()
    .keys({
      name: joi.string().min(2).max(10).required(),
      phone: joi
        .string()
        .pattern(/[6-9]{1}[0-9]{9}/)
        .required()
        .length(10),
      dob: joi.date().max("01-01-2003").iso().required(),
      gender: joi.string().valid("male", "female").required(),
      address: joi
        .object()
        .keys({
          "address-line": joi.string().required(),
          city: joi.string().required(),
          state: joi.string().required(),
          pin: joi.string().length(6).required(),
        })
        .required(),
      hobbies: joi.array().items(joi.string()).required(),
    })
    .options({
      abortEarly: false,
    }),
};

module.exports = schema;
