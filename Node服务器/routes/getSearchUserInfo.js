var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var feedbackSql = require('../db/user/feedbackError');


router.get('/', function(req, res, next) {
    var uid = req.query.uid;
    if (uid){
        db.query(feedbackSql.hasSearchUser(uid), [], function (err, userArr) {
            if (userArr.length >= 0) {
                res.json({
                    state: 'ok',
                    msg: '请求成功！',
                    items: userArr
                })
            }else{
                res.json({
                    state: 'error',
                    msg: '无此用户信息'
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