const { Users } = require('../../models/index');

module.exports= {
    delete: async(req,res) => {
        const { id } = req.decoded;

        await Users
          .destroy({
            where: { id : id }
          })
          .then(() => {
              res.status(200).json({ message: 'Successful' })
          })
          .catch((err) => {
              console.log('delete user: ', err.message);
              res.status(404).json({ message: 'Failed', err: err.message })
          })


    }
}