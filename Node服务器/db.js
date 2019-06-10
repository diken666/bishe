var db = require('./db/user/dbConnect');
var userSql = require('./db/user/userSql');

var results = {};

db.query(userSql.query, [], function(err, rows){
    results = rows;
    // console.log('results: '+ results)
});
// db.query(userSql.insert, ['222', 'mini'], function(err, rows){
//     results = rows;
//     console.log('results: '+ results)
// });