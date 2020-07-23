/* eslint-disable no-unused-vars, no-extra-semi */
const crypto = require('crypto')

//참고: 제로초 : https://www.zerocho.com/category/NodeJS/post/593a487c2ed1da0018cff95d

function hash(pwd) { 
  crypto.randomBytes(64, (err, buf) => { // randomBytes메소드. 64바이트 길이의 salt를 생성. 
  crypto.pbkdf2(pwd, buf.toString('base64'), 48537, 64, 'sha512', (err, key) => {
    console.log(key.toString('base64'))
  }) // buf는 버퍼형식이라 toString으로 base64문자열 salt로 변경해줌.
})
}

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
      set : function(val) { //비밀번호 암호화
        this.setDataValue('password', hash(val))
        //this.setDataValue('password', require('crypto').createHash('sha256').update(val).digest('hex'))
      },
      // get: function() {
      //   return null //GET을 통해서 데이터 조회시 숨김처리 (mysql자체[터미널, 워크벤치 등]에서는 보임)
      // }
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};