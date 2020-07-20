const express = require('express');

// 라우팅 위한 express 미들웨어. 경로로 마운팅
const router = express.Router();

const {infoController} = require('../controllers')

router.get('/',infoController.get)

module.exports = router;
