var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');



router.get('/', function(req, res, next) {
    var id = req.query.id;
    var sql = `delete from chat where id = ${id}`;
    db.query(sql, [], function (err, result) {
        if(!err){
            res.json({
                state: 'ok',
                msg: '记录删除成功',
            })
        }

    })

});






module.exports = router;