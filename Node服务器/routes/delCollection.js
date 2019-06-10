var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var collectionSql = require('../db/user/collection');


router.get('/', function(req, res, next) {
    var uid = req.query.uid;
    var cid = req.query.cid;
    if (uid && cid){
        db.query(collectionSql.selectUser(uid), [], function(err, result){
            // 查询是否存在该用户
            if(result.length !== 0){
                // 查询该车辆是否已经加入收藏夹
                db.query(collectionSql.selectCollection(uid, cid), [], function (err, collecRes) {
                    // console.log(collecRes)
                    // 如果未存在，那么添加到collection表中, 否则认为是取消收藏
                    if (collecRes.length === 1){
                        db.query(collectionSql.deleteFromCollection(uid, cid), [], function (err, response){
                            if(!err){
                                res.json({
                                    state: 'ok',
                                    msg: '删除成功'
                                })
                            }
                        })
                    }else{
                        res.json({
                            state: 'error',
                            msg: '用户未收藏此车辆'
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