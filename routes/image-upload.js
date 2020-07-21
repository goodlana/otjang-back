const express = require('express');
const router = express.Router();

const upload= require('../services/image-upload')

const singleUpload = upload.single('image');  //중요함... key를 image로 받겠다는 거임.

router.post('/upload', function(req,res) {
  
  singleUpload(req,res,function(err) {
    return res.json({'imageUrl': req.file.location}) 
  })
})

module.exports = router;
