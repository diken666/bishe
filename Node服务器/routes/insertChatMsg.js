var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var getChatMsgSql = require('../db/user/getChatMsg');


router.get('/', function(req, res, next) {
    var sid = req.query.sid;
    var simg = req.query.simg;
    var sname = req.query.sname;
    var lid = req.query.lid;
    var limg = req.query.limg;
    var lname = req.query.lname;
    var content = '';
    if (req.query.content === 'null') {
        content = '...';
    }else{
        content = req.query.content
    }
    if (sid && simg && sname && lid && limg && lname){
        db.query(getChatMsgSql.insertChatMsg(sid, sname, simg, lid, lname, limg, content ), [], function (err, response) {
          if (!err){
              res.json({
                  state: 'ok',
                  msg: '操作成功',
              })

          }
        })
    } else{
        res.json({
            state: 'error',
            msg: '请求参数错误'
        })
    }
});


router.post('/', function(req, res, next){

});
module.exports = router;