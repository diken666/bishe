
var obj = {
    hasCar(id) {
        return `select * from shortcarinfo where id = ${id}`
    },
    hasUser(id) {
        return `select * from user where uid = ${id}`
    },
    updataPic(uid, src) {
        return `update user set link = '${src}' where uid = '${uid}'`
    },
    updateChatSimg(uid, src){
        return `update chat set simg = '${src}' where sid = '${uid}'`
    },
    updateChatLimg(uid, src){
        return `update chat set limg = '${src}' where lid = '${uid}'`
    },
    getUserPic(uid){
        return ''
    }
};

module.exports = obj;