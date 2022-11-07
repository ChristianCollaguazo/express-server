const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const { createUserSchema, getUserSchema, updateUserSchema } = require('../schemas/user.schema');
const UsersService = require('../services/users.service');
const router = express.Router();
const usersService = new UsersService();
//* Crear
router.post('/',
  // middlewares
  validatorHandler(createUserSchema, 'body'),
  async (request, response, next) => {
    try {
      const data = request.body;
      const user = await usersService.create(data);
      response.json(user)
    } catch (error) {
      next(error);
    }
  }
);
//* Buscar
router.get('/',
  // middlewares
  async (request, response, next) => {
    try {
      const users = await usersService.find();
      response.json(users)
    } catch (error) {
      next(error);
    }
  }
);
//* Buscar por id
router.get('/:id',
  // middlewares
  validatorHandler(getUserSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const user = await usersService.findOne(id);
      response.json(user);
    } catch (error) {
      next(error);
    }
  }
);
//* Actulaizar
router.patch('/:id',
  // middlewares
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const data = request.body;
      const user = await usersService.update(id, data);
      response.json(user)
    } catch (error) {
      next(error);
    }
  }
);
//* Eliminar
router.delete('/:id',
  // middlewares
  validatorHandler(getUserSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const user = await usersService.delete(id);
      response.json(user)
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
