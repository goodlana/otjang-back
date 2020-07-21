const { Users } = require('../../models/index');
const jwt = require('jsonwebtoken');

module.exports = {
    post: (req, res) => {
    const { email, password } = req.body;
    
    // sequalize를 이용해서 데이터베이스에서 사용자가 있는지, 비밀번호는 맞는지 찾는다.
    Users
      .findOne({
        where: {
          email,
          password,
        },
        raw: true
      })
      .then((result) => {
        if (result === null) { 
          // 데이터베이스에서 유저를 찾지 못함
          res.status(404).json({ message: 'unvalid user' });
        } else {
          // 로그인에 성공시, 토큰 발급
          // jwt.sign(payload, secret, options, [callback])
          
          // jwt
          // https://victorydntmd.tistory.com/116

          // passport
          // https://stackhoarder.com/2019/07/17/node-js-passport-js-jwt-token-%EC%9D%B4%EC%9A%A9%ED%95%B4-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84/
          console.log(result);

          //토큰화 할 내용을 작성
          const payload = { id: result.id, email: result.email }

          const token = jwt.sign(payload, process.env.JWT_SECRET,
            { // 토큰 유지 기간 설정
              expiresIn: '10s'//"1 days"
            });

          console.log(token);

          res.status(200).json({
            message: 'Successful' ,id: result.id, token: token
          });
        }
      })
      .catch((err) => {
        res.status(404).json({ message: err.message });
      });
    },
};