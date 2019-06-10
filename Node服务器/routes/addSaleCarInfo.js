var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var addSaleCarInfo = require('../db/user/addSaleCarInfo');


router.get('/', function(req, res, next) {
    var uid = req.query.uid;
    var city = req.query.city;
    var cartype = req.query.cartype;
    var date = req.query.date;
    var distance = req.query.distance;
    var appraise = req.query.appraise;


    if (uid && city && cartype && date && distance && appraise){
        db.query(addSaleCarInfo.hasTheUser(uid), [], function (err, userArr) {
            if (userArr.length === 1) {
                console.log(addSaleCarInfo.addSaleCarInfo(uid, city, cartype, date, distance, appraise))
                db.query(addSaleCarInfo.addSaleCarInfo(uid, city, cartype, date, distance, appraise), [], function (err, respnose) {
                    if(!err){
                        res.json({
                            state: 'ok',
                            msg: '预约成功，等待管理员回复',
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