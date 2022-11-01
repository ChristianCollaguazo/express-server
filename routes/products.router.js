const express = require('express');
const ProductsService = require('../services/products.service');

const router = express.Router();

const service = new ProductsService();

router.get('/', async (request, response) => {
  response.json(await service.find())
})

// Todo lo que sea especifico debe ir antes de lo dinamico
router.get('/filter', (request, response) => {
  response.send('Yo soy un filter')
})

router.get('/:id', async (request, response) => {
  const { id } = request.params;
  const product = await service.findOne(id);
  product ? response.status(200).json(product) : response.status(404).json({
    message: 'El producto no existe'
  })
})


router.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const product = await service.delete(id);

  product ? response.status(200).json(
    {
      message: 'Producto eliminado',
      id,
      data: product
    }) :
    response.status(404).json({
      message: 'El producto no existe'
    });
})



router.post('/', async (request, response) => {
  const body = request.body;
  const insert = await service.create(body);
  insert ?
  response.status(201).json({
    message: 'producto creado',
    code: insert
  }) :
  response.status(404).json({
    message: 'El producto ya existe'
  });
})

router.patch('/:id', async (request, response) => {
  const { id } = request.params;
  const body = request.body;
  const product = await service.update(id, body);
  product ?
    response.status(200).json({
      message: 'producto actualizado',
      id,
      data: product
    }) :
    response.status(404).json({
      message: 'El producto no existe'
    });
})

module.exports = router;
