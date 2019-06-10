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
    except BaseException as err:
        print("转换真正的数字时出错：", err)
        return res
    finally:
        return res


tempStr = '奥迪-A2L 5041款 TFSI 百万纪念智领型'
carname = ''
for ch in tempStr:
    if ch.isdigit():
        carname += getRealNum(ch)
        print(ch+' -> '+getRealNum(ch))
    else:
        carname += ch

print(carname)
