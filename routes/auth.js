const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // read the token from header or url 
    const token = req.headers['token'];

    // 토큰이 존재하지 않을 때 로그인이 되지 않았다는 response
    if(!token) {
        return res.status(403).json({
            message: 'not login'
        });
    }

    // jwt.verify로 토큰 디코딩하기
    const p = new Promise (
        (resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if(err) reject(err);
                resolve(decoded);
            })
        }
    )

    // process the promise
    p.then((decoded)=> {
        // console.log(decoded);
        // 미들웨어를 사용한 api 콜의 req에 decoded라는 키와 밸류 추가
        // controllers에서 코드 작성시 req.decoded로 이를 활용할 수 있다.
        req.decoded = decoded;
        next();
    }).catch((err) => {
        // 에러 발생시 err.message response
        console.log('token err: ',err.message);
        res.status(403).json({ message: err.message });
    })
}

module.exports = authMiddleware