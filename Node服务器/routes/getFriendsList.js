var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var friendsSql = require('../db/user/friends');


router.get('/', function(req, res, next) {
    var uid = req.query.uid;
    if (uid){
        db.query(friendsSql.hasUser(uid), [], function(err, uidArr){
            // 查询是否存在该用户
            if (uidArr.length === 1){
                db.query(friendsSql.selectFriendsList(uid), [], function (err, result) {
                    if (result.length !== 0){
                        db.query(friendsSql.selectFriendsInfo(result), [], function (err, infoItems) {
                            if(!err){
                                res.json({
                                    state: 'ok',
                                    msg: '请求成功',
                                    items: infoItems
                                })
                            }
                        })
                    } else{
                        res.json({
                            state: 'ok',
                            msg: '请求成功',
                            items: []
                        })
                    }

                })
            } else{
                res.json({
                    state: 'error',
                    msg: 'uid错误，无此用户'
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