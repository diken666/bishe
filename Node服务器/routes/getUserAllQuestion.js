var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var questionSql = require('../db/user/question');


router.get('/', function(req, res, next) {
    db.query(questionSql.selectAllQuestion(), [], function (err, result) {
        if(!err){
            var uidArr = [];
            for(let i=0; i<result.length; i++){
                if (uidArr.indexOf(result[i].uid) === -1) {
                    uidArr.push(result[i].uid)
                }
            }

            db.query(questionSql.selectUserName(uidArr), [], function(err, nameArr){
                for(let i=0; i<result.length; i++){
                    for(let j=0; j<nameArr.length; j++){
                        if (result[i].uid === nameArr[j].uid){
                            result[i].name = nameArr[j].name;
                            result[i].image = nameArr[j].link;
                            continue;
                        }
                    }
                }
                res.json({
                    state: 'ok',
                    msg: '获取成功！',
                    items: result
                })
            })
        }
    })
});






module.exports = router;