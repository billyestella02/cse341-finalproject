import Joi from "joi";

let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const userSchema = Joi.object({
    firstName: Joi.string().min(3).required(),

    lastName: Joi.string().min(3).required(),

    mobile: Joi.string().max(13).required(),

    email: Joi.string().email().lowercase().required(),

    password: Joi.string().regex(RegExp(pattern)).max(64).required(),

    cart: Joi.array().items(Joi.object({
        id: Joi.string().hex().length(24)
    })),

    notifications: Joi.array().items(Joi.object({
        id: Joi.string().hex().length(24)
    }))
});

export default userSchema;