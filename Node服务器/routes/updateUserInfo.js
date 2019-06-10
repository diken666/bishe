var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');




router.get('/', function(req, res, next) {
    var uid = req.query.uid;
    var password = req.query.password;
    var name = req.query.name;
    var sex = req.query.sex;
    var location = req.query.location;
    var phone = req.query.phone;
    var link = req.query.link;
    var score = req.query.score;
    var sql = `update user set password='${password}', name='${name}', sex='${sex}', location='${location}'
, phone='${phone}', link='${link}', score='${score}' where uid='${uid}'`;
    res.header("Access-Control-Allow-Origin", "*");
    if(uid && password && name && sex && location && phone && score){
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