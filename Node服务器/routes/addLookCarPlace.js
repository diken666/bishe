var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');



router.get('/', function(req, res, next) {
    var id = req.query.id;
    var place = req.query.place;
    if (id && place){
        var sql = `update salecarinfo set checkplace = '${place}', checktime = now() where id = ${id}`;
        db.query(sql, [], function (err, result) {
            if(!err){
                res.json({
                    state: 'ok',
                    msg: '操作成功',
                })
            }

        })
    } else{
        res.json({
            state: 'error',
            msg: '参数错误',
        })
    }


});






module.exports = router;