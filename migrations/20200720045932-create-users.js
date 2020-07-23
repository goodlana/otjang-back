/* eslint-disable no-unused-vars */
const crypto = require('crypto')

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
        set : function(val){ //비밀번호 암호화
          // console.log(hash(val))
          // console.log(crypto.pbkdf2Sync(val,process.env.PASSWORD_SALT, 1, 32, 'sha512').toString('base64'));
  
          // 동기적 실행
          this.setDataValue('password', crypto.pbkdf2Sync(val, process.env.PASSWORD_SALT, 48537, 64, 'sha512').toString('base64'));
        },
        get: function() {
          return null //GET을 통해서 데이터 조회시 숨김처리 (mysql자체[터미널, 워크벤치 등]에서는 보임)
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};