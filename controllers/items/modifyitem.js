const { Items } = require('../../models/index')
const { items_seasons } =require('../../models/index')
const { Seasons } = require('../../models/index');

module.exports = {
    patch: (async(req, res) => {
        const { item_id } = req.params
        const { season } = req.body
        let seasonId = [] //seasonId를 담을 배열 선언.

        try {
            //season을 제외한 Items 데이터 업데이트.
            await Items.update(
                req.body,
                { where: { id: item_id } }
            );

            //req.body에 season이 있으면
            if(season) {

                //seasonId를 담을 배열에 요소 생성.
                for(let i of season) {
                    await Seasons.findOne({
                        where: {
                            season: i,
                        },
                        raw: true
                    }).then(res => seasonId.push(res.id))}

                    
                //기존의 items_seasons에 있는 ItemsId가 있는 데이터를 삭제하고
                //items_seasons에 다시 create메소드를 써서 데이터를 새로 만든다.
                await items_seasons.destroy({
                    where: {
                        ItemsId: item_id
                    }
                });

                //
                for(let i of seasonId) {
                    await items_seasons.create({
                        ItemsId: item_id,
                        SeasonsId: i
                    })
                }
                res.status(200).json({"message": "Successful update item data with season"})
            } else { //season이 null이면 item테이블 데이터만 업데이트.
                res.status(200).json({"message": "Successful update item data"})
            } 
        }catch(e) {
            res.status(404).json({"message": "Failed", "error": `${e}`})
        }
    })

};
