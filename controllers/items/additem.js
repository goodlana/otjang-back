// {url}/item
const { Items } = require('../../models/index');
const { Seasons } = require('../../models/index');
const { items_seasons } = require('../../models/index');
const { sequelize } = require('../../models/index');

module.exports = {
    post: (async(req, res) => {
        const { image, category, type, buydate, price, brand, storage } = req.body;
        let { season } = req.body // season = "['sp','sm','f','w']"

        let seasonId = [];
        let itemId='';

        console.log(sequelize.transaction)

        try{

            await sequelize.transaction(async(t) => {

                for(let i of season) {
                    await Seasons.findOne({
                        where: {
                            season: i,
                        },
                        transaction: t,
                        raw: true
                    }).then(result => {
                        seasonId.push(result.id);
                    })
                }

                await Items.create({
                    image: image,
                    category: category,
                    type: type,
                    buydate: buydate,
                    price: price,
                    brand: brand,
                    storage: storage,
                    UserId: req.decoded.id // token을 헤더에 넣어 보내면, decoded에 id가 같이 적힘.
                }, { transaction: t })
                .then(data => {
                    itemId = data.id;
                })

                for(let i of seasonId){
                    console.log(i)
                    await items_seasons.create({
                        ItemsId: itemId,
                        SeasonsId: i
                    },{transaction: t})   
                }
                res.status(200).json({ message: "Successful", item_id: itemId });
                    
            })

            
        } catch(e){ 
            console.log(e.message)
            res.status(404).json({ message: "Failed", err: e.message });
        }
    })

};


// for(let i in season) {
//     items_seasons.create({
//     ItemsId: res.id,
//     SeasonsId: Seasons.findOne({
//         where: {
//             season: season[i]
//             } 
//     })
// })
// }

// await res.status(200).send({
//     "message": "Successful",
//     "item_id": newOne.id
//})