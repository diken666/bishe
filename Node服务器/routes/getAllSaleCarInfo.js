var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');



router.get('/', function(req, res, next) {
    var sql = `select * from salecarinfo`;
    db.query(sql, [], function (err, result) {
        if(!err){
            res.json({
                state: 'ok',
                msg: '获取成功',
                data: result
            })
        }

    })
});






module.exports = router;