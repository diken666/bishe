var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var commentSql = require('../db/user/comment');


router.get('/', function(req, res, next) {
    var cid = req.query.cid;
    if (cid){
        db.query(commentSql.hasCar(cid), [], function (err, carArr) {
            if (carArr.length !== 0){
                db.query(commentSql.getComment(cid), [], function (err, comments) {
                    if(!err){
                        res.json({
                            state: 'ok',
                            msg: '获取成功',
                            comments
                        })
                    }

                })
            } else{
                res.json({
                    state: 'error',
                    msg: '不存在此车辆'
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