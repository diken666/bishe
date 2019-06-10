var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var collectionSql = require('../db/user/collection');


router.get('/', function(req, res, next) {
    var uid = req.query.uid;
    if (uid){
        db.query(collectionSql.selectUser(uid), [], function(err, result){
            // 查询是否存在该用户
            if(result.length !== 0){
                // 查询该车辆是否已经加入收藏夹
                db.query(collectionSql.showCollection(uid), [], function (err, collecRes) {
                    // 检查收藏列表是否为空
                    if (collecRes.length !== 0){
                        // 获取汽车信息简介
                        db.query(collectionSql.selectCarInfo(collecRes), [], function(err, carItem){
                            // 获取汽车图片
                            db.query(collectionSql.selectCarPic(collecRes), [], function (err, carPic) {
                                let picArr = [];
                                for(let i=0; i<carPic.length; i++){
                                   var cover = carPic[i].outside.split('#')[0];
                                   if (cover.startsWith('//')){
                                       cover = 'https:' + cover
                                   }
                                   picArr.push(cover)
                                }
                                res.json({
                                    state: 'ok',
                                    msg: '请求成功',
                                    item: carItem,
                                    pics: picArr
                                })
                            });
                        })

                    } else{
                        res.json({
                            state: 'ok',
                            msg: '请求成功',
                            data: []
                        })
                    }

                })
            }else{
                res.json({
                    state: 'error',
                    msg: '不存在该用户'
                })
            }
        });

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