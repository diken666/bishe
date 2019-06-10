var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');

var sql = 'select * from user';


router.get('/', function(req, res, next) {
    db.query(sql, [], function (err, userArr) {
        if(!err){
            res.header("Access-Control-Allow-Origin", "*");
            res.json({
                state: 'ok',
                msg: '请求成功！',
                data: userArr
            })
        }
    })
});






module.exports = router;