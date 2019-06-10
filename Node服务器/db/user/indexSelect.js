var indexSql = {
    insert : 'INSERT INTO user(uid,password, name, sex, location, phone, time) VALUES(?,?,?,?,?,?,?) ',
    query : 'SELECT * FROM user ',
    getUserById: 'SELECT * FROM user WHERE uid = ? '
};

module.exports = indexSql;