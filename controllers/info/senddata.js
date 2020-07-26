const { UserItemViews } = require('../../models/index');
const { sequelize } = require('../../models/index');

module.exports = {
    get: async(req, res) => {
        const { id , email } = req.decoded;
        
        console.log(UserItemViews);

        await UserItemViews
          .findAll({
              attributes: ['ItemId','image','category','type','buydate','price','storage','sp','sm','f','w'],
              where: { UserId: id },
              raw: true,
          })
          .then((result) => {
              // 유저가 등록한 아이템이 없을 때,
              if(result.length === 0){
                res.status(409).json({ message: 'no data' });
              }
              res.status(200).json({ data: result});
          })
          .catch((err) => {
              res.status(404).json({ message: err.message });
          })


    },
};