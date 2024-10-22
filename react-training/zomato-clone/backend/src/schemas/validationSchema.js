import joi from "joi";

const schema = {
  signInSchema: joi.object().keys({
    phone: joi
      .string()
      .pattern(/[0-9]{12}/)
      .length(12)
      .required(),
  }),
  userAddressSchema: joi
    .object()
    .keys({
      address: joi
        .object()
        .keys({
          address: joi.string().required(),
          addressType: joi.string().required(),
          city: joi.string().required(),
          state: joi.string().required(),
          pin: joi.string().length(6).required(),
          name: joi.string().required(),
          phone: joi.string().required(),
          default: joi.boolean(),
          id: joi.string(),
        })
        .required(),
    })
    .options({
      abortEarly: false,
    }),
  userSchema: joi
    .object()
    .keys({
      name: joi.string().min(2).max(20).required(),
      phone: joi
        .string()
        .pattern(/[0-9]{12}/)
        .required()
        .length(12),
      isReastaurant: joi.boolean(),
      city: joi.string().required(),
    })
    .options({
      abortEarly: false,
    }),
};

export default schema;
