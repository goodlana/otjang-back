const { Users } = require('../../models/index');

module.exports= {
    delete: (req,res) => {
        const { id } = req.decoded;

        Users
          .destroy({
            where: { id : id }
          })
          .then(() => {
              res.status(200).json({ message: "Successful" })
          })
          .catch((err) => {
              console.log(err.message);
              res.status(404).json({ message: "Failed" })
          })


    }
}