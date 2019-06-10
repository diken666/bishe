var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var historySql = require('../db/user/carAllInfo');


router.get('/', function(req, res, next) {
    var uid = req.query.uid;
    var cid = req.query.cid;
    if (uid && cid){
        db.query(historySql.hasUser(uid), [], function (err, userArr) {
            if (userArr.length === 1) {
                db.query(historySql.hasCarInfo(cid), [], function (err, carArr) {
                    if (carArr.length === 1) {
                        db.query(historySql.hasHistory(uid, cid), [], function (err, hisArr) {
                            // 如果已经有此车辆的历史记录， 则只更新时间
                            if(hisArr.length === 1){
                                db.query(historySql.updateHistoryTime(uid, cid), [], function (err, response) {
                                    if (!err){
                                        res.json({
                                            state: 'ok',
                                            msg: '更新成功'
                                        })
                                    }
                                })
                            }
                            // 如果没有此车辆信息则添加新的记录
                            else{
                                db.query(historySql.addHistory(uid, cid), [], function (err, response) {
                                    if(!err){
                                        res.json({
                                            state: 'ok',
                                            msg: '添加成功'
                                        })
                                    }
                                })
                            }
                        })
                    }else{
                        res.json({
                            state: 'error',
                            msg: '该车辆未注册'
                        })
                    }
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