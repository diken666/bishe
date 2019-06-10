
var obj = {
    selectCarShortInfo: function (id) {
        return `select * from shortcarinfo where id = '${id}'`
    },
    selectBaseCarInfo: function (id) {
        return `select * from basecarinfo where id = '${id}'`
    },
    selectCarPic: function (id){
        return `select * from carpic where id = '${id}'`
    },
    selectEngineInfo: function(id){
        return `select * from engineinfo where id = '${id}'`
    },
    selectInsideInfo: function(id){
        return `select * from insideinfo where id = '${id}'`
    },
    selectOutsideInfo: function(id){
        return `select * from outsideinfo where id = '${id}'`
    },
    selectSafeInfo: function(id){
        return `select * from safeinfo where id = '${id}'`
    },
    selectStopCarInfo: function(id){
        return `select * from stoppingInfo where id = '${id}'`
    },
    selectCarComment(id){
        return `select * from comment where cid = '${id}'`
    },
    selectFeedbackError(id){
        return `select * from feedbackerror where cid = '${id}'`
    },
    hasUser(uid){
        return `select * from user where uid='${uid}'`
    },
    getUserHistory(uid){
        return `select * from history where uid='${uid}' order by time desc`
    },
    getCarPic(idArr){
        var sql = `select * from carpic where id = `
        for(let i=0; i<idArr.length; i++){
            if (i===0){
                sql += ' ' + idArr[i]
            } else{
                sql += ' or id=' + idArr[i]
            }
        }
        return sql;
    },
    getCarShortInfo(idArr){
        var sql = `select * from shortcarinfo where id = `
        for(let i=0; i<idArr.length; i++){
            if (i===0){
                sql += ' ' + idArr[i]
            } else{
                sql += ' or id=' + idArr[i]
            }
        }
        return sql;
    },
    hasHistory(uid, cid){
        return `select * from history where uid = '${uid}' and cid = '${cid}'`
    },
    delCarHistory(uid, cid){
        return `delete from history where uid = '${uid}' and cid = '${cid}'`
    },
    hasCarInfo(cid){
        return `select * from shortcarinfo where id = '${cid}'`
    },
    updateHistoryTime(uid, cid){
        return `update history set time = now() where uid = '${uid}' and cid = '${cid}'`
    },
    addHistory(uid, cid){
        return `insert into history(uid, cid, time) values ('${uid}', '${cid}', now())`
    }
};

module.exports = obj;