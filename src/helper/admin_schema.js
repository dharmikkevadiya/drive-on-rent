const Joi = require("joi");

const schemas = {
  login: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    btn_login: Joi.string(),
    Renderpage: Joi.string(),
  }),
  addItem: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    btn_add_item: Joi.string(),
    Renderpage: Joi.string(),
  }),
};
module.exports = schemas;
