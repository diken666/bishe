var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var carSelect = require('../db/user/carAllInfo');


router.get('/', function(req, res, next) {
    var id = req.query.id;
    if (id){
        db.query(carSelect.selectCarShortInfo(id), [], function(err, shortInfo){
            if (shortInfo.length === 1){
                db.query(carSelect.selectBaseCarInfo(id),[], function(err, baseInfo){
                    db.query(carSelect.selectEngineInfo(id),[],function (err, engineInfo){
                        db.query(carSelect.selectInsideInfo(id), [], function (err, insideInfo) {
                            db.query(carSelect.selectOutsideInfo(id),[], function (err, outsideInfo) {
                                db.query(carSelect.selectSafeInfo(id), [], function (err, safeInfo) {
                                    db.query(carSelect.selectStopCarInfo(id), [], function (err, stopInfo) {
                                        db.query(carSelect.selectCarComment(id), [], function(err, comments){
                                            db.query(carSelect.selectFeedbackError(id), [], function(err, feedbackerr){
                                                // var titleArr = ["车辆信息","基本参数","发动机参数","底盘及制动","安全配置","外部配置","内部配置"];
                                                for(let i=0; i<feedbackerr.length; i++){
                                                    switch (feedbackerr[i].title) {
                                                        case 0: feedbackerr[i].title = '车辆信息'; break;
                                                        case 1: feedbackerr[i].title = '基本参数'; break;
                                                        case 2: feedbackerr[i].title = '发动机参数'; break;
                                                        case 3: feedbackerr[i].title = '底盘及制动'; break;
                                                        case 4: feedbackerr[i].title = '安全配置'; break;
                                                        case 5: feedbackerr[i].title = '外部配置'; break;
                                                        case 6: feedbackerr[i].title = '内部配置'; break;
                                                    }
                                                }
                                                db.query(carSelect.selectCarPic(id), [], function (err, picInfo) {
                                                    var outsidePic = picInfo[0].outside.split('#').slice(0, -1);
                                                    var insidePic = picInfo[0].outside.split('#').slice(0, -1);
                                                    var enginePic = picInfo[0].engine.split('#').slice(0, -1);

                                                    for (let i=0; i< outsidePic.length; i++){
                                                        if(!outsidePic[i].startsWith('https://')){
                                                            outsidePic[i] = 'https:' + outsidePic[i].split('?')[0]
                                                        }else{
                                                            outsidePic[i] = outsidePic[i].split('?')[0]
                                                        }
                                                    }
                                                    for (let i=0; i< insidePic.length; i++){
                                                        if(!insidePic[i].startsWith('https://')){
                                                            insidePic[i] = 'https:' + insidePic[i].split('?')[0]
                                                        }else{
                                                            insidePic[i] = insidePic[i].split('?')[0]
                                                        }
                                                    }
                                                    for (let i=0; i< enginePic.length; i++){
                                                        if(!enginePic[i].startsWith('https://')){
                                                            enginePic[i] = 'https:' + enginePic[i].split('?')[0]
                                                        }else{
                                                            enginePic[i] = enginePic[i].split('?')[0]
                                                        }
                                                    }
                                                    res.json({
                                                        id,
                                                        shortInfo: shortInfo[0],
                                                        baseInfo: baseInfo[0],
                                                        engineInfo: engineInfo[0],
                                                        insideInfo: insideInfo[0],
                                                        outsideInfo: outsideInfo[0],
                                                        safeInfo: safeInfo[0],
                                                        stopInfo: stopInfo[0],
                                                        comments,
                                                        feedbackerr,
                                                        picInfo:{
                                                            outside: outsidePic,
                                                            inside: insidePic,
                                                            engine: enginePic
                                                        }
                                                    })
                                                })
                                            });
                                        });

                                    })

                                })

                            })

                        })

                    })
                })
            } else{
                res.json({
                    state: 'error',
                    msg: '无此车辆信息'
                })
            }
        })

    }else{
        res.json({
            state: 'error',
            msg: '请求参数错误'
        })
    }
});


router.post('/', function(req, res, next){

});
module.exports = router;