var UserSql = {
    insert : 'INSERT INTO user(uid,password, name, sex, location, phone, time, score) VALUES(?,?,?,?,?,?,?, 100) ',
    query : 'SELECT * FROM user ',
    getUserById: 'SELECT * FROM user WHERE uid = ? ',
    managerSelect: 'SELECT * FROM manager '
};


module.exports = UserSql;
