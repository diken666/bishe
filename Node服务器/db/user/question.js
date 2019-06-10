

var obj = {
    hasArticle(id){
      return `select * from question where id = ${id}`
    },
    getUserInfo(uid){
      return `select * from user where uid = '${uid}'`
    },
    insertIntoQuestion(uid, title, content){
        return `insert into question(uid, title, content, looknum, replynum, time)
 values ('${uid}', '${title}', '${content}', 0, 0, now())`
    },
    selectQuestion(){
        return `select * from question order by time desc limit 3`
    },
    selectAllQuestion(){
        return `select * from question order by time desc`
    },
    selectUserName(arr){
        var sql = 'select * from user where uid = ';
        if (arr.length !== 0){
            for(let i=0; i<arr.length; i++){
                if (i === 0){
                    sql += `'${arr[i]}' `
                } else{
                    sql += `or uid = '${arr[i]}' `
                }
            }
            return sql
        } else{
            return
        }
    },

    selectComment(qid){
        return `select * from questioncomment where qid = '${qid}' order by time desc`
    },

    likeComment(qid, uid){
        return `update questioncomment set likes= likes+1 where qid='${qid}' and uid = '${uid}'`
    },
    readComment(qid){
        return `update question set looknum = looknum+1 where id='${qid}'`
    },
    addComment(qid, uid, content){
        return `insert into questioncomment(qid, uid, content, likes, time) 
values ('${qid}', '${uid}', '${content}', 0, now())`
    },
    addReplyNum(qid){
        return `update question set replynum= replynum+1 where id=${qid}`
    },
    delQuestion(id){
        return `delete from question where id = ${id}`
    },
    // 依靠qid删除
    delQuestionComment(id){
        return `delete from questioncomment where qid = '${id}'`
    },
    // 依靠id删除
    delQuestionCommentById(id){
        return `delete from questioncomment where id = ${id}`
    }

};


module.exports = obj;