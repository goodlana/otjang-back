module.exports = {
    get: (req, res) => {
        console.log('token으로 아이디와 이메일 확인: \n', req.decoded)
        res.send('test')

    },
};