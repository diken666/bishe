var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var userSql = require('../db/user/userSql');

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('userLogin', {call: false, msg:''});
// });


router.get('/', function(req, res, next){
    var uid = req.query.uid;
    var password = req.query.password;
    if(uid && password){
        try{

            db.query(userSql.query, [], function(err, all){
                var hasUid = false;
                for(var i=0; i<all.length; i++){
                    if(all[i].uid === uid){
                        hasUid = true;
                        if(all[i].password === password){
                            // res.cookie('userName', all[i].name ,{expires:new Date(Date.now() + 86400000)});
                            // res.cookie('uid', all[i].uid ,{expires:new Date(Date.now() + 86400000)});
                            // res.render('userLogin', {call: false, msg:'成功'})
                            res.json({
                                state: 'ok',
                                msg: '登录成功！',
                                uid,
                                name: all[i].name
                            })
                        }
                        else{
                            // res.render('userLogin', {call: true, msg:''})
                            res.json({
                                state: 'error',
                                msg: '密码错误！'
                            })
                        }
                        break;
                    }
                }
                if(!hasUid){
                    res.json({
                        state: 'error',
                        msg: '该用户没有注册！'
                    })
                    // res.render('userLogin', {call: true, msg:''})
                }
            });

        }catch (e) {
            // res.render('userLogin', {call: false, msg:'错误'})
            res.json({
                msg:e,
                state: 'error'
            })
        }
    }else{
        res.json({
            msg: '请求错误！',
            state: 'error'
        })
    }

});
module.exports = router;