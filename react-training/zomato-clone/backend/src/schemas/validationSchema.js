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
      image: joi.string(),
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
  reastaurantSchema: joi
    .object()
    .keys({
      restaurantAddressDetails: joi
        .object()
        .keys({
          area: joi.string().required(),
          city: joi.string().required(),
          landmark: joi.string().empty(""),
          shop: joi.string().required(),
        })
        .required(),
      ownerId: joi.string().required(),
      restaurantName: joi.string().required(),
      timing: joi
        .array()
        .items(
          joi
            .object()
            .keys({
              startTime: joi.string().required(),
              endTime: joi.string().required(),
            })
            .required()
        )
        .required(),
      ownerDetails: joi
        .object()
        .keys({
          email: joi.string().empty(""),
          fullName: joi.string().required(),
          phone: joi.string().required(),
        })
        .required(),

      documents: joi.object().keys({
        panNo: joi.string().required(),
        restaurantImage: joi.string().required(),
        GSTNo: joi.string().required(),
      }),
    })
    .options({
      abortEarly: false,
    }),
  menuItem: joi
    .object()
    .keys({
      description: joi.string().required(),
      foodCategory: joi.string().required(),
      isActive: joi.boolean(),
      price: joi.number().required(),
      title: joi.string().required(),
    })
    .required(),
};

export default schema;
