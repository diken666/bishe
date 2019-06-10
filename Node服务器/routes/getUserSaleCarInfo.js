var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');



router.get('/', function(req, res, next) {
    var uid = req.query.uid;
    var sql = `select * from salecarinfo where uid = '${uid}'`;
    if (uid){
        db.query(sql, [], function (err, result) {
            if(!err){
                res.json({
                    state: 'ok',
                    msg: '获取成功',
                    data: result
                })
            }

        })
    } else{
        res.json({
            state: 'error',
            msg: '参数错误'
        })
    }

});






module.exports = router;