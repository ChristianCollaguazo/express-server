const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
class UsersService {
  async create(data) {
    return await models.User.create(data);
  }
  async find() {
    return { data: await models.User.findAll() };
  }
  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (user) {
      return user;
    }
    throw boom.notFound('User not found');
  }
  async update(id, data) {
    const user = await this.findOne(id);
    if (user) {
      return await user.update(data);
    }
  }
  async delete(id) {
    const user = await this.findOne(id);
    if (user) {
      return await user.destroy();
    }
  }
}

module.exports = UsersService;
