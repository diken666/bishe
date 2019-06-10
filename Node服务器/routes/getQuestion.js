var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var questionSql = require('../db/user/question');


router.get('/', function(req, res, next) {
    var id = req.query.id;
    if (id){
        db.query(questionSql.hasArticle(id), [], function (err, result) {
            if (result.length === 1){
                db.query(questionSql.getUserInfo(result[0].uid), [], function(err, userArr){
                    if (!err){
                        res.json({
                            state: 'ok',
                            msg: '请求成功',
                            result: {
                                userInfo: userArr[0],
                                articleInfo: result[0]
                            }
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