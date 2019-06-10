var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var userReportSql = require('../db/user/userReport');


router.get('/', function(req, res, next) {
    var uname = req.query.uname;
    var bname = req.query.bname;
    var uid = req.query.uid;
    var bid = req.query.bid;
    var type = parseInt(req.query.type);
    var reason = req.query.reason;
    var uphone = req.query.uphone;
    var typeRange = ['垃圾营销', '不实信息', '有害信息', '违法信息', '淫秽色情', '人身攻击'];

    if (uname && bname && uid && bid && typeRange[type] && reason){
        db.query(userReportSql.hasUser(uid, bid), [], function (err, userArr) {
            if (userArr.length === 2) {
                db.query(userReportSql.addReport(uname, bname, uid, bid, typeRange[type], reason, uphone), [], function (err, respnose) {
                    if(!err){
                        res.json({
                            state: 'ok',
                            msg: '举报成功！',
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