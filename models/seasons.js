/* eslint-disable no-unused-vars, no-extra-semi */

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seasons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Seasons.init({
    season: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Seasons',
  });
  return Seasons;
};