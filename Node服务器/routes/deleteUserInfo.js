var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');


router.get('/', function(req, res, next) {
    var uid = req.query.uid;
    var sql = `delete from user where uid = '${uid}'`;
    res.header("Access-Control-Allow-Origin", "*");

    if(uid){
        db.query(sql, [], function (err, response) {
            if(!err){
                res.json({
                    state: 'ok',
                    msg: '操作成功！',
                })
            }
        })
    }else{
        res.json({
            state: 'error',
            msg: '参数错误！',
        })
    }
});






module.exports = router;