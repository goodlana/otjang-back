/* eslint-disable no-unused-vars, no-extra-semi */

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Users);
      // this.belongsToMany(models.Seasons, {through: 'Items_Seasons' })
    }


  };
  Items.init({
    image: DataTypes.STRING,
    category: DataTypes.STRING,
    type: DataTypes.STRING,
    buydate: DataTypes.STRING,
    price: DataTypes.INTEGER,
    brand: DataTypes.STRING,
    storage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Items',
  });
  return Items;
};