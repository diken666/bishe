

var obj = {
    hasTheUser(uid){
        return `select * from user where uid = '${uid}'`
    },

    addSaleCarInfo(uid, city, cartype, date, distance, appraise){
        return `insert into salecarinfo(uid, city, cartype, date, distance, appraise, time)
values('${uid}', '${city}', '${cartype}', '${date}', '${distance}', '${appraise}', now())`
    }

};


module.exports = obj;