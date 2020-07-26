const express = require('express');

// 라우팅 위한 express 미들웨어. 경로로 마운팅
const router = express.Router();

const {infoController} = require('../controllers');
const authMiddleware = require('./auth');

router.use('/', authMiddleware);
router.get('/',infoController.senddata.get)

module.exports = router;
