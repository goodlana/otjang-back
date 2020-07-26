'use strict';
const view_name = 'UserItemViews';
const query = `
SELECT UserId, ItemId, image,category, type, buydate, price, brand, storage,
count(
case when \`season\` = 'sp'
then 1 else null
end
) as sp,
count(
case when \`season\` = 'sm'
then 1 else null
end
) as sm,
count(
case when \`season\` = 'f'
then 1 else null
end
) as f,
count(
case when \`season\` = 'w'
then 1 else null
end
) as w

From (select i.UserId, i.id as ItemId, i.image, i.category, i.type, i.buydate, i.price, i.brand, i.storage, s.season from Items as i inner join items_seasons as iss on i.id = iss.ItemsId inner join Seasons as s on iss.SeasonsId = s.id)sub group by ItemId
`
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`CREATE VIEW ${view_name} AS ${query}`);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`DROP VIEW ${view_name}`);
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
