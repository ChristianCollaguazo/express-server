const faker = require('faker');
const boom = require('@hapi/boom');
// const getConnection = require('../libs/postgres');
const {models} = require('../libs/sequelize');
class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
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
    // if(this.findIndex(data.id) === -1) {
    //   return this.products.push(data);
    // }
    // throw boom.notFound('The product already exists');
    data['createdAt'] = new Date();
    const newProduct = await models.Product.create(data);
    return newProduct;

  }

  async find() {
    //* Ejemplo sin pool
    //* const client = await getConnection();
    //* const rta = await client.query('SELECT * FROM task')
    //* console.log((await rta).rows);

    //* const query = 'SELECT * FROM task';
    //* const [data] = await sequelize.query(query);
    const data = await models.Product.findAll();
    //console.log((await rta).rows);
    return {
      data
    };
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
