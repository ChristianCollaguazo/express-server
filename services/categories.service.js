const { boom } = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CategoryService {
  constructor() {}
  async find() {
    return await models.Category.findAll();
  }
  async findOne(id) {
    const category = await models.Category.findByPk(id);
    if (!category) {
      boom.notFound('category not found');
    }
    return category;
  }
  async create(category) {
    return await models.Category.create(category);
  }
  async updated(id, changes) {
    const category = await models.Category.findByPk(id);
    if (!category) {
      boom.notFound('category not found');
    }
    return await category.update(changes);
  }
  async delete(id) {
    const category = await models.Category.findByPk(id);
    if (!category) {
      boom.notFound('category not found');
    }
    return await category.destroy();
  }
}


module.exports = CategoryService;
