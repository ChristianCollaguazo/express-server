const express = require('express');
const ProductsService = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler');
const {createProductSchema, updateProductSchema, getProductSchema} = require('../schemas/product.schema');
const router = express.Router();

const service = new ProductsService();
//* create
router.post('/',
validatorHandler(createProductSchema, 'body'),
async (request, response, next) => {
  try {
    const body = request.body;
    const insert = await service.create(body);
    response.status(201).json({
      message: 'producto creado',
      code: insert
    })
  } catch (error) {
    next(error);
  }


})
//* find
router.get('/', async (request, response) => {
  response.json(await service.find())
})

router.get('/:id',
validatorHandler(getProductSchema, 'params'),
async (request, response, next) => {
  try {
    const { id } = request.params;
    const product = await service.findOne(id);
    product ? response.status(200).json(product) : response.status(404).json({
      message: 'El producto no existe'
    })
  } catch (error) {
    next(error);
  }
})

//* update
router.patch('/:id',
validatorHandler(getProductSchema, 'params'),
validatorHandler(updateProductSchema, 'body'),
async (request, response, next) => {
  try {
    const { id } = request.params;
    const body = request.body;
    const product = await service.update(id, body);
    response.status(200).json({
      message: 'producto actualizado',
      id,
      data: product
    });
  } catch (error) {
    next(error);
  }

})

//* delete
router.delete('/:id', async (request, response, next) => {

  try {
    const { id } = request.params;
    const product = await service.delete(id);
    response.status(200).json(
      {
        message: 'Producto eliminado',
        id,
        data: product
      })
  } catch (error) {
    next(error)
  }

})

module.exports = router;
