import json
from bs4 import BeautifulSoup
import urllib.request
import random
import guazi_db as db
import time


def getBSObj(url, headers):
    """用来请求网页并返回bs对象"""
    request = urllib.request.Request(url, headers=headers)
    response = urllib.request.urlopen(request)
    bsObj = BeautifulSoup(response.read().decode('utf-8'), features="html.parser")
    return bsObj


def getCarTitle(str):
    """用来获取汽车的名字和年款"""
    if(str.find('】')):
        newStr = str[str.find('】') + 1:].split('_')[0]
        return newStr
    else:
        print("未选择地区！")


def getCarNum(bsObj, id):
    """用来获取该种汽车的数目"""
    # bsObj.find(id=id) 返回的数据类型如下
    # {'city_filter': '27', 'brand': 'tesila', 'num': 5}
    res = json.loads(bsObj.find(id=id)['value'])
    return int(res['num'])


def getCarShortInfo(bsObj):
    """获取简短的汽车基础信息，用来列表展示时使用"""
    result = {}
    # 车名
    result['carname'] = getCarTitle(bsObj.title.get_text())
    # 车主信息
    result['owner'] = bsObj.find('dl', {'class': 'people-infor'}).dt.span.get_text().split('：')[1]
    # 车主出价
    priceStr = bsObj.find('span', {'class': 'pricestype'}).get_text().split(' ')[0]
    if priceStr.startswith('¥'):
        result['price'] = float(priceStr.split('¥')[1])
    elif priceStr.startswith('补贴后'):
        result['price'] = float(priceStr.split('补贴后')[1])
    else:
        result['price'] = float(0)
    # 首付
    try:
        result['firstPay'] = float(bsObj.find('span', {'class': 'f24'}).get_text())
    except BaseException:
        result['firstPay'] = result['price']
    # 其他9项基础信息
    others = bsObj.findAll('div', {'class': 'typebox'})
    if len(others) < 10:
        result['isContinue'] = False
    elif len(others) == 10:
        try:
            # 上牌时间
            result['spsj'] = others[0].get_text()
            # 行驶里程 单位：万公里
            result['xslc'] = float(others[1].get_text().replace('万公里', ''))
            # 上牌地
            result['spd'] = ''
            # 排放标准
            result['pfbz'] = others[2].get_text().split('\n')[0]
            # 变速箱
            result['bsx'] = others[3].get_text()
            # 排量
            result['pl'] = float(others[4].get_text())
            # 过户次数
            result['gh'] = int(others[5].get_text().split('\r')[0].replace('次过户', ''))
            # 为照顾人人车信息的情况，原瓜子二手车网的 看车地址 一项已经省去
            # 年检到期时间
            result['nj'] = others[7].get_text()
            # 交强险
            result['jqx'] = others[8].get_text()
            # 商业险
            result['syx'] = others[9].get_text().split(' ')[0]
            result['isContinue'] = True
        except BaseException as err:
            print("获取汽车简介失败，错误描述：", err)
    elif len(others) == 11:
        # 上牌时间
        result['spsj'] = others[0].get_text()
        # 行驶里程 单位：万公里
        result['xslc'] = float(others[1].get_text().replace('万公里', ''))
        # 上牌地
        result['spd'] = others[2].get_text()
        # 排放标准
        result['pfbz'] = others[3].get_text().split('\n')[0]
        # 变速箱
        result['bsx'] = others[4].get_text()
        # 排量
        result['pl'] = float(others[5].get_text())
        # 过户次数
        result['gh'] = int(others[6].get_text().split('\r')[0].replace('次过户', ''))
        # 为照顾人人车信息的情况，原瓜子二手车网的 看车地址 一项已经省去
        # 年检到期时间
        result['nj'] = others[8].get_text()
        # 交强险
        result['jqx'] = others[9].get_text()
        # 商业险
        result['syx'] = others[10].get_text().split(' ')[0]
        result['isContinue'] = True
    return result


def getCarBaseInfo(bsObj):
    """用来获取汽车的七项基础参数"""
    # 七项基本参数有 厂商 发动机 变速箱  车身结构 长宽高 轴距 整备质量
    tds = bsObj.findAll('td', {'class': 'td2'})
    result = {
        # 厂商
        'company': tds[1].get_text(),
        # 引擎
        'engine': tds[3].get_text(),
        # 变速箱
        'bsx': tds[4].get_text(),
        # 车身
        'body': tds[5].get_text(),
        # 长宽高
        'carSize': tds[6].get_text(),
        # 轴距
        'zj': tds[7].get_text(),
        # 整备质量
        'weight': tds[9].get_text()
    }
    return result


def getCarEngineInfo(bsObj):
    """用来获取汽车引擎的参数"""
    # 参数有 排量 进气形式 气缸（字母+缸数） 最大马力 最大扭矩 燃料类型 燃料标号 供油方式 排放标准
    tds = bsObj.findAll('td', {'class': 'td2'})
    result = {
        # 排量
        'pl': tds[10].get_text(),
        # 进气方式
        'jqxs': tds[11].get_text(),
        # 气缸
        'qg': tds[12].get_text(),
        # 最大马力
        'zdml': int(tds[13].get_text()),
        # 最大扭矩
        'zdnj': int(tds[14].get_text()),
        # 燃料类型
        'rllx': tds[15].get_text(),
        # 燃料标号
        'rlbh': tds[16].get_text(),
        # 供油方式
        'gyfs': tds[17].get_text(),
        # 排放标准
        'pfbz': tds[18].get_text()
    }
    return result


def getCarStoppingInfo(bsObj):
    """用来获取汽车的底盘及制动信息"""
    # 参数有 驱动方式 助力方式 前悬挂类型 后悬挂类型 前制动类型 后制动类型 前轮胎规格 后轮胎规格
    tds = bsObj.findAll('td', {'class': 'td2'})
    result = {
        # 驱动方式
        'qdfs': tds[20].get_text(),
        # 助力方式
        'zlfs': tds[21].get_text(),
        # 前悬挂类型
        'qxglx': tds[22].get_text(),
        # 后悬挂类型
        'hxglx': tds[23].get_text(),
        # 前制动类型
        'qzdlx': tds[24].get_text(),
        # 后制动类型
        'hzdlx': tds[25].get_text(),
        # 前轮胎规格
        'qltgg': tds[27].get_text(),
        # 后轮胎规格
        'hltgg': tds[28].get_text()
    }
    return result


def getCarSafeInfo(bsObj):
    """用来获取汽车安全配置的参数"""
    # 参数有 主副驾驶安全气囊 胎压监测 车内中控锁 儿童座椅接口 无钥匙启动 防抱死系统
    tds = bsObj.findAll('td', {'class': 'td2'})
    result = {
        # 主副驾驶安全气囊
        'aqqn': tds[30].get_text(),
        # 胎压监测
        'tyjc': tds[33].get_text(),
        # 车内中控锁
        'cnzks': tds[34].get_text(),
        # 儿童座椅接口
        'zyjk': tds[35].get_text(),
        # 无钥匙启动
        'wysqd': tds[36].get_text(),
        # 防抱死系统
        'fbsxt': tds[37].get_text()
    }
    return result


def getCarOutsideInfo(bsObj):
    """用来获取汽车外部配置的参数"""
    # 参数有 电动天窗 全景天窗 电动吸合门 前后电动车窗 后视镜电动调节 后视镜加热
    tds = bsObj.findAll('td', {'class': 'td2'})
    result = {
        # 电动车窗
        'ddtc': tds[39].get_text(),
        # 全景天窗
        'qjtc': tds[40].get_text(),
        # 电动吸合门
        'ddxhm': tds[41].get_text(),
        # 前后电动车窗
        'qhddcc': tds[45].get_text(),
        # 后视镜电动调节
        'ddtj': tds[46].get_text(),
        # 后视镜加热
        'hsjjr': tds[47].get_text()
    }
    return result


def getCarInsideInfo(bsObj):
    """用来获取汽车内部配置信息"""
    # 参数有 多功能方向盘 定速巡航 GPS导航 空调
    tds = bsObj.findAll('td', {'class': 'td2'})
    result = {
        # 多功能方向盘
        'fxp': tds[48].get_text(),
        # 定速巡航
        'dsxh': tds[49].get_text(),
        # 空调
        'kt': tds[50].get_text(),
        # GPS
        'GPS': tds[52].get_text()

    }
    return result


def getCarPic(bsObj):
    """用来获取汽车的照片"""
    # 照片分为 车辆外观 车辆内饰 发动机及底盘
    pics = bsObj.findAll('li', {'class': 'js-smallpic'})
    # 车辆外观图片链接
    outside = ''
    # 车辆内饰图片链接
    inside = ''
    # 发动机及底盘图片链接
    engine = ''
    for i in range(len(pics)):
        # 因为瓜子二手车车的图片数目分布始终是 车辆外观：10 车辆内饰：13 发动机及底盘：7 ，所以可以如此处理
        temp = pics[i].img.get('src').split('@')[0]+'#'
        if i < 10:
            outside += temp
        elif i < 23:
            inside += temp
        else:
            engine += temp

    return {
        'outside': outside,
        'inside': inside,
        'engine': engine
    }


def getCarType():
    """用来获取汽车的种类，返回一个字典"""
    with open("./json/carType.json", 'r', encoding='UTF-8') as f:
        res = json.loads(f.read())
        # for key in res:
        #     print(key + ": " + res[key])
        return res


def getCity():
    """用来获取城市，返回一个字典"""
    # 宁波 杭州 湖州 绍兴 丽水 台州 衢州 温州 金华 嘉兴 未包含舟山
    with open("./json/desCity.json", 'r', encoding='UTF-8') as f:
        res = json.loads(f.read())
        # for key in res:
        #     print(key + ": " + res[key])
        return res


def saveCarAllInfo(finalUrl, headers, i, j, cities, city, carTypes, carType, realCity):
    """用来存储汽车的所有信息"""
    if city == realCity:
        try:
            newBsObj = getBSObj(finalUrl, headers)
            # 通过isContinue属性判断是否是电动汽车
            if getCarShortInfo(newBsObj)['isContinue']:
                # 获取汽车基本信息
                nowTime = getNowTime(time)
                shortInfo = getCarShortInfo(newBsObj)
                shortInfo['id'] = nowTime
                shortInfo['cartype'] = carTypes[carType]
                shortInfo['place'] = cities[city]
                shortInfo['isFrom'] = "瓜子"
                # print(shortInfo)
                # 获取汽车基本参数
                baseInfo = getCarBaseInfo(newBsObj)
                baseInfo['id'] = nowTime
                # 获取汽车引擎参数
                engineInfo = getCarEngineInfo(newBsObj)
                engineInfo['id'] = nowTime
                # 获取汽车底盘及自制动类型
                stoppingInfo = getCarStoppingInfo(newBsObj)
                stoppingInfo['id'] = nowTime
                # 获取汽车安全配置参数
                safeInfo = getCarSafeInfo(newBsObj)
                safeInfo['id'] = nowTime
                # 获取汽车外部配置信息
                outsideInfo = getCarOutsideInfo(newBsObj)
                outsideInfo['id'] = nowTime
                # 获取汽车内部配置信息
                insideInfo = getCarInsideInfo(newBsObj)
                insideInfo['id'] = nowTime
                # 获取汽车图片
                carPic = getCarPic(newBsObj)
                carPic['id'] = nowTime
                # print(cities[city], i + 1, j + 1, saveObj)
                res = cities[city]+' '+carTypes[carType]+' '+str(i+1)+' '+str(j+1)+' '
                try:
                    res += db.insertCarShortInfo(shortInfo)
                    res += db.insertCarBaseInfo(baseInfo)
                    res += db.insertCarEngineInfo(engineInfo)
                    res += db.insertCarStoppingInfo(stoppingInfo)
                    res += db.insertCarSafeInfo(safeInfo)
                    res += db.insertCarOutsideInfo(outsideInfo)
                    res += db.insertCarInsideInfo(insideInfo)
                    res += db.insertCarPic(carPic)
                    res += "抓取完毕！"
                    print(res)
                except BaseException as err:
                    print("在存储【" + cities[city] + "】" + "【" + carTypes[carType] + "】的第【" + str(i + 1) + "】页" +
                          "第【" + str(j + 1) + "】车辆信息时出现错误！")
                    print('错误描述：', err)

            else:
                print("【" + carTypes[carType] + "】属于电动汽车，跳过数据采集！")
        except BaseException as error:
            print("在抓取【" + cities[city] + "】" + "【" + carTypes[carType] + "】的第【" + str(i+1) + "】页" +
                  "第【"+str(j+1) + "】车辆信息时出现错误！")
            print('错误描述：', error)
    else:
        pass
        print(cities[city]+' '+carTypes[carType]+' '+str(i+1)+' '+str(j+1)+' 属于【' + realCity + "】的车辆！")


def getNowTime(time):
    intdata = time.time()
    strdata = str(intdata).split('.')
    try:
        findata = strdata[0]+strdata[1]
    except BaseException as err:
        print("获取当前时间失败！")
        print("错误描述：", err)
        findata = str(random.randint(1, 100000))
    return findata


