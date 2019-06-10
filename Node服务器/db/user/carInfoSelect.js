

var obj = {
    select: function(id, tableName){
        return `select * from ${tableName} where id = ${id};`
    }
};

module.exports = obj;