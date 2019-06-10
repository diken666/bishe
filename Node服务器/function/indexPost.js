
var obj = {
    all: function(page, sql){
        var tempSql = sql.replace('count', '').replace('(', '').replace(')', '');
        return `${tempSql} limit ${(page-1)*20}, 20;`
    },
    getPicArr: function(result){
        var resSql = 'select outside from carpic where ';
        for(let i=0; i<result.length; i++){
            if(i === 0){
                resSql += ` id='${result[i].id}' `
            }else{
                resSql += ` or id='${result[i].id}' ` ;
            }

        }
        return resSql;
    },
    count: function(){
        return `select count(*) from shortcarinfo;`
    },
    countAll: function(req){
        var item = req.query;
        var sql = 'select count(*) from shortcarinfo where ';
        var copySql = 'select count(*) from shortcarinfo where ';
        var hasFirst = false;
        var tempStr = '';
        if(item.location){
            sql += `place='${item.location}' `;
            hasFirst = true;
        }
        if(item.price){
            var tempArr = item.price.split('-');
            tempStr = `price >= ${tempArr[0]} and price <= ${tempArr[1]} `;
            if(hasFirst){
                sql += 'and ' + tempStr;
            }else{
                sql += tempStr;
                hasFirst = true;
            }
        }
        if(item.carAge){
            var thisYear = 2019;
            var num = parseInt(item.carAge);
            if(item.carAge !== '14'){
                tempStr = `spsj >= '${thisYear - num}-01' and spsj <> '-' and spsj <> '' `;
            }
            if (hasFirst){
                sql += 'and ' + tempStr;
            } else{
                sql += tempStr;
                hasFirst = true;
            }
        }
        if (item.box){
            tempStr = `bsx = '${item.box}' `;
            if (hasFirst){
                sql += 'and ' + tempStr;
            }else{
                sql += tempStr;
                hasFirst = true;
            }
        }
        if (item.distance) {
            tempStr = `xslc <= ${item.distance} `;
            if (hasFirst){
                sql += 'and ' + tempStr;
            }else {
                sql += tempStr;
                hasFirst = true;
            }
        }
        if (item.pl){
            tempStr = `pl <= ${item.pl} `;
            if (hasFirst){
                sql += 'and ' + tempStr;
            } else{
                sql += tempStr;
                hasFirst = true;
            }
        }
        if (item.stand){
            tempStr = '';
            switch (item.stand) {
                case '3': tempStr += 'pfbz >= "国五" '; break;
                case '2': tempStr += 'pfbz >= "国四" '; break;
                case '1': tempStr += 'pfbz >= "国三" '; break;
                case '0': tempStr += 'pfbz <= "国二" '; break;
            }
            if (hasFirst){
                sql += 'and ' + tempStr;
            }else{
                sql += tempStr;
                hasFirst = true;
            }
        }
        if (item.come){
            tempStr = `isFrom = '${item.come}' `;
            if(hasFirst){
                sql += 'and ' + tempStr;
            }else{
                sql += tempStr;
            }
        }
        if(item.carBrand){
            if (hasFirst){
                sql += `and carname like '%${item.carBrand}%' `
            } else{
                sql += `carname='${item.carBrand}' `;
                hasFirst = true;
            }
        }

        if (item.order){
            tempStr = '';
            console.log(item.order);
            switch (item.order) {
                case '0': tempStr += 'order by id '; break;
                case '1': tempStr += 'order by price desc '; break;
                case '2': tempStr += 'order by price '; break;
                case '3': tempStr += 'order by spsj desc  '; break;
                case '4': tempStr += 'order by xslc '; break;
                case '5': tempStr += 'order by gh '; break;
            }
            if(hasFirst){
                sql += ' ' + tempStr;
            }else{
                sql += tempStr;
            }
        }
        if (sql === copySql){
            sql = 'select count(*) from shortcarinfo '
        }
        return sql;
    }
};


module.exports = obj;