

var obj = {
    hasUser(uid, bid){
        return `select * from user where uid = '${uid}' or uid = '${bid}'`
    },
    hasTheUser(uid){
        return `select * from user where uid = '${uid}'`
    },
    addReport(uname, bname, uid, bid, type, reason, uphone){
        return `insert into userreport(uname, bname, uid, bid, type, reason, uphone, time) 
values('${uname}', '${bname}', '${uid}', '${bid}', '${type}', '${reason}', '${uphone}', now())`
    },
    selectReport(uid){
        return `select * from userreport where uid = '${uid}' or bid = '${uid}' order by time desc`
    }

};


module.exports = obj;