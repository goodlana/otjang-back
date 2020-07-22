const express = require('express');

// 라우팅 위한 express 미들웨어. 경로로 마운팅
const router = express.Router();

const {itemController} = require('../controllers');
const authMiddleware = require('../controllers/auth');

router.use('/', authMiddleware);
router.post('/', itemController.additem.post);

router.patch('/:item_id', itemController.modifyitem.patch);

router.delete('/:item_id', itemController.deleteitem.delete);

module.exports = router;