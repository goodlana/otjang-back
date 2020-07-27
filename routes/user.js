const express = require('express');
const passport = require('passport');

// 라우팅 위한 express 미들웨어. 경로로 마운팅
const router = express.Router();

const { userController } = require('../controllers');
const authMiddleware = require('./auth');

router.post('/signup',userController.signup.post);

router.post('/signin',userController.signin.post);

// login된 유저인지 토큰을 확인하는 미들웨어
router.use('/signout', authMiddleware);
router.get('/signout', userController.signout.get);

router.use('/newpwd', authMiddleware);
router.post('/newpwd',userController.newpwd.post);

router.use('/delete', authMiddleware);
router.post('/delete',userController.deleteuser.delete);

module.exports = router;