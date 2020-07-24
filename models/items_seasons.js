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
      this.belongsTo(models.Items, {foreignKey: "ItemId"})
      this.belongsTo(models.Seasons,{foreignKey: "SeasonId"})
    }
  }
  items_seasons.init({
  }, {
    sequelize,
    modelName: 'items_seasons',
        timestamps: false
  });
  return items_seasons;
};