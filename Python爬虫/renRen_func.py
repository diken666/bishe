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


def saveCarType(bsObj):
    """用来保存汽车的类型"""
    spans = bsObj.findAll('span', {'class': 'bn'})
    result = {}
    for span in spans:
        for a in span.findAll('a'):
            key = a.get('href').split('/')[-2]
            name = a.get_text()
            result[key] = name
    jStr = json.dumps(result, ensure_ascii=False)
    with open('./json/rr_carType.json', 'w') as f:
        f.write(jStr)
    print("汽车类型保存完毕！")


def getCarLink(bsObj):
    """获取汽车链接"""
    items = bsObj.findAll('li', {'class': 'list-item'})
    result = []
    for item in items:
        href = item.a.get('href').split('/')
        if len(href) == 3:
            continue
        else:
            result.append({'city': href[1], 'href': href[-1]})
    return result


def getCarPage(bsObj):
    """获取页面的最大页码数"""
    lis = bsObj.find('ul', {'class': 'pagination'}).findAll('li')
    tempArr = []
    for li in lis:
        tempArr.append(li.get_text())
    try:
        return int(tempArr[-2])
    except BaseException as err:
        print("转换页码出错，错误描述：", err)
        return 0


def getCity():
    """获取城市信息，返回一个字典"""
    with open("./json/rr_desCity.json", 'r', encoding='UTF-8') as f:
        res = json.loads(f.read())
        # for key in res:
        #     print(key + ": " + res[key])
        return res

def getCarType():
    """获取汽车信息，返回一个字典"""
    with open("./json/rr_carType.json", 'r', encoding='UTF-8') as f:
        res = json.loads(f.read())
        # for key in res:
        #     print(key + ": " + res[key])
        return res


def getCarShortInfo(bsObj, i, j):
    """获取汽车的简介"""
    result = {}
    # 车名
    try:
        tempStr = bsObj.find('h1', {'class': 'title-name'}).get_text().replace('\n', '').strip()
        carname = ''
        for ch in tempStr:
            if ch.isdigit():
                carname += getRealNum(ch)
            else:
                carname += ch
        result['carname'] = carname
    except BaseException as err:
        print(i, j, "carname:", err)
    # 车主信息
    try:
        result['owner'] = bsObj.find('h2', {'class': 'master-name'}).get_text().replace('卖家-', '').replace('说车', '')
    except BaseException as err:
        print(i, j, "owner:", err)
        result['owner'] = "先生"
    # 车主出价
    try:
        result['price'] = float(bsObj.find('p', {'class': 'price'}).get_text().replace('万', ''))
    except BaseException as err:
        print(i, j, "price:", err)
    # 首付
    try:
        result['firstPay'] = float(bsObj.find('p', {'class': 'money'}).get_text().replace('首付', '').replace('万', ''))
    except BaseException as err:
        print(i, j, "firstPay:", err)
        result['firstPay'] = result['price']
    # 上牌时间
    try:
        tempStr = bsObj.findAll('p', {'class': 'small-title'})[3].get_text().replace('上牌', '')
        spsj = ''
        if tempStr == '车牌所在地':
            result['spsj'] = '-'
        else:
            for ch in tempStr:
                if ch.isdigit():
                    spsj += getRealNum(ch)
                else:
                    spsj += ch
            result['spsj'] = spsj
    except BaseException as err:
        print(i, j, 'spsj:',err)
        result['spsj'] = '-'
    # 行驶里程
    try:
        result['xslc'] = float(bsObj.find('strong', {'class': 'car-summary'}).get_text().replace('万公里', ''))
    except BaseException as err:
        print(i, j, 'xslc:', err)
        result['xslc'] = 0
    # 上牌地 排放标准 变速箱 过户
    try:
        result['spd'] = bsObj.findAll('strong', {'class': 'car-summary'})[2].get_text()
        result['pfbz'] = bsObj.findAll('strong', {'class': 'car-summary'})[3].get_text()
        result['bsx'] = bsObj.findAll('strong', {'class': 'car-summary'})[4].get_text()
        result['gh'] = int(bsObj.findAll('strong', {'class': 'car-summary'})[5].get_text().replace('次', ''))
    except BaseException as err:
        print(i, j, 'spd:', err)
        result['spd'] = '-'
        result['pfbz'] = '-'
        result['bsx'] = '-'
        result['gh'] = 0
    # 排量
    try:
        result['pl'] = float(bsObj.findAll('div', {'class': 'item-value'})[5].get_text())
    except BaseException as err:
        print(i, j, 'pl:', err)
        result['pl'] = -1
    # 年检到期时间
    try:
        tempObj = bsObj.findAll('ul', {'class': 'info-about-car-content'})
        result['nj'] = tempObj[0].findAll('li')[1].get_text().replace('\xa0', '')
        result['syx'] = tempObj[0].findAll('li')[3].get_text().replace('\xa0', '')
        result['jqx'] = tempObj[1].findAll('li')[1].get_text().replace('\xa0', '')
    except BaseException as err:
        print(i, j, 'nj:', err)
        result['nj'] = '-'
        result['syx'] = '-'
        result['jqx'] = '-'
    return result


def getRealNum(char):
    """获得正真的数字"""
    res = '0'
    try:
        num = char
        if num == '0':
            res = '0'
        elif num == '1':
            res = '5'
        elif num == '2':
            res = '6'
        elif num == '3':
            res = '3'
        elif num == '4':
            res = '1'
        elif num == '5':
            res = '2'
        elif num == '6':
            res = '7'
        elif num == '7':
            res = '4'
        elif num == '8':
            res = '9'
        else:
            res = '8'

        # if num == '0':
        #     res = '0'
        # elif num == '1':
        #     res = '2'
        # elif num == '2':
        #     res = '1'
        # elif num == '3':
        #     res = '4'
        # elif num == '4':
        #     res = '3'
        # elif num == '5':
        #     res = '8'
        # elif num == '6':
        #     res = '6'
        # elif num == '7':
        #     res = '7'
        # elif num == '8':
        #     res = '5'
        # else:
        #     res = '9'
    except BaseException as err:
        print("转换真正的数字时出错：", err)
        return res
    finally:
        return res


def getCarBaseInfo(bsObj, valueNum):
    """获取汽车的七项基础参数"""
    valueobj = bsObj.findAll('div', {'class': 'item-value'})
    nameobj = bsObj.findAll('div', {'class': 'item-name'})
    arr = [182, 183, 184, 185, 186, 187, 190]
    body = ''
    zj = ''
    weight = ''
    if valueNum == 180:
        if nameobj[25].get_text().replace('\n', '').replace(' ', '') == '最小离地间隙(mm)':
            body = valueobj[20].get_text().replace('\n', '').replace(' ', '')+'门'+ valueobj[21].get_text().replace('\n', '').replace(' ', '')+'座'+ valueobj[7].get_text().replace('\n', '').replace(' ', '')
            zj = valueobj[17].get_text().replace('\n', '').replace(' ', '')
            weight = valueobj[24].get_text().replace('\n', '').replace(' ', '')
    elif valueNum in arr:
        if nameobj[26].get_text().replace('\n', '').replace(' ', '') == '最小离地间隙(mm)':
            body = valueobj[21].get_text().replace('\n', '').replace(' ', '')+'门'+ valueobj[22].get_text().replace('\n', '').replace(' ', '')+'座'+ valueobj[7].get_text().replace('\n', '').replace(' ', '')
            zj = valueobj[18].get_text().replace('\n', '').replace(' ', '')
            weight = valueobj[25].get_text().replace('\n', '').replace(' ', '')
    result = {
        # 厂商
        'company': valueobj[2].get_text().replace('\n', '').replace(' ', ''),
        # 引擎
        'engine': valueobj[3].get_text().replace('\n', '').replace(' ', ''),
        # 变速箱
        'bsx': valueobj[4].get_text().replace('\n', '').replace(' ', ''),
        # 车身
        'body': body,
        # 长宽高
        'carSize': valueobj[6].get_text().replace('\n', '').replace(' ', '').replace('*', '/'),
        # 轴距
        'zj': zj,
        # 整备质量
        'weight': weight
    }
    return result


def getCarEngineInfo(bsObj, valueNum):
    """用来获取汽车引擎的参数"""
    valueobj = bsObj.findAll('div', {'class': 'item-value'})
    nameobj = bsObj.findAll('div', {'class': 'item-name'})
    arr = [182, 183, 184, 185, 186, 187, 190]
    jqxs = ''
    qg = ''
    zdml = 0
    zdnj = '0'
    rllx = ''
    rlbh = ''
    gyfs = ''
    pfbz = ''
    if valueNum == 180:
        if nameobj[47].get_text().replace('\n', '').replace(' ', '') == '变速箱类型':
            jqxs = valueobj[28].get_text().replace('\n', '').replace(' ', '')
            qg = valueobj[29].get_text().replace('\n', '').replace(' ', '') + valueobj[30].get_text().replace('\n', '').replace(' ', '')
            zdml = int(valueobj[36].get_text().replace('\n', '').replace(' ', ''))
            zdnj = valueobj[39].get_text().replace('\n', '').replace(' ', '').split('-')
            rllx = valueobj[46].get_text().replace('\n', '').replace(' ', '')
            rlbh = valueobj[42].get_text().replace('\n', '').replace(' ', '')
            gyfs = valueobj[43].get_text().replace('\n', '').replace(' ', '')
    elif valueNum in arr:
        if nameobj[48].get_text().replace('\n', '').replace(' ', '') == '环保标准':
            jqxs = valueobj[29].get_text().replace('\n', '').replace(' ', '')
            qg = valueobj[30].get_text().replace('\n', '').replace(' ', '') + valueobj[31].get_text().replace('\n','').replace(' ', '')
            zdml = int(valueobj[37].get_text().replace('\n', '').replace(' ', ''))
            zdnj = valueobj[40].get_text().replace('\n', '').replace(' ', '').split('-')
            rllx = valueobj[47].get_text().replace('\n', '').replace(' ', '')
            rlbh = valueobj[43].get_text().replace('\n', '').replace(' ', '')
            gyfs = valueobj[44].get_text().replace('\n', '').replace(' ', '')
            pfbz =valueobj[48].get_text().replace('\n', '').replace(' ', '')
    # 最大扭矩的处理
    nj = '0'
    if len(zdnj) == 2:
        nj = zdnj[1]
    elif len(zdnj) == 1:
        nj = zdnj[0]
    else:
        nj = '0'
    result = {
        # 排量
        'pl': valueobj[5].get_text().replace('\n', '').replace(' ', ''),
        # 进气方式
        'jqxs': jqxs,
        # # 气缸
        'qg':  qg,
        # 最大马力
        'zdml': zdml,
        # 最大扭矩
        'zdnj': int(nj),
        # 燃料类型
        'rllx': rllx,
        # 燃料标号
        'rlbh': rlbh,
        # 供油方式
        'gyfs': gyfs,
        # 排放标准
        'pfbz': pfbz
    }
    return result


def getCarSafeInfo(bsObj, valueNum):
    """获取汽车安全配置参数"""
    valueobj = bsObj.findAll('div', {'class': 'item-value'})
    nameobj = bsObj.findAll('div', {'class': 'item-name'})
    arr = [184, 185, 186, 187, 190]
    aqqn = '无/无'
    tyjc = '无'
    cnzks = '无'
    zyjk = '无'
    wysqd = '无'
    fbsxt = '无'
    if valueNum == 180:
        if nameobj[84].get_text().replace('\n', '').replace(' ', '') == '防抱死制动系统':
            aqqn = valueobj[62].get_text().replace('\n', '').replace(' ', '') + '/' + valueobj[63].get_text().replace('\n', '').replace(' ', '')
            tyjc = valueobj[69].get_text().replace('\n', '').replace(' ', '')
            cnzks = valueobj[72].get_text().replace('\n', '').replace(' ', '')
            # zyjk 没有， 默认'无'
            wysqd = valueobj[74].get_text().replace('\n', '').replace(' ', '')
            fbsxt = valueobj[84].get_text().replace('\n', '').replace(' ', '')
    elif valueNum == 182:
        if nameobj[86].get_text().replace('\n', '').replace(' ', '') == '防抱死制动系统':
            aqqn = valueobj[63].get_text().replace('\n', '').replace(' ', '') + '/' + valueobj[64].get_text().replace('\n', '').replace(' ', '')
            tyjc = valueobj[70].get_text().replace('\n', '').replace(' ', '')
            cnzks = valueobj[74].get_text().replace('\n', '').replace(' ', '')
            zyjk = valueobj[73].get_text().replace('\n', '').replace(' ', '')
            wysqd = valueobj[76].get_text().replace('\n', '').replace(' ', '')
            fbsxt = valueobj[86].get_text().replace('\n', '').replace(' ', '')
    elif valueNum == 183:
        if nameobj[87].get_text().replace('\n', '').replace(' ', '') == '防抱死制动系统':
            aqqn = valueobj[64].get_text().replace('\n', '').replace(' ', '') + '/' + valueobj[65].get_text().replace('\n', '').replace(' ', '')
            tyjc = valueobj[71].get_text().replace('\n', '').replace(' ', '')
            cnzks = valueobj[75].get_text().replace('\n', '').replace(' ', '')
            zyjk = valueobj[74].get_text().replace('\n', '').replace(' ', '')
            wysqd = valueobj[77].get_text().replace('\n', '').replace(' ', '')
            fbsxt = valueobj[87].get_text().replace('\n', '').replace(' ', '')
    elif valueNum in arr:
        if nameobj[88].get_text().replace('\n', '').replace(' ', '') == '防抱死制动系统':
            aqqn = valueobj[65].get_text().replace('\n', '').replace(' ', '') + '/' + valueobj[66].get_text().replace('\n', '').replace(' ', '')
            tyjc = valueobj[72].get_text().replace('\n', '').replace(' ', '')
            cnzks = valueobj[76].get_text().replace('\n', '').replace(' ', '')
            zyjk = valueobj[75].get_text().replace('\n', '').replace(' ', '')
            wysqd = valueobj[78].get_text().replace('\n', '').replace(' ', '')
            fbsxt = valueobj[88].get_text().replace('\n', '').replace(' ', '')
    result = {
        # 主副驾驶安全气囊
        'aqqn': aqqn,
        # 胎压监测
        'tyjc': tyjc,
        # 车内中控锁
        'cnzks': cnzks,
        # 儿童座椅接口
        'zyjk': zyjk,
        # 无钥匙启动
        'wysqd': wysqd,
        # 防抱死系统
        'fbsxt': fbsxt,
    }
    return result


def getCarOutsideInfo(bsObj, valueNum):
    """用来获取汽车外部配置的参数"""
    valueobj = bsObj.findAll('div', {'class': 'item-value'})
    nameobj = bsObj.findAll('div', {'class': 'item-name'})
    arr = []
    ddtc = '无'
    qjtc = '无'
    ddxhm = '无'
    qhddcc = '无'
    ddtj = '无'
    hsjjr = '无'
    if valueNum == 180:
        if nameobj[153].get_text().replace('\n', '').replace(' ', '') == '后视镜加热':
            ddtc = valueobj[88].get_text().replace('\n', '').replace(' ', '')
            qjtc = valueobj[89].get_text().replace('\n', '').replace(' ', '')
            ddxhm = valueobj[92].get_text().replace('\n', '').replace(' ', '')
            qhddcc = valueobj[148].get_text().replace('\n', '').replace(' ', '')+'/'+valueobj[149].get_text().replace('\n', '').replace(' ', '')
            ddtj = valueobj[152].get_text().replace('\n', '').replace(' ', '')
            hsjjr = valueobj[153].get_text().replace('\n', '').replace(' ', '')
    elif valueNum == 182:
        if nameobj[155].get_text().replace('\n', '').replace(' ', '') == '后视镜加热':
            ddtc = valueobj[91].get_text().replace('\n', '').replace(' ', '')
            qjtc = valueobj[92].get_text().replace('\n', '').replace(' ', '')
            ddxhm = valueobj[95].get_text().replace('\n', '').replace(' ', '')
            qhddcc = valueobj[150].get_text().replace('\n', '').replace(' ', '')+'/'+valueobj[151].get_text().replace('\n', '').replace(' ', '')
            ddtj = valueobj[154].get_text().replace('\n', '').replace(' ', '')
            hsjjr = valueobj[155].get_text().replace('\n', '').replace(' ', '')
    elif valueNum == 183:
        if nameobj[156].get_text().replace('\n', '').replace(' ', '') == '后视镜加热':
            ddtc = valueobj[92].get_text().replace('\n', '').replace(' ', '')
            qjtc = valueobj[93].get_text().replace('\n', '').replace(' ', '')
            ddxhm = valueobj[96].get_text().replace('\n', '').replace(' ', '')
            qhddcc = valueobj[151].get_text().replace('\n', '').replace(' ', '')+'/'+valueobj[152].get_text().replace('\n', '').replace(' ', '')
            ddtj = valueobj[155].get_text().replace('\n', '').replace(' ', '')
            hsjjr = valueobj[156].get_text().replace('\n', '').replace(' ', '')
    elif valueNum == 184:
        if nameobj[157].get_text().replace('\n', '').replace(' ', '') == '后视镜加热':
            ddtc = valueobj[93].get_text().replace('\n', '').replace(' ', '')
            qjtc = valueobj[94].get_text().replace('\n', '').replace(' ', '')
            ddxhm = valueobj[97].get_text().replace('\n', '').replace(' ', '')
            qhddcc = valueobj[152].get_text().replace('\n', '').replace(' ', '')+'/'+valueobj[153].get_text().replace('\n', '').replace(' ', '')
            ddtj = valueobj[156].get_text().replace('\n', '').replace(' ', '')
            hsjjr = valueobj[157].get_text().replace('\n', '').replace(' ', '')
    elif valueNum == 185:
        if nameobj[158].get_text().replace('\n', '').replace(' ', '') == '后视镜加热':
            ddtc = valueobj[93].get_text().replace('\n', '').replace(' ', '')
            qjtc = valueobj[94].get_text().replace('\n', '').replace(' ', '')
            ddxhm = valueobj[97].get_text().replace('\n', '').replace(' ', '')
            qhddcc = valueobj[153].get_text().replace('\n', '').replace(' ', '')+'/'+valueobj[154].get_text().replace('\n', '').replace(' ', '')
            ddtj = valueobj[157].get_text().replace('\n', '').replace(' ', '')
            hsjjr = valueobj[158].get_text().replace('\n', '').replace(' ', '')
    elif valueNum == 186:
        if nameobj[159].get_text().replace('\n', '').replace(' ', '') == '后视镜加热':
            ddtc = valueobj[93].get_text().replace('\n', '').replace(' ', '')
            qjtc = valueobj[94].get_text().replace('\n', '').replace(' ', '')
            ddxhm = valueobj[97].get_text().replace('\n', '').replace(' ', '')
            qhddcc = valueobj[154].get_text().replace('\n', '').replace(' ', '')+'/'+valueobj[155].get_text().replace('\n', '').replace(' ', '')
            ddtj = valueobj[158].get_text().replace('\n', '').replace(' ', '')
            hsjjr = valueobj[159].get_text().replace('\n', '').replace(' ', '')
    elif valueNum == 187:
        if nameobj[160].get_text().replace('\n', '').replace(' ', '') == '后视镜加热':
            ddtc = valueobj[93].get_text().replace('\n', '').replace(' ', '')
            qjtc = valueobj[94].get_text().replace('\n', '').replace(' ', '')
            ddxhm = valueobj[97].get_text().replace('\n', '').replace(' ', '')
            qhddcc = valueobj[155].get_text().replace('\n', '').replace(' ', '')+'/'+valueobj[156].get_text().replace('\n', '').replace(' ', '')
            ddtj = valueobj[159].get_text().replace('\n', '').replace(' ', '')
            hsjjr = valueobj[160].get_text().replace('\n', '').replace(' ', '')
    elif valueNum == 190:
        if nameobj[163].get_text().replace('\n', '').replace(' ', '') == '后视镜加热':
            ddtc = valueobj[94].get_text().replace('\n', '').replace(' ', '')
            qjtc = valueobj[95].get_text().replace('\n', '').replace(' ', '')
            ddxhm = valueobj[98].get_text().replace('\n', '').replace(' ', '')
            qhddcc = valueobj[158].get_text().replace('\n', '').replace(' ', '')+'/'+valueobj[159].get_text().replace('\n', '').replace(' ', '')
            ddtj = valueobj[162].get_text().replace('\n', '').replace(' ', '')
            hsjjr = valueobj[163].get_text().replace('\n', '').replace(' ', '')
    result = {
        # 电动车窗
        'ddtc': ddtc,
        # 全景天窗
        'qjtc': qjtc,
        # 电动吸合门
        'ddxhm': ddxhm,
        # 前后电动车窗
        'qhddcc': qhddcc,
        # 后视镜电动调节
        'ddtj': ddtj,
        # 后视镜加热
        'hsjjr': hsjjr
    }
    return result


def getCarInsideInfo(bsObj, valueNum):
    """获取汽车内部配置信息"""
    valueobj = bsObj.findAll('div', {'class': 'item-value'})
    nameobj = bsObj.findAll('div', {'class': 'item-name'})
    fxp = '无'
    dsxh = '无'
    kt = '标配'
    GPS = '无'
    if valueNum == 180:
        if nameobj[130].get_text().replace('\n', '').replace(' ', '') == 'GPS导航系统':
            fxp = valueobj[98].get_text().replace('\n', '').replace(' ', '')
            dsxh = valueobj[101].get_text().replace('\n', '').replace(' ', '')
            GPS = valueobj[130].get_text().replace('\n', '').replace(' ', '')
    elif valueNum == 182:
        if nameobj[131].get_text().replace('\n', '').replace(' ', '') == 'GPS导航系统':
            fxp = valueobj[101].get_text().replace('\n', '').replace(' ', '')
            dsxh = valueobj[104].get_text().replace('\n', '').replace(' ', '')
            GPS = valueobj[131].get_text().replace('\n', '').replace(' ', '')
    elif valueNum == 183:
        if nameobj[134].get_text().replace('\n', '').replace(' ', '') == 'GPS导航系统':
            fxp = valueobj[102].get_text().replace('\n', '').replace(' ', '')
            dsxh = valueobj[105].get_text().replace('\n', '').replace(' ', '')
            GPS = valueobj[134].get_text().replace('\n', '').replace(' ', '')
    elif valueNum == 184:
        if nameobj[133].get_text().replace('\n', '').replace(' ', '') == 'GPS导航系统':
            fxp = valueobj[103].get_text().replace('\n', '').replace(' ', '')
            dsxh = valueobj[106].get_text().replace('\n', '').replace(' ', '')
            GPS = valueobj[133].get_text().replace('\n', '').replace(' ', '')
    elif valueNum == 185:
        if nameobj[134].get_text().replace('\n', '').replace(' ', '') == 'GPS导航系统':
            fxp = valueobj[103].get_text().replace('\n', '').replace(' ', '')
            dsxh = valueobj[106].get_text().replace('\n', '').replace(' ', '')
            GPS = valueobj[134].get_text().replace('\n', '').replace(' ', '')
    elif valueNum == 186 or valueNum == 187:
        if nameobj[135].get_text().replace('\n', '').replace(' ', '') == 'GPS导航系统':
            fxp = valueobj[103].get_text().replace('\n', '').replace(' ', '')
            dsxh = valueobj[106].get_text().replace('\n', '').replace(' ', '')
            GPS = valueobj[135].get_text().replace('\n', '').replace(' ', '')
    elif valueNum == 190:
        if nameobj[136].get_text().replace('\n', '').replace(' ', '') == 'GPS导航系统':
            fxp = valueobj[104].get_text().replace('\n', '').replace(' ', '')
            dsxh = valueobj[107].get_text().replace('\n', '').replace(' ', '')
            GPS = valueobj[136].get_text().replace('\n', '').replace(' ', '')
    result = {
        # 多功能方向盘
        'fxp': fxp,
        # 定速巡航
        'dsxh': dsxh,
        # 空调
        'kt': kt,
        # GPS
        'GPS': GPS
    }
    return result


def getCarStoppingInfo(bsObj, valueNum):
    """用来获取汽车的底盘及制动信息"""
    # 参数有 驱动方式 助力方式 前悬挂类型 后悬挂类型 前制动类型 后制动类型 前轮胎规格 后轮胎规格
    valueobj = bsObj.findAll('div', {'class': 'item-value'})
    nameobj = bsObj.findAll('div', {'class': 'item-name'})
    arr = [184, 185, 186, 187, 190]
    qdfs  = ''
    zlfs = ''
    qxglx = ''
    hxglx = ''
    qzdlx = ''
    hzdlx = ''
    qltgg = ''
    hltgg = ''
    if valueNum == 180:
        if nameobj[60].get_text().replace('\n', '').replace(' ', '') == '后轮胎规格':
            qdfs = valueobj[49].get_text().replace('\n', '').replace(' ', '')
            zlfs = valueobj[50].get_text().replace('\n', '').replace(' ', '')
            qxglx = valueobj[52].get_text().replace('\n', '').replace(' ', '')
            hxglx = valueobj[53].get_text().replace('\n', '').replace(' ', '')
            qzdlx = valueobj[56].get_text().replace('\n', '').replace(' ', '')
            hzdlx = valueobj[57].get_text().replace('\n', '').replace(' ', '')
            qltgg = valueobj[59].get_text().replace('\n', '').replace(' ', '')
            hltgg = valueobj[60].get_text().replace('\n', '').replace(' ', '')
    elif valueNum == 182:
        if nameobj[61].get_text().replace('\n', '').replace(' ', '') == '后轮胎规格':
            qdfs = valueobj[52].get_text().replace('\n', '').replace(' ', '')
            zlfs = valueobj[53].get_text().replace('\n', '').replace(' ', '')
            qxglx = valueobj[55].get_text().replace('\n', '').replace(' ', '')
            hxglx = valueobj[56].get_text().replace('\n', '').replace(' ', '')
            qzdlx = valueobj[57].get_text().replace('\n', '').replace(' ', '')
            hzdlx = valueobj[58].get_text().replace('\n', '').replace(' ', '')
            qltgg = valueobj[60].get_text().replace('\n', '').replace(' ', '')
            hltgg = valueobj[61].get_text().replace('\n', '').replace(' ', '')
    elif valueNum == 183:
        if nameobj[62].get_text().replace('\n', '').replace(' ', '') == '后轮胎规格':
            qdfs = valueobj[51].get_text().replace('\n', '').replace(' ', '')
            zlfs = valueobj[52].get_text().replace('\n', '').replace(' ', '')
            qxglx = valueobj[54].get_text().replace('\n', '').replace(' ', '')
            hxglx = valueobj[55].get_text().replace('\n', '').replace(' ', '')
            qzdlx = valueobj[58].get_text().replace('\n', '').replace(' ', '')
            hzdlx = valueobj[59].get_text().replace('\n', '').replace(' ', '')
            qltgg = valueobj[61].get_text().replace('\n', '').replace(' ', '')
            hltgg = valueobj[62].get_text().replace('\n', '').replace(' ', '')
    elif valueNum in arr:
        if nameobj[63].get_text().replace('\n', '').replace(' ', '') == '后轮胎规格':
            qdfs = valueobj[52].get_text().replace('\n', '').replace(' ', '')
            zlfs = valueobj[53].get_text().replace('\n', '').replace(' ', '')
            qxglx = valueobj[55].get_text().replace('\n', '').replace(' ', '')
            hxglx = valueobj[56].get_text().replace('\n', '').replace(' ', '')
            qzdlx = valueobj[59].get_text().replace('\n', '').replace(' ', '')
            hzdlx = valueobj[60].get_text().replace('\n', '').replace(' ', '')
            qltgg = valueobj[62].get_text().replace('\n', '').replace(' ', '')
            hltgg = valueobj[63].get_text().replace('\n', '').replace(' ', '')
    result = {
        # 驱动方式
        'qdfs': qdfs,
        # 助力方式
        'zlfs': zlfs,
        # 前悬挂类型
        'qxglx': qxglx,
        # 后悬挂类型
        'hxglx': hxglx,
        # 前制动类型
        'qzdlx': qzdlx,
        # 后制动类型
        'hzdlx': hzdlx,
        # 前轮胎规格
        'qltgg': qltgg.split('R')[0] + ' R' + qltgg.split('R')[1],
        # 后轮胎规格
        'hltgg': hltgg.split('R')[0] + ' R' + hltgg.split('R')[1]
    }
    return result


def getCarPic(bsObj):
    """用来获取汽车的照片"""
    # 照片分为 车辆外观 车辆内饰 发动机及底盘
    pics = bsObj.findAll('li', {'class': 'clk'})
    result = {
        'outside': '',
        'inside': '',
        'engine': ''
    }
    try:
        # 前面13张为外部，后4张为发动机和底盘， 中间为内饰
        outside = ''
        inside = ''
        engine = ''
        for i in range(len(pics)):
            temp = pics[i].a.img.get('src')+'#'
            if i < 13:
                outside += temp
            elif i < (len(pics) - 4):
                inside += temp
            else:
                engine += temp
        return {
            'outside': outside,
            'inside': inside,
            'engine': engine
        }
    except BaseException as err:
        print("获取照片时出错，错误描述为：", err)
        return result


def getNowTime():
    intdata = time.time()
    strdata = str(intdata).split('.')
    try:
        findata = strdata[0]+strdata[1]
    except BaseException as err:
        print("获取当前时间失败！")
        print("错误描述：", err)
        findata = str(random.randint(1, 100000))
    return findata


def isElectricCar(bsObj, carUrl, valueNum):
    """判断车辆是否是电动车"""
    valueobj = bsObj.findAll('div', {'class': 'item-value'})
    nameobj = bsObj.findAll('div', {'class': 'item-name'})
    rl = ''
    arr = [182, 183, 184, 185, 186, 187, 190]
    if valueNum in arr:
        if nameobj[47].get_text().replace('\n', '').replace(' ', '') == '燃油形式':
            rl = valueobj[47].get_text().replace('\n', '').replace(' ', '')
            if rl == '纯电动':
                return False
            else:
                return True
        else:
            print("对应错误！", carUrl)
            return False
    elif valueNum == 180:
        if nameobj[46].get_text().replace('\n', '').replace(' ', '') == '燃油形式':
            rl = valueobj[46].get_text().replace('\n', '').replace(' ', '')
            if rl == '纯电动':
                return False
            else:
                return True
        else:
            print("对应错误！", carUrl)
            return False



def saveCarAllInfo(finBsObj, i, index, cities, city, carTypes, carType, valueNum, carUrl):
    """用来存储汽车的所有信息"""
    try:
        nowTime = getNowTime()
        # 获取汽车基本信息
        shortInfo = getCarShortInfo(finBsObj, i, index)
        shortInfo['id'] = nowTime
        shortInfo['cartype'] = carTypes[carType]
        shortInfo['place'] = cities[city]
        shortInfo['isFrom'] = '人人车'
        # 获取汽车基本参数
        baseInfo = getCarBaseInfo(finBsObj, valueNum)
        baseInfo['id'] = nowTime
        # 获取汽车引擎参数
        engineInfo = getCarEngineInfo(finBsObj, valueNum)
        engineInfo['id'] = nowTime
        # 获取汽车底盘及自制动类型
        stoppingInfo = getCarStoppingInfo(finBsObj, valueNum)
        stoppingInfo['id'] = nowTime
        # 获取汽车安全配置参数
        safeInfo = getCarSafeInfo(finBsObj, valueNum)
        safeInfo['id'] = nowTime
        # 获取汽车外部配置信息
        outsideInfo = getCarOutsideInfo(finBsObj, valueNum)
        outsideInfo['id'] = nowTime
        # 获取汽车内部配置信息
        insideInfo = getCarInsideInfo(finBsObj, valueNum)
        insideInfo['id'] = nowTime
        # 获取汽车图片
        carPic = getCarPic(finBsObj)
        carPic['id'] = nowTime

        res = cities[city]+' '+carTypes[carType]+' '+str(i)+' '+str(index)+' '
        res += db.insertCarBaseInfo(baseInfo)
        res += db.insertCarEngineInfo(engineInfo)
        res += db.insertCarStoppingInfo(stoppingInfo)
        res += db.insertCarSafeInfo(safeInfo)
        res += db.insertCarOutsideInfo(outsideInfo)
        res += db.insertCarInsideInfo(insideInfo)
        res += db.insertCarPic(carPic)
        res += db.insertCarShortInfo(shortInfo)
        res += "抓取完毕！"
        print(res)

    except BaseException as err:
        print(cities[city], carTypes[carType], i, index, "存储信息时发生错误! ")
        print('错误描述为：', valueNum, carUrl, err)

