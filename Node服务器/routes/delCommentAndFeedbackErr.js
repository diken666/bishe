var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');




router.get('/', function(req, res, next) {
    var id = req.query.id;
    var type = req.query.type;
    if (id && type){

        if(type === 'comment'){
            let sql = `delete from comment where id = ${id}`;
            db.query(sql, [], function(err, response){
                if (!err){
                    res.json({
                        state: "ok",
                        msg: "评论删除成功"
                    })
                }
            })
        }
        else if(type === 'feedbackErr'){
            let sql =  `delete from feedbackerror where id = ${id}`
            db.query(sql, [], function(err, response){
                if (!err){
                    res.json({
                        state: "ok",
                        msg: "反馈删除成功"
                    })
                }
            })
        }

    }else{
        res.json({
            state: 'error',
            msg: '参数错误！'
        })
    }
});


router.post('/', function(req, res, next){

});
module.exports = router;