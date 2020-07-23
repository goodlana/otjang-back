/* eslint-disable no-unused-vars, no-extra-semi */
const crypto = require('crypto')

//참고: 제로초 : https://www.zerocho.com/category/NodeJS/post/593a487c2ed1da0018cff95d

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.Items, {as: 'stuffs'})
    }
  };
  Users.init({
    email: DataTypes.STRING,
    password: {
      type : DataTypes.STRING,
      set : function(val){ //비밀번호 암호화
        // console.log(hash(val))
        // console.log(crypto.pbkdf2Sync(val,process.env.PASSWORD_SALT, 1, 32, 'sha512').toString('base64'));

        // 동기적 실행
        this.setDataValue('password', crypto.pbkdf2Sync(val, process.env.PASSWORD_SALT, 48537, 64, 'sha512').toString('base64'));
      },
      get: function() {
        return null //GET을 통해서 데이터 조회시 숨김처리 (mysql자체[터미널, 워크벤치 등]에서는 보임)
      }
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};