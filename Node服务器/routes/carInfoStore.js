var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var carInfoStoreSql = require('../db/user/carInfoStore');


router.get('/', function(req, res, next) {
    var method = req.query.method;
    var id = req.query.id;
    if (id && method){

        switch (method) {
            case 'shortInfo':
                var carname = req.query.carname;
                var cartype = req.query.cartype;
                var owner = req.query.owner;
                var place = req.query.place;
                var price = req.query.price;
                var firstPay = req.query.firstPay;
                var spsj = req.query.spsj;
                var distance = req.query.distance;
                var spd = req.query.spd;
                var pfbz = req.query.pfbz;
                var bsx = req.query.bsx;
                var pl = req.query.pl;
                var gh = req.query.gh;
                var njsj = req.query.njsj;
                var jqx = req.query.jqx;
                var syx = req.query.syx;
                console.log(carInfoStoreSql.shortInfoStore(id, carname, cartype, owner, place, price, firstPay, spsj, distance, spd, pfbz, bsx, pl, gh, njsj, jqx, syx))
                db.query(carInfoStoreSql.shortInfoStore(id, carname, cartype, owner, place, price, firstPay, spsj, distance, spd, pfbz, bsx, pl, gh, njsj, jqx, syx), [], function(err, response){
                    if(!err){
                        res.json({
                            state: 'ok',
                            msg: '【基本信息】修改成功'
                        })
                    }
                });
                break;
            case 'baseInfo':
                var company = req.query.company;
                var engine = req.query.engine;
                var baseInfo_bsx = req.query.bsx;
                var body = req.query.body;
                var size = req.query.size;
                var zj = req.query.zj;
                var weight = req.query.weight;
                db.query(carInfoStoreSql.baseInfoStore(id, company, engine, baseInfo_bsx, body, size, zj, weight),
                    [], function(err, response){
                        if (!err){
                            res.json({
                                state: 'ok',
                                msg: '【基本参数】修改成功'
                            })
                        }
                    });
                break;
            case 'engineInfo':
                var engine_pl = req.query.pl;
                var jqxs = req.query.jqxs;
                var qg = req.query.qg;
                var zdml = req.query.zdml;
                var zdnj = req.query.zdnj;
                var rllx = req.query.rllx;
                var rlbh = req.query.rlbh;
                var gyfs = req.query.gyfs;
                var engine_pfbz = req.query.pfbz;
                db.query(carInfoStoreSql.engineInfoStore(id, engine_pl, jqxs, qg, zdml, zdnj, rllx, rlbh, gyfs, engine_pfbz),
                    [], function(err, response){
                        if (!err){
                            res.json({
                                state: 'ok',
                                msg: '【发动机参数】修改成功'
                            })
                        }
                    });
                break;
            case 'stopInfo':
                var qdfs  = req.query.qdfs;
                var zlfs  = req.query.zlfs;
                var qxglx  = req.query.qxglx;
                var hxglx  = req.query.hxglx;
                var qzdlx  = req.query.qzdlx;
                var hzdlx  = req.query.hzdlx;
                var qltgg  = req.query.qltgg;
                var hltgg  = req.query.hltgg;
                db.query(carInfoStoreSql.stopInfoStore(id, qdfs, zlfs, qxglx, hxglx, qzdlx, hzdlx, qltgg, hltgg),
                    [], function(err, response){
                        if (!err){
                            res.json({
                                state: 'ok',
                                msg: '【底盘及制动】修改成功'
                            })
                        }
                    });
                break;
            case 'safeInfo':
                var aqqn = req.query.aqqn;
                var tyjc = req.query.tyjc;
                var cnzks = req.query.cnzks;
                var zyjk  = req.query.zyjk;
                var wysqd = req.query.wysqd;
                var abs = req.query.abs;

                db.query(carInfoStoreSql.safeInfoStore(id, aqqn, tyjc, cnzks, zyjk, wysqd, abs), [],
                    function(err, response){
                        if (!err){
                            res.json({
                                state: 'ok',
                                msg: '【安全配置】修改成功'
                            })
                        }
                    });
                break;
            case 'outsideInfo':
                var ddcc = req.query.ddcc;
                var qjtc = req.query.qjtc;
                var ddxhm = req.query.ddxhm;
                var qhddcc = req.query.qhddcc;
                var ddtj = req.query.ddtj;
                var hsjjr = req.query.hsjjr;
                db.query(carInfoStoreSql.outsideInfoStore(id, ddcc, qjtc, ddxhm, qhddcc, ddtj, hsjjr), [],
                    function(err, response){
                        if (!err){
                            res.json({
                                state: 'ok',
                                msg: '【外部配置】修改成功'
                            })
                        }
                    });
                break;
            case 'insideInfo':
                var fxp = req.query.fxp;
                var dsxh = req.query.dsxh;
                var kt = req.query.kt;
                var gps = req.query.gps;
                db.query(carInfoStoreSql.insideInfoStore(id, fxp, dsxh, kt, gps), [], function(err, response){
                    if (!err){
                        res.json({
                            state: 'ok',
                            msg: '【内部配置】修改成功'
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