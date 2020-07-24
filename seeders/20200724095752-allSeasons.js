'use strict';
//1. seed파일 생성(터미널) ==> sequelize seed:generate --name allSeasons
//2. seed파일에 고정데이터 작성
//3. seed 실행(터미널)==>  sequelize db:seed:all
//4. Seasons에 데이터 생성됨.


module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Seasons', [{
     id:1,
     season: 'sp'
   }, {
     id:2,
     season: 'sm'
   }, {
     id:3,
     season: 'f'
   }, {
     id:4,
     season: 'w'
   }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
