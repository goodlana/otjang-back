const { UserItemViews } = require('../../models/index');
const { sequelize } = require('../../models/index');

module.exports = {
    get: (req, res) => {

        
        console.log(UserItemViews);

        UserItemViews
          .findAll({
              attributes: ['ItemId','image','category','type','buydate','price','storage'],
              where: {UserId: 1},
              raw: true,
          })
          .then((res) => {
              console.log(res)
          })


    },
};