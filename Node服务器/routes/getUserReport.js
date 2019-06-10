var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var userReportSql = require('../db/user/userReport');


router.get('/', function(req, res, next) {
    var uid = req.query.uid;
    if (uid){
        db.query(userReportSql.hasTheUser(uid), [], function (err, userArr) {
            if (userArr.length === 1) {
                db.query(userReportSql.selectReport(uid), [], function (err, result) {
                    if(!err){
                        res.json({
                            state: 'ok',
                            msg: '请求成功',
                            result
                        })
                    }
                })

            }else{
                res.json({
                    state: 'error',
                    msg: '用户信息出错'
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