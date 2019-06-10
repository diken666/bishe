
var obj = {
    hasUser(id) {
        return `select * from user where uid = '${id}'`
    },
    selectFriendsList(id){
        return `select * from friends where uid = '${id}'`
    },
    selectFriendsInfo(array){
        var tempSql = 'select * from user where uid = '
        for(let i=0; i<array.length; i++){
            if (i===0){
                tempSql += '"'+ array[i].fid +'" '
            }else{
                tempSql += 'or uid = "'+ array[i].fid +'" '
            }
        }
        tempSql += ' order by name';
        return tempSql
    }
};

module.exports = obj;