/* eslint-disable */
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.sync(); // 이걸 넣어줘야 테이블 및 컬럼이 생성됨. migration에도 이걸 넣어야하나?

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = require('./users')(sequelize,Sequelize);
db.Items = require('./items')(sequelize,Sequelize);
db.Seasons = require('./seasons')(sequelize,Sequelize)

db.Users.hasMany(db.Items);
db.Items.belongsTo(db.Users);

db.Items.belongsToMany(db.Seasons, {through: "items_seasons"});
db.Seasons.belongsToMany(db.Items, {through: "items_seasons"});

module.exports = db;
