var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var feedbackSql = require('../db/user/feedbackError');


router.get('/', function(req, res, next) {
    var uid = req.query.uid;
    var fid = req.query.fid;
    if (uid && fid){
        db.query(feedbackSql.addFriend(uid, fid), [], function (err, response) {
            if(!err){
                res.json({
                    state: 'ok',
                    msg: '添加成功！'
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