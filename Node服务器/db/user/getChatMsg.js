
var obj = {

    hasUser(uid){
        return `select * from user where uid = '${uid}'`
    },
    getChatMsg(uid){
        return `select * from chat where lid = '${uid}' order by time desc`
    },
    getTwoPersonChatMsg(uid, sid){
        return `select * from chat where (sid = '${uid}' or lid = '${uid}') and (sid = '${sid}' or lid ='${sid}') order by time`
    },
    insertChatMsg(sid, sname, simg, lid, lname, limg, content){
        return `insert into chat(sid, sname, simg, lid, lname, limg, content, time, isread) 
values ('${sid}', '${sname}', '${simg}', '${lid}', '${lname}', '${limg}', '${content}', now(), 'false')`
    }



};

module.exports = obj;