var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var headPicSql = require('../db/user/headPic');
var multer = require('multer');
var path = require("path");

const storage = multer.diskStorage({
    //文件存储位置
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../public/img/'));
    },
    //文件名
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${Math.ceil(Math.random() * 1000)}_multer.${file.originalname.split('.').pop()}`);
    }
});
const uploadCfg = {
    storage: storage,
    limits: {
        //上传文件的大小限制,单位bytes
        fileSize: 1024 * 1024 * 20
    }
};


router.post('/', (req, res)=>{

    let upload = multer(uploadCfg).any();
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        var uid = req.body.uid;
        let uploadFile = req.files[0];
        db.query(headPicSql.updataPic(uid, uploadFile.filename), [], function (err, response) {
           if (!err){
               db.query(headPicSql.updateChatSimg(uid, uploadFile.filename), [], function(err, simgRes){
                   if (!err){
                       db.query(headPicSql.updateChatLimg(uid, uploadFile.filename), [], function(err, limgRes){
                           if (!err){
                               res.json({
                                   state: 'ok',
                                   msg: '修改成功'
                               })
                           }
                       })
                   }
               })
           }else{
               res.json({
                   state: 'error',
                   msg: '头像修改失败'
               })
           }
        });
    });
});

module.exports = router;