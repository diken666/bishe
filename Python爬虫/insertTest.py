import pymysql

connect = pymysql.Connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='123456',
        db='mydb',
        charset='utf8'
    )
cursor = connect.cursor()
sql = "INSERT INTO test(id, carname)" \
          " VALUES ( '%s', '%s')"
data = (
    "123",
    "benz",
)
cursor.execute(sql % data)
connect.commit()

cursor.close()
connect.close()

