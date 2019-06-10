var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var userSql = require('../db/user/userSql');

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('register', {call: false, msg:''});
// });

router.get('/', function(req, res, next){
    var date = new Date();
    var time = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    if(req.query.uid && req.query.password && req.query.name && req.query.location && req.query.phone){
        var insert = [
            req.query.uid,
            req.query.password,
            req.query.name,
            req.query.sex,
            req.query.location,
            parseInt(req.query.phone),
            time
        ];
        try{
            db.query(userSql.query, [], function(err, all){
                var uidArr = [];
                for(var i=0; i<all.length; i++){
                    uidArr.push(all[0].uid)
                }
                if(uidArr.indexOf(parseInt(req.body.uid)) === -1){
                    db.query(userSql.insert, insert, function(err, rows){
                        // res.render('register', {call: false, msg: '成功！'});
                        res.json({
                            state: 'ok',
                            msg: '注册成功！'
                        })
                    })
                }else{
                    // res.render('register', {call: true, msg:''})
                    res.json({
                        state: 'error',
                        msg: '该账号已注册！'
                    })
                }

            })

        }catch (e) {
            console.log('err: ', e);
            // res.render('register', {call: false, msg: '出错了!'})
            res.json({
                state:'error',
                msg: e.toString()
            })
        }
    }else{
        res.json({
            state:'error',
            msg: '请求错误！',
            time
        })
    }

});
module.exports = router;
