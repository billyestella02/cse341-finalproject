import Joi from "joi";

const cartSchema = Joi.object({
    _id: Joi.any(),

    products: Joi.array().items(
        Joi.object({
            product: Joi.required(),
            quantity: Joi.number().min(0).required()
        })
    ),
    
    dateCreated: Joi.date()
});

export default cartSchema;