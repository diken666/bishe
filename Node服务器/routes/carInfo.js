var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var carSelect = require('../db/user/carInfoSelect');


router.get('/', function(req, res, next) {
    if (req.query.id){
        db.query(carSelect.select(req.query.id, 'shortcarinfo'), [], function(err, shortcarinfos){
            db.query(carSelect.select(req.query.id, 'carpic'), [], function(err, carpics){
                res.render('carInfo', {shortInfo: shortcarinfos[0], pic: carpics[0]});
            });
        });

    }else{
        res.render('carInfo', {call: false, msg:''});
    }
});


router.post('/', function(req, res, next){

});
module.exports = router;