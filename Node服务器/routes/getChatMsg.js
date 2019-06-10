var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var getChatMsgSql = require('../db/user/getChatMsg');


router.get('/', function(req, res, next) {
    var uid = req.query.uid;
    if (uid){
        db.query(getChatMsgSql.hasUser(uid), [], function (err, userArr) {
            if (userArr.length === 1){
                db.query(getChatMsgSql.getChatMsg(uid), [], function( err, resArr){
                    if(!err){
                        res.json({
                            state: 'ok',
                            msg: '请求成功',
                            item: resArr
                        })
                    }
                })
            } else{
                res.json({
                    state: 'error',
                    msg: '不存在此用户信息'
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