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
                db.query(historySql.hasHistory(uid, cid), [], function (err, hisArr) {
                    if(hisArr.length === 1){
                        db.query(historySql.delCarHistory(uid, cid), [], function (err, response) {
                            if (!err){
                                res.json({
                                    state: 'ok',
                                    msg: '删除成功'
                                })
                            }
                        })
                    }else{
                        res.json({
                            state: 'error',
                            msg: '无此车辆历史记录'
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