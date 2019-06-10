var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var commentSql = require('../db/user/comment');


router.get('/', function(req, res, next) {
    var id = req.query.id;
    if (id){
        db.query(commentSql.hasComment(id), [], function (err, commentArr) {
            if (commentArr.length !== 0){
                db.query(commentSql.likeComment(id), [], function(err, response){
                    if(!err){
                        res.json({
                            state: 'ok',
                            msg: '点赞成功！'
                        })
                    }
                })
            } else{
                res.json({
                    state: 'error',
                    msg: '无此评论数据'
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