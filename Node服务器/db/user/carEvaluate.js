

var obj = {
    getCarEvaluateInfo(carname, type, date, from) {
        var sql = '';
        if (type) {
            sql = `select count(*) as num, avg(price) as price from shortcarinfo
 where (carname like "%${carname}${type} ${date}%" or carname like "%${carname}-${type} ${date}%") `;

        }else{
            sql = `select count(*) as num, avg(price) as price from shortcarinfo
 where carname like "%${carname}%" and  spsj like '%${date}%'`;
        }
        if (from === '1') {
            sql += ` and isFrom = "瓜子"`
        }
        if (from === '2') {
            sql += ` and isFrom = "人人车"`
        }
        return sql
    },
    getMoreInfo(carname, type){
        if (type){
            return `select count(*) as num, avg(price) as price from shortcarinfo
 where (carname like "%${carname}${type} %" or carname like "%${carname}-${type} %")`;
        }else{
            return `select count(*) as num, avg(price) as price from shortcarinfo
 where carname like "%${carname}%"`;
        }

    }

};


module.exports = obj;
