var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');




router.get('/', function(req, res, next) {

    var sql = 'select * from question order by time desc ';
    db.query(sql, [], function(err, response){
        if (!err){
            res.json({
                state: "ok",
                msg: "请求成功",
                data: response
            })
        }
    })
});


router.post('/', function(req, res, next){

});
module.exports = router;