
var obj = {
    hasCar(id){
        return `select * from shortcarinfo where id = ${id}`
    },
    hasUser(id){
        return `select * from user where uid = '${id}'`
    },
    insertData(cid, cname, uid, uname, title, content){
        return `insert into feedbackerror(cid, cname, uid, uname, title, content, publishtime) values (${cid}, '${cname}', ${uid}, '${uname}', '${title}', '${content}', now())`
    },
    hasSearchUser(uid){
        return `select * from user where uid like '%${uid}%' or name like '%${uid}%'`
    },
    addFriend(uid, fid){
        return `insert into friends(uid, fid) values ('${uid}', '${fid}')`
    },
    removeFriend(uid, fid){
        return `delete from friends where uid ='${uid}' and fid = '${fid}'`
    }
};

module.exports = obj;