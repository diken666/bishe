var express = require('express');
var router = express.Router();
var db = require('../db/user/dbConnect');
var questionSql = require('../db/user/question');


router.get('/', function(req, res, next) {
    var qid = req.query.qid;
    if (qid){
        db.query(questionSql.hasArticle(qid), [], function (err, result) {
            if (result.length === 1){
                db.query(questionSql.selectComment(qid), [], function(err, commentArr){
                    if(commentArr.length > 0){
                        var arr = [];
                        for(let i=0; i<commentArr.length; i++){
                            if (arr.indexOf(commentArr[i].uid) === -1){
                                arr.push(commentArr[i].uid)
                            }
                        }
                        db.query(questionSql.selectUserName(arr), [], function(err, nameArr){
                            for (let i=0; i<commentArr.length; i++){
                                for(let j=0; j<nameArr.length; j++){
                                    if (commentArr[i].uid === nameArr[j].uid){
                                        commentArr[i].name = nameArr[j].name;
                                        commentArr[i].link = nameArr[j].link;
                                        continue;
                                    }
                                }
                            }
                            res.json({
                                state: 'ok',
                                msg: '请求成功！',
                                result: commentArr
                            })
                        })

                    }else{
                        res.json({
                            state: 'ok',
                            msg: '请求成功',
                            result: []
                        })
                    }


                    // if (!err){
                    //     res.json({
                    //         state: 'ok',
                    //         msg: '请求成功',
                    //         result: {
                    //             userInfo: userArr[0],
                    //             articleInfo: result[0]
                    //         }
                    //     })
                    // }
                })
            } else{
                res.json({
                    state: 'error',
                    msg: '无此文章信息'
                })
            }
        })
    } else{
        res.json({
            state: 'error',
            msg: '请求参数错误'
        })
    }

});






module.exports = router;