const express = require('express');
const faker = require('faker');
const app = express();
const port = 3000;


app.get('/', (request, response) => {
  response.send('Hola mundo')
})

app.get('/example', (request, response) => {
  response.send('Esto es un ejemplo')
})

app.get('/products', (request, response) => {
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
app.get('/products/filter', (request, response) => {
  response.send('Yo soy un filter')
})

app.get('/products/:id', (request, response) => {
  const { id } = request.params;
  response.json(
    {
      id,
      name: 'Galleta',
      precio: '5$',
    })
})

app.get('/users', (request, response) => {
  const { limit, offset } = request.query;

  if (limit && offset) {
    response.json({ limit, offset })
  } else {
    response.send('No hay parametros')
  }

})

app.get('/categories/:categoryId/products/:productId', (request, response) => {
  const { categoryId, productId } = request.params;
  response.json(
    {
      categoryId,
      productId,
    })
})

app.listen(port, () => console.log('El server esta corriendo en el puerto', port));

