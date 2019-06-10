var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var userSql = require('../db/user/userSql');



router.get('/', function(req, res, next) {
    res.render('manageLogin', {method: 'get', state: 'ok', msg:''})
});


router.post('/', function(req, res, next){
    var uid = req.body.uid;
    var password = req.body.password;

    if(uid && password){
        try{
            db.query(userSql.managerSelect, [], function(err, all){
                var hasUid = false;
                for(var i=0; i<all.length; i++){
                    if(all[i].mid === uid){
                        hasUid = true;
                        if(all[i].password === password){
                            // res.cookie('manageName', all[i].name ,{expires:new Date(Date.now() + 86400000)});
                            res.cookie('mid', all[i].mid ,{expires:new Date(Date.now() + 86400000)});
                            res.render('manageLogin', {method: 'post', state: 'ok', msg:'登录成功'})
                        }
                        else{
                            res.render('manageLogin', {method: 'post', state: 'error', msg:'密码错误'})
                        }
                        break;
                    }
                }
                if(!hasUid){
                    res.render('manageLogin', {method: 'post', state: 'error', msg:'无此用户'})
                }
            });

        }catch (e) {
            res.render('manageLogin', {method: 'post', state: 'error', msg:'错误'})
        }
    }
});





module.exports = router;