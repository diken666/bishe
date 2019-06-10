var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var questionSql = require('../db/user/question');


router.get('/', function(req, res, next) {
    var id = req.query.id;
    if (id){
        db.query(questionSql.delQuestionCommentById(id), [], function (err, response) {
            if(!err){
                res.json({
                    state: 'ok',
                    msg: '评论删除成功'
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