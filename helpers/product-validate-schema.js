import Joi from "joi";

const productSchema = Joi.object({
    _id: Joi.required(),
    
    product: Joi.string().required().valid(
        'pillow', 
        'mattress'
    ),

    name: Joi.string().required(),

    description: Joi.string().max(255).required(),

    type: Joi.string().required().valid(
        'down',
        'feather',
        'down alternative',
        'memory foam',
        'latex',
        'cotton',
        'innerspring',
        'gel',
        'wool',
        'microbeads',
        'buckwheat',
        'kapok',
        'water'
    ),

    size: Joi.string().required().valid(
        'standard',
        'queen',
        'king',
        'euro'
    ),

    color: Joi.string().required().valid(
        'white',
        'off white',
        'lilac dreamer',
        'ash gray'
    ),

    price: Joi.number().min(0).precision(2).required(),

    stock: Joi.number().min(0).required()
});

export default productSchema;
