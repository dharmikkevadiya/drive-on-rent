const Joi = require('joi');

const schemas = {
  signup: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    // phone_no: Joi.string()
    //   .regex(/^[0-9]{10}$/)
    //   .messages({ 'string.pattern.base': `Invalid mobile no..` })
    //   .allow('', null),
    phone_no: Joi.string().allow('', null),
    country: Joi.string().allow('', null),
    password: Joi.string().required(),
    gender: Joi.string().allow('', null),
    address: Joi.string().allow('', null),
    btn_signup: Joi.string(),
    Renderpage: Joi.string(),
  }),

  login: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    btn_login: Joi.string(),
    Renderpage: Joi.string(),
  }),

  feedback: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    description: Joi.string().required(),
    btn_feedback: Joi.string(),
    Renderpage: Joi.string(),
  }),

  forgotPassword: Joi.object().keys({
    email: Joi.string().email().required(),
    btn_forgot_password: Joi.string(),
    Renderpage: Joi.string(),
  }),
};
module.exports = schemas;
