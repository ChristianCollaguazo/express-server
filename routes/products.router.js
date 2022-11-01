const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (request, response) => {
  const { size } = request.query;
  const limit = size || 10;
  const products = [];
  for (let index = 0; index < limit; index++) {
    products.push(
      {
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      }
    )

  }
  response.json(products)
})

// Todo lo que sea especifico debe ir antes de lo dinamico
router.get('/filter', (request, response) => {
  response.send('Yo soy un filter')
})

router.get('/:id', (request, response) => {
  const { id } = request.params;
  response.json(
    {
      id,
      name: 'Galleta',
      precio: '5$',
    })
})


module.exports = router;
