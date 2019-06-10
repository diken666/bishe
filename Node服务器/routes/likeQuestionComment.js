var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var questionSql = require('../db/user/question');


router.get('/', function(req, res, next) {
    var qid = req.query.qid;
    var uid = req.query.uid;
    if (qid && uid){
        db.query(questionSql.hasArticle(qid), [], function (err, result) {
            if (result.length === 1){
                db.query(questionSql.likeComment(qid, uid), [], function(err, response){
                    if (!err){
                        res.json({
                            state: 'ok',
                            msg: '点赞成功'
                        })
                    }
                })
            } else{
                res.json({
                    state: 'error',
                    msg: '无此文章信息'
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






module.exports = router;