const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().alphanum().min(10).max(20);
const price = Joi.number().integer().min(5);
const image = Joi.string().uri();
const isBlock = Joi.boolean();

const createProductSchema = Joi.object({
  id: id.required(),
  name: name.required(),
  price: price.required(),
  image: image.required(),
  isBlock: isBlock.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  isBlock: isBlock
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = {createProductSchema, updateProductSchema, getProductSchema }
