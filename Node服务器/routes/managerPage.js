var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var userSql = require('../db/user/userSql');



router.get('/', function(req, res, next) {
    if(req.cookies.mid){
        res.render('managerPage', {})
    }else{
        res.redirect('../manageLogin');
    }

});


router.post('/', function(req, res, next){

});





module.exports = router;