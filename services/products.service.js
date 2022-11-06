const faker = require('faker');
const boom = require('@hapi/boom');
// const getConnection = require('../libs/postgres');
const pool = require('../libs/postgres.pool');
class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.log(err))
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push(
        {
          id: index.toString(),
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price(), 10),
          image: faker.image.imageUrl(),
          isBlock: faker.datatype.boolean()
        }
      )
    }
  }
  async create(data) {
    if(this.findIndex(data.id) === -1) {
      return this.products.push(data);
    }
    throw boom.notFound('The product already exists');

  }

  async find() {
    //* Ejemplo sin pool
    //* const client = await getConnection();
    //* const rta = await client.query('SELECT * FROM task')
    //* console.log((await rta).rows);

    const query = 'SELECT * FROM task';
    const rta = await this.pool.query(query);
    //console.log((await rta).rows);
    return rta.rows;
  }

  async findOne(id) {
    const product = this.products.find(product => product.id === id);
    if(!product) {
      throw boom.notFound('The product not found');
    } else if(product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
   }

   findIndex(id) {
    return this.products.findIndex(product => product.id === id)
   }

  async update(id, data) {
    let index = this.findIndex(id);
    if(index && index > -1) {
      this.products[index] = {...this.products[index], ...data}
      return this.products[index];
    }
    throw boom.notFound('The product not found');
  }

  async delete(id) {
    let index = this.findIndex(id);
    if(index && index > -1) {
      return this.products.splice(index, 1);
    }
    throw boom.notFound('The product not found');
  }
}

module.exports = ProductsService;
