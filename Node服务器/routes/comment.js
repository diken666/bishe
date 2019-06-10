var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var commentSql = require('../db/user/comment');


router.get('/', function(req, res, next) {
    var uid = req.query.uid;
    var cid = req.query.cid;
    var content = req.query.content;
    if (uid && cid){
        db.query(commentSql.hasUser(uid), [], function (err, userItem) {
            if (userItem.length !== 0){
                db.query(commentSql.hasCar(cid), [], function (err, carItem) {
                    if (carItem.length !== 0){
                        db.query(commentSql.submitComment(uid, cid, content, userItem[0].name), [], function (err, response) {
                            if(!err){
                                res.json({
                                    state: 'ok',
                                    msg: '插入数据成功！'
                                })
                            }
                        })
                    } else{
                        res.json({
                            state: 'error',
                            msg: '不存在此车辆！'
                        })
                    }
                })
            } else{
                res.json({
                    state: 'error',
                    msg: '不存在此用户！'
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