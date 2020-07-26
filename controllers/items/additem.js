// {url}/item
const { Items } = require('../../models/index');
const { Seasons } = require('../../models/index');
const { items_seasons } = require('../../models/index');
const { sequelize } = require('../../models/index');

module.exports = {
    post: (async(req, res) => {
        const { image, category, type, buydate, price, brand, storage } = req.body;
        let { season } = req.body // season = "['sp','sm','f','w']"

        let seasonId = []
        for(let i of season) {
            Seasons.findOne({
                where: {
                    season: i,
                },
                raw: true
            }).then(res => {
                seasonId.push(res.id);
            })
        }


        Items.create({
            image: image,
            category: category,
            type: type,
            buydate: buydate,
            price: price,
            brand: brand,
            storage: storage,
            UserId: req.decoded.id // token을 헤더에 넣어 보내면, decoded에 id가 같이 적힘.
        }).then(data => {
          
            for(let i of seasonId){
                console.log(i)
                items_seasons.create({
                    ItemsId: data.id,
                    SeasonsId: i,
                    raw: true
                })
            }
            res.status(200).send({"message": "Successful", "item_id": `${data.id}`})
        }).catch(e => res.status(404).send({"message": "Failed", "error": `${e}`}))
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