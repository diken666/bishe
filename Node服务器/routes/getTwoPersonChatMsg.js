var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var getChatMsgSql = require('../db/user/getChatMsg');


router.get('/', function(req, res, next) {
    var uid = req.query.uid;
    var sid = req.query.sid;
    if (uid && sid){
        db.query(getChatMsgSql.getTwoPersonChatMsg(uid, sid), [], function (err, chatArr) {
            res.json({
                state: 'ok',
                msg: '请求成功',
                items: chatArr
            })
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