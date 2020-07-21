const { Users } = require('../../models/index');

module.exports = {
    post: (req, res) => {
        const { id , email } = req.decoded;
        const { password, newpassword } = req.body;

        console.log('id check: ', id);

        Users
          .update({ 
            password: newpassword},
            { 
              where: {
                email: email,
                password: password,
            }
          }).then((result) => {
              if(!result[0]){
                res.status(409).json({ message : 'Wrong Password' });
              } else{
                res.status(200).json({ message : 'Successful' });
              }
          }).catch((err) => {
              res.status(404).json({ message : err.message });
          })
        
        
    },
};