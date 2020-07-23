const { Users } = require('../../models/index');

module.exports = {
    post: (req, res) => {
        const { email, password } = req.body;
        
        Users
            .findOrCreate({
                where: {
                    email: email,
                },
                defaults: {
                    password: password,
                },
            })
            .then(async([user,created]) => {
                if(!created){
                    console.log('check')
                    return res.status(409).json({ message: 'Already exists' })
                }
                const data = await user.get({ plain: true });
                console.log(data);
                res.status(200).json({ message: 'successful' });
            })
            .catch((err) => {
                res.status(404).json({ message: err.message });
            })
    },
};