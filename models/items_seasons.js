'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class items_seasons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  items_seasons.init({
    ItemsId: DataTypes.INTEGER,
    SeasonsId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'items_seasons',
        timestamps: false
  });
  return items_seasons;
};