const { Users } = require('../../models/index');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

module.exports = {
    post: (async(req, res) => {
    let { email, password } = req.body; // const 는 재할당이 금지되어서 암호화할 때 계속 오류가 뜸.
    
    password = crypto.pbkdf2Sync(password, process.env.PASSWORD_SALT, 48537, 64, 'sha512').toString('base64');
    
    
    // sequalize를 이용해서 데이터베이스에서 사용자가 있는지, 비밀번호는 맞는지 찾는다.
    await Users
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


          const token = jwt.sign(payload,process.env.JWT_SECRET,
            { // 토큰 유지 기간 설정 10s' 테스트 완료
              expiresIn: "1 days"
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
    })
};