const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRouter = require('./routes/user');
const itemRouter = require('./routes/item');
const infoRouter = require('./routes/info')

//express 서버 실행
const app = express();
const port = 5000;

//body로 넘어온 데이터를 JSON 객체로 변환 
app.use(bodyParser.json());

//cors를 대응하기 위한 라이브러리
app.use(cors());

app.get('/',(req,res) => {
    res.send('1차 배포용 서버 실행테스트')
})

//url에 따른 라우팅
app.use('/user', userRouter);
app.use('/item', itemRouter);
app.use('/info', infoRouter);


//port 번호 설정
app.set('port', port);
app.listen(app.get('port'), () => {
  console.log(`app is listening in PORT ${app.get('port')}`);
});

module.exports = app;