const faker = require('faker');
const boom = require('@hapi/boom');

const {models} = require('../libs/sequelize');
class ProductsService {
  constructor() {
    this.products = [];
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push(
        {
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price(), 10),
          url: faker.image.imageUrl(),
          isBlock: faker.datatype.boolean(),
          create_at: new Date()
        }
      )
    }
  }
  async create(data) {
    //* Crear un solo producto
    const newProduct = await models.Product.create(data);
    return newProduct;
    //* Crear varios productos
    //* return await models.Product.bulkCreate(this.products)

  }

  async find() {
    //* Ejemplo sin pool
    //* const client = await getConnection();
    //* const rta = await client.query('SELECT * FROM task')
    //* console.log((await rta).rows);

    //* Ejemplo con pool
    //* const query = 'SELECT * FROM task';
    //* const [data] = await sequelize.query(query);
    const data = await models.Product.findAll();
    return {
      data
    };
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
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
    const product = await models.Product.findByPk(id);
    if(product) {
      data['modifiedAt'] = new Date();
      return await product.update(data);
    }
    throw boom.notFound('The product not found');
  }

  async delete(id) {
    const product = await models.Product.findByPk(id);
    if(product){
      return product.destroy();
    }
    throw boom.notFound('The product not found');
  }
}

module.exports = ProductsService;
