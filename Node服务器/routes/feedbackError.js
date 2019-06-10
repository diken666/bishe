var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var feedbackSql = require('../db/user/feedbackError');


router.get('/', function(req, res, next) {
    var cid = req.query.cid;
    var uid = req.query.uid;
    var titleIndex = parseInt(req.query.title);
    var content = req.query.content;
    // var titleArr = ["车辆信息","基本参数","发动机参数","底盘及制动","安全配置","外部配置","内部配置"];
    if (cid && uid && titleIndex){
        db.query(feedbackSql.hasCar(cid), [], function (err, carArr) {
            if (carArr.length === 1) {
                db.query(feedbackSql.hasUser(uid), [], function (err, userArr) {
                    if (userArr.length === 1){
                        db.query(feedbackSql.insertData(cid, carArr[0].carname, uid, userArr[0].name, titleIndex, content), [], function (err, response) {
                            if(!err){
                                res.json({
                                    state: 'ok',
                                    msg: '提交成功！'
                                })
                            }
                        })
                    } else{
                        res.json({
                            state: 'error',
                            msg: '无此用户信息'
                        })
                    }
                })
            }else{
                res.json({
                    state: 'error',
                    msg: '无此车辆信息'
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