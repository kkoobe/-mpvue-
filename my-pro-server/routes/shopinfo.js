var express = require('express');
var router = express.Router();

// 引入数据
const datas=require('../datas/data.json');
/* GET home page. */
router.get('/shopinfo', function(req, res, next) {
  console.log(res);
  res.send(datas)
});

module.exports = router;
