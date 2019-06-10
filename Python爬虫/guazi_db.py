import pymysql.cursors


def insertCarShortInfo(dataObj):
    connect = pymysql.Connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='123456',
        db='mydb',
        charset='utf8'
    )
    cursor = connect.cursor()
    sql = "INSERT INTO shortcarinfo(id, carname, cartype, owner, place, price, firstPay, spsj, xslc, spd, pfbz, bsx, pl, gh, nj, jqx, syx, isFrom)" \
          " VALUES ( '%s', '%s', '%s','%s', '%s', '%.2f', '%.2f', '%s', '%.2f', '%s', '%s', '%s', '%.1f', '%d', '%s', '%s', '%s', '%s')"
    data = (
        dataObj['id'],
        dataObj['carname'],
        dataObj['cartype'],
        dataObj['owner'],
        dataObj['place'],
        dataObj['price'],
        dataObj['firstPay'],
        dataObj['spsj'],
        dataObj['xslc'],
        dataObj['spd'],
        dataObj['pfbz'],
        dataObj['bsx'],
        dataObj['pl'],
        dataObj['gh'],
        dataObj['nj'],
        dataObj['jqx'],
        dataObj['syx'],
        dataObj['isFrom'],
    )
    cursor.execute(sql % data)
    connect.commit()
    cursor.close()
    connect.close()
    return "【简介】"


def insertCarBaseInfo(dataObj):
    connect = pymysql.Connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='123456',
        db='mydb',
        charset='utf8'
    )
    cursor = connect.cursor()
    sql = "INSERT INTO basecarinfo(id, company, engine, bsx, body, carSize, zj, weight)" \
          " VALUES ( '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')"
    data = (
        dataObj['id'],
        dataObj['company'],
        dataObj['engine'],
        dataObj['bsx'],
        dataObj['body'],
        dataObj['carSize'],
        dataObj['zj'],
        dataObj['weight'],
    )
    cursor.execute(sql % data)
    connect.commit()
    cursor.close()
    connect.close()
    return "【基础配置】"


def insertCarEngineInfo(dataObj):
    connect = pymysql.Connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='123456',
        db='mydb',
        charset='utf8'
    )
    cursor = connect.cursor()
    sql = "INSERT INTO engineinfo(id, pl, jqxs, qg, zdml, zdnj, rllx, rlbh, gyfs, pfbz)" \
          " VALUES ( '%s', '%s', '%s', '%s', '%d', '%d', '%s', '%s', '%s', '%s')"
    data = (
        dataObj['id'],
        dataObj['pl'],
        dataObj['jqxs'],
        dataObj['qg'],
        dataObj['zdml'],
        dataObj['zdnj'],
        dataObj['rllx'],
        dataObj['rlbh'],
        dataObj['gyfs'],
        dataObj['pfbz']
    )
    cursor.execute(sql % data)
    connect.commit()
    cursor.close()
    connect.close()
    return "【引擎配置】"


def insertCarStoppingInfo(dataObj):
    connect = pymysql.Connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='123456',
        db='mydb',
        charset='utf8'
    )
    cursor = connect.cursor()
    sql = "INSERT INTO stoppinginfo(id, qdfs, zlfs, qxglx, hxglx, qzdlx, hzdlx, qltgg, hltgg)" \
          " VALUES ( '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')"
    data = (
        dataObj['id'],
        dataObj['qdfs'],
        dataObj['zlfs'],
        dataObj['qxglx'],
        dataObj['hxglx'],
        dataObj['qzdlx'],
        dataObj['hzdlx'],
        dataObj['qltgg'],
        dataObj['hltgg']
    )
    cursor.execute(sql % data)
    connect.commit()
    cursor.close()
    connect.close()
    return "【底盘及制动】"


def insertCarSafeInfo(dataObj):
    connect = pymysql.Connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='123456',
        db='mydb',
        charset='utf8'
    )
    cursor = connect.cursor()
    sql = "INSERT INTO safeinfo(id, aqqn, tyjc, cnzks, zyjk, wysqd, fbsxt)" \
          " VALUES ( '%s', '%s', '%s', '%s', '%s', '%s', '%s')"
    data = (
        dataObj['id'],
        dataObj['aqqn'],
        dataObj['tyjc'],
        dataObj['cnzks'],
        dataObj['zyjk'],
        dataObj['wysqd'],
        dataObj['fbsxt']
    )
    cursor.execute(sql % data)
    connect.commit()
    cursor.close()
    connect.close()
    return "【安全配置】"


def insertCarOutsideInfo(dataObj):
    connect = pymysql.Connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='123456',
        db='mydb',
        charset='utf8'
    )
    cursor = connect.cursor()
    sql = "INSERT INTO outsideinfo(id, ddtc, qjtc, ddxhm, qhddcc, ddtj, hsjjr)" \
          " VALUES ( '%s', '%s', '%s', '%s', '%s', '%s', '%s')"
    data = (
        dataObj['id'],
        dataObj['ddtc'],
        dataObj['qjtc'],
        dataObj['ddxhm'],
        dataObj['qhddcc'],
        dataObj['ddtj'],
        dataObj['hsjjr']
    )
    cursor.execute(sql % data)
    connect.commit()
    cursor.close()
    connect.close()
    return "【外部配置】"


def insertCarInsideInfo(dataObj):
    connect = pymysql.Connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='123456',
        db='mydb',
        charset='utf8'
    )
    cursor = connect.cursor()
    sql = "INSERT INTO insideinfo(id, fxp, dsxh, kt, GPS)" \
          " VALUES ( '%s', '%s', '%s', '%s', '%s')"
    data = (
        dataObj['id'],
        dataObj['fxp'],
        dataObj['dsxh'],
        dataObj['kt'],
        dataObj['GPS']
    )
    cursor.execute(sql % data)
    connect.commit()
    cursor.close()
    connect.close()
    return "【内部配置】"


def insertCarPic(dataObj):
    connect = pymysql.Connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='123456',
        db='mydb',
        charset='utf8'
    )
    cursor = connect.cursor()
    sql = "INSERT INTO carpic(id, outside, inside, engine)" \
          " VALUES ( '%s', '%s', '%s', '%s')"
    data = (
        dataObj['id'],
        dataObj['outside'],
        dataObj['inside'],
        dataObj['engine']
    )
    cursor.execute(sql % data)
    connect.commit()
    cursor.close()
    connect.close()
    return "【图片】"



