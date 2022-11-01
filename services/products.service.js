const faker = require('faker');

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
        }
      )
    }
  }
  async create(data) {
    if(this.findIndex(data.id) === -1) {
      return this.products.push(data);
    }
    return null;
  }

  async find() {
    return this.products;
  }

  async findOne(id) {
    return this.products.find(product => product.id === id)
   }

   async findIndex(id) {
    return this.products.findIndex(product => product.id === id)
   }

  async update(id, data) {
    let index = this.findIndex(id);
    if(index && index > -1) {
      this.products[index] = {...this.products[index], ...data}
      return this.products[index];
    }
    return null;
  }

  async delete(id) {
    let index = this.findIndex(id);
    if(index && index > -1) {
      return this.products.splice(index, 1);
    }
    return null;
  }
}

module.exports = ProductsService;
