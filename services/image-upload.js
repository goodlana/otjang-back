//S3를 이미지 저장소로 담기위함... 아래 작성된 코드들은 npm multer-s3에서 가져옴.
//모듈 설치: npm i --save aws-sdk multer multer-s3
//이 코드에서 필요없는 express관련 코드들은 모두 제거함.
//참고 유튜브: https://www.youtube.com/watch?v=ASuU4km3VHE
require('dotenv').config();//환경변수를 불러오기 위한 코드.

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path')

aws.config.update({
  secretAccessKey: process.env.S3_ACCESS_KEY, // 테스트로 내 걸 넣음, 배포시 수정. 환경변수로 넣어야하나?
  accessKeyId: process.env.S3_ACCESS_KEY_ID, // 테스트로 내 키를 넣음. 배포시 수정. 환경변수?
  region: 'ap-northeast-2' // s3 주소창에 region 다음으로 나옴. 이건 수정 안해도 될듯.
})

const s3 = new aws.S3()

const upload = multer({
  storage: multerS3({ // reference: https://www.npmjs.com/package/multer-s3
    s3: s3,
    bucket: 'otjang-images', //s3용 버켓 이름 넣어주기.
    acl: 'public-read',// Access control for the file. 이걸 설정 안해주면 이미지 url을 클릭해도 Access denied됨. s3에서도 퍼블릭액세스 권한 설정해주기.
    contentType: multerS3.AUTO_CONTENT_TYPE, //이걸 설정해줘야 이미지링크 클릭시 다운이 안됨!
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING'}); // 'Testing'도 내가 그냥 넣은것.
    },
    key: function(req, file, cb) {
      const extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension);
    }
  })
})

module.exports = upload