const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().alphanum().min(5).max(20);
const price = Joi.number().integer().min(5);
const url = Joi.string().uri();
const isBlock = Joi.boolean();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  url: url.required(),
  isBlock: isBlock.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  url: url,
  isBlock: isBlock
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = {createProductSchema, updateProductSchema, getProductSchema }
