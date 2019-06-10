
var obj = {

    hasUser(uid){
        return `select * from user where uid = '${uid}'`
    },
    hasCar(cid){
        return `select * from shortcarinfo where id = ${cid}`
    },
    hasComment(id){
        return `select * from comment where id = ${id}`
    },
   submitComment(uid, cid, content, uname){
       return `insert into comment(uid, cid , content, likes, time, uname) values (${uid}, ${cid}, '${content}', 0, now(), '${uname}')`
   },
    getComment(cid){
        return `select * from comment where cid = ${cid} order by time desc`
    },
    likeComment(id){
        return `update comment set likes=likes+1 where id = ${id}`
    }

};

module.exports = obj;