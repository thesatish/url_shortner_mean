const Joi = require('joi');

exports.registerSchema = Joi.object({
    userName : Joi.string(),
    emailId: Joi.string().email().required(),
    mobile: Joi.string().pattern(/^\+?[0-9]{8,15}$/).required().messages({
        'string.pattern.base': 'Mobile number must be a valid format.'
    }),
    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
        .required()
        .messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter and one special character.',
            'string.min': 'Password must be at least 8 characters long.'
        }),
    role: Joi.number(),
    emailVerification: Joi.boolean(),
    gender: Joi.any(),
});

exports.loginSchema = Joi.object({
    emailId: Joi.string().email().required(),
    password: Joi.string().required(),
});

exports.urlSchema = Joi.object({
    originalUrl: Joi.string().required()
});
