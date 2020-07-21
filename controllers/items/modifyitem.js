const { Items } = require('../../models/index')

module.exports = {
    patch: (async(req, res) => {
        const { item_id } = req.params
        try {
            let update = await Items.update(
                req.body,
                { where: { id: item_id } }
            );

            if(update) {
                res.status(200).json({"message": "Successful update"})
            }
        } catch(e) {
            res.status(404).json({"message": "Failed"})
        }
    })
};