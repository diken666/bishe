var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');



router.get('/', function(req, res, next) {
    var id = req.query.id;
    if (id){
        var sql = `delete from userreport where id='${id}'`;
        db.query(sql, [], function (err, result) {
            if(!err){
                res.json({
                    state: 'ok',
                    msg: '举报信息删除成功'
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