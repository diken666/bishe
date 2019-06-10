var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var carEvaluateSql = require('../db/user/carEvaluate');


router.get('/', function(req, res, next) {
    var cartype = req.query.cartype.toUpperCase();
    var date = req.query.date;
    var dataFrom = req.query.dataFrom;
    if (cartype && date && dataFrom){

        // 因为瓜子二手车和人人车的车名不同， 所以要对cartype进行处理
        var charIndex = null;
        var carname = null;
        var type = null;
        //获取字母出现的位置
        for(let i=0; i< cartype.length; i++){
            if(cartype.charCodeAt(i) >= 65 && cartype.charCodeAt(i) <= 90){
                charIndex = i;
                break;
            }
        }
        if(charIndex !== null){
            carname = cartype.slice(0, charIndex);
            type = cartype.slice(charIndex)
        }else{
            carname = cartype;
            type = '';
        }
        console.log(carEvaluateSql.getCarEvaluateInfo(carname, type, date, dataFrom));
        db.query(carEvaluateSql.getCarEvaluateInfo(carname, type, date, dataFrom),[], function(err, result){
            db.query(carEvaluateSql.getMoreInfo(carname, type), [], function(err, moreResult){
                if(!err){

                    result[0].price = result[0].price?result[0].price.toFixed(2):null;
                    moreResult[0].price = moreResult[0].price?moreResult[0].price.toFixed(2):null;
                    res.json({
                        state: 'ok',
                        msg: '请求成功',
                        thisYearResult: result[0],
                        allResult: moreResult[0]
                    })
                }
            });
        })
    } else{
        res.json({
            state: 'error',
            msg: '参数错误'
        })
    }

});






module.exports = router;