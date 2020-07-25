const { Items } = require('../../models/index')
const { items_seasons } = require('../../models/index')

module.exports = {
    delete: (async(req, res) => {
        const { item_id } = req.params
        await Items.destroy({
                where: { id: item_id }
        })

        await items_seasons.destroy({
            where:{
                ItemsId: item_id
            }
        })
        .then(()=> res.status(200).json({"message": "Successful delete"}))
        .catch(e => res.status(404).send({"message": "Failed", "Error": e}))
        }
    )
};