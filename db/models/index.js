const {Product, ProductSchema} = require('./product.model');
const {User, UserSchema} = require('./user.model');
const {Customer, CustomerSchema} = require('./customer.model');
const { Category, categorySchema } = require('./category.model');
function setupModels(sequelize) {
  Product.init(ProductSchema, Product.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Customer.associate(sequelize.models);
  Category.init(categorySchema, Category.config(sequelize));
}


module.exports = setupModels;
