const express = require('express');

// 라우팅 위한 express 미들웨어. 경로로 마운팅
const router = express.Router();

const {userController} = require('../controllers');

router.post('/signup',userController.signup.post);

router.post('/signin',userController.signin.post);

// signout이 get/ post?
router.get('/signout',userController.signout.get);

router.post('/newpwd',userController.newpwd.post);

module.exports = router;