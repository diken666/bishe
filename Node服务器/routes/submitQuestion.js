var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var questionSql = require('../db/user/question');


router.get('/', function(req, res, next) {
    var uid = req.query.uid;
    var title = req.query.title;
    var content = req.query.content;
    if (uid && title && content){
        db.query(questionSql.insertIntoQuestion(uid, title, content), [], function (err, response) {
            if(!err){
                res.json({
                    state: 'ok',
                    msg: '发布成功！'
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