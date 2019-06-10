var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var indexSelect = require('../function/indexPost');

router.get('/', function(req, res, next) {
  var result = [];
  var picArr =[];
  var countSql = indexSelect.countAll(req);
  var allPage = 0;
  var pageNow = parseInt(req.query.pageNow) || 1;
  if (req.query.p){
      pageNow = parseInt(req.query.p);
  }
  console.log('------------');
  console.log(countSql);
  console.log(indexSelect.all(1, countSql));
  console.log('------------');
  db.query(countSql, [], function(err, count){

      // 先判断搜索结果是否存在
      if (count[0]['count(*)'] !== 0){

          // 结果的全部页数
          allPage = parseInt(count[0]['count(*)'] / 20) + 1;

          if (pageNow < 1){ pageNow = 1; }
          else if (pageNow >= allPage){ pageNow = allPage; }

          db.query(indexSelect.all(pageNow, countSql), [], function(err, rows){
              result = rows;
              db.query(indexSelect.getPicArr(result), [], function(err, picHref){
                  for(let i=0; i<picHref.length; i++){
                      picArr.push(picHref[i].outside.split('#')[0].split('?')[0]);
                  }
                  res.json({count: count[0]['count(*)'], items:result, picArr:picArr, pageNow: pageNow, allPage: allPage});
                  // res.render('index', {count: count[0]['count(*)'], items:result, picArr:picArr, pageNow: pageNow, allPage: allPage} )
              });
          });
      }else{
          res.json({count: 0, items:[], picArr:[], pageNow: 0, allPage: 0});
          // res.render('index', {count: 0, items:[], picArr:[], pageNow: 0, allPage: 0} )
      }
});



});
router.post('/', function(req, res, next){
});

module.exports = router;
