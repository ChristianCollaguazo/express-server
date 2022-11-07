const { Model, Sequelize, DataTypes } = require("sequelize");

const USER_TABLE = 'users';
//* allowNull: false,
//* autoIncrement: true,
//* primaryKey: true,
//* type: DataTypes.INTEGER
//* inique
//* defaultValue
//* field
const UserSchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
}

class User extends Model {
  static associations(){

  }

  static config(sequelize) {
    return{
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = {User, USER_TABLE, UserSchema}
