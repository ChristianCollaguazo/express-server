const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);

const getCategorySchema = Joi.object({
  id: id.required(),
});

const createCategorySchema = Joi.object({
  name: Joi.required(),
});

const updateCategorySchema = Joi.object({
  name,
});

module.exports = {
  getCategorySchema,
  createCategorySchema,
  updateCategorySchema,
};
