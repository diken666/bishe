
var obj = {
    selectUser: function(id){
        return `select * from user where uid = '${id}';`
    },
    selectCollection: function(uid, cid){
        return `select * from collection where uid = '${uid}' and cid= '${cid}';`
    },
    insertIntoCollection: function(uid, cid){
        return `insert into collection(uid, cid) values ('${uid}', '${cid}')`
    },
    deleteFromCollection: function(uid, cid){
        return `delete from collection where uid = '${uid}' and cid = '${cid}'`
    },
    showCollection: function (uid) {
        return `select * from collection where uid = '${uid}'`
    },
    selectCarInfo: function(arr){
        var sql = 'select * from shortcarinfo where '
        for(let i=0; i<arr.length; i++){
            if(i === 0){
                sql += ' id = ' + '"'+ arr[i].cid + '"';
            }else{
                sql += ' or id = ' + '"' + arr[i].cid + '"'
            }
        }
        return sql
    },
    selectCarPic: function (arr) {
        var sql =  'select * from carpic where ';
        for(let i=0; i<arr.length; i++){
            if(i === 0){
                sql += ' id = ' + '"' + arr[i].cid+'"'
            }else{
                sql += ' or id = ' + '"' + arr[i].cid + '"'
            }
        }
        return sql;
    }
};

module.exports = obj;