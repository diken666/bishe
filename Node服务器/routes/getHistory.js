var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var historySql = require('../db/user/carAllInfo');


router.get('/', function(req, res, next) {
    var uid = req.query.uid;
    if (uid){
        db.query(historySql.hasUser(uid), [], function (err, userArr) {
            if (userArr.length === 1) {

                db.query(historySql.getUserHistory(uid), [], function(err, historyArr){
                    if (historyArr.length > 0){
                        var carIDArr = [];
                        for(let i=0; i<historyArr.length; i++){
                            if (carIDArr.indexOf(historyArr[i].cid) === -1){
                                carIDArr.push(historyArr[i].cid)
                            } 
                        }
                        db.query(historySql.getCarPic(carIDArr), [], function (err, picArr) {
                            if (!err){
                                for(let i=0; i<historyArr.length; i++){
                                    for(let j=0; j<picArr.length; j++){
                                        if (historyArr[i].cid === picArr[j].id){
                                            var tempPic = picArr[j].outside.split('#')[0].split('?')[0];
                                            if (tempPic.startsWith('//')){
                                                tempPic = 'https:'+tempPic
                                            }
                                            historyArr[i].pic = tempPic;
                                            break;
                                        } 
                                    }
                                }
                                db.query(historySql.getCarShortInfo(carIDArr), [], function(err, shortInfo){
                                    if (!err){
                                        for(let i=0; i<historyArr.length; i++){
                                            for(let j=0; j<shortInfo.length; j++){
                                                if (historyArr[i].cid === shortInfo[j].id){
                                                    historyArr[i].carName = shortInfo[j].carname;
                                                    historyArr[i].carPrice = shortInfo[j].price;
                                                    historyArr[i].location = shortInfo[j].place;
                                                    break;
                                                }
                                            }
                                        }

                                        res.json({
                                            state: 'ok',
                                            msg:'请求成功！',
                                            data: historyArr
                                        })
                                    }
                                })

                            } 
                        })
                    }else{
                        res.json({
                            state: 'ok',
                            msg: '请求成功！',
                            data: []
                        })
                    }
                });

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