var mysql = require('mysql');
var pool = mysql.createPool({

    host:"localhost",           //数据库
    user:"root",                  //用户名
    password:"123456",            //用户密码
    database:"mydb"           //数据库名

});

function query(sql, values, callback){
    pool.getConnection(function (err, connection) {
        if(err){
            console.log('error:', err);
        }else{
            connection.query(sql, values, function(err, results, fields){
                // console.log(JSON.stringify(results));
                callback(err, results);
                connection.release();
                if(err){
                    throw err;
                }
            })
        }
    })
}

exports.query = query;