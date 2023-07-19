import Joi from "joi";

const notificationSchema = Joi.object({
    message: Joi.string().max(100).required(),

    status: Joi.string().valid(
        'unread',
        'read'
    ),

    dateCreated: Joi.date()
});

export default notificationSchema;