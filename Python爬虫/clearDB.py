import pymysql.cursors

connect = pymysql.Connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='123456',
        db='mydb',
        charset='utf8'
    )
cursor = connect.cursor()
sql = 'select * from shortcarinfo'
cursor.execute(sql)
oneRes = cursor.fetchall()
idList = []
for i in range(len(oneRes)):
    ID = oneRes[i][0]
    carName = oneRes[i][1]
    owner = oneRes[i][2]
    price = oneRes[i][4]
    if ID in idList:
        continue
    else:
        for j in range(i+1, len(oneRes)):
            isSame = (carName == oneRes[j][1] and owner == oneRes[j][2] and price == oneRes[j][4])
            if isSame:
                # print(oneRes[j])
                if oneRes[j][0] in idList:
                    pass
                else:
                    idList.append(oneRes[j][0])
print(len(idList))
print(idList)

