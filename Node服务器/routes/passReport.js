var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');



router.get('/', function(req, res, next) {
    var bid = req.query.bid;
    var id = req.query.id;
    if (id && bid){
        var reportSql = `update userreport set hascheck = 'yes', checktime = now() where id = '${id}'`;
        db.query(reportSql, [], function (err, result) {
            if(!err){
                var userSql = `update user set score = score-5  where uid = '${bid}'`;
                db.query(userSql, [], function (err, result) {
                    if(!err){
                        res.json({
                            state: 'ok',
                            msg: '扣分成功'
                        })
                    }

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