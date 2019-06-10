import guazi_func as gz

url = "https://www.guazi.com/"
cookie = 'uuid=118ef1ff-976c-4f13-b975-060619000430; ganji_uuid=4601757950395261804501; lg=1; financeCityDomain=nb; Hm_lvt_936a6d5df3f3d309bda39e92da3dd52f=1550463772; clueSourceCode=10103000312%2300; sessionid=cb9fe14c-fe80-469b-fe79-0ebadd7d7706; cainfo=%7B%22ca_s%22%3A%22pz_baidu%22%2C%22ca_n%22%3A%22tbmkbturl%22%2C%22ca_medium%22%3A%22-%22%2C%22ca_term%22%3A%22-%22%2C%22ca_content%22%3A%22%22%2C%22ca_campaign%22%3A%22%22%2C%22ca_kw%22%3A%22%25e7%2593%259c%25e5%25ad%2590%22%2C%22keyword%22%3A%22-%22%2C%22ca_keywordid%22%3A%22-%22%2C%22scode%22%3A%2210103000312%22%2C%22ca_transid%22%3A%22%22%2C%22platform%22%3A%221%22%2C%22version%22%3A1%2C%22ca_i%22%3A%22-%22%2C%22ca_b%22%3A%22-%22%2C%22ca_a%22%3A%22-%22%2C%22display_finance_flag%22%3A%22-%22%2C%22client_ab%22%3A%22-%22%2C%22guid%22%3A%22118ef1ff-976c-4f13-b975-060619000430%22%2C%22sessionid%22%3A%22cb9fe14c-fe80-469b-fe79-0ebadd7d7706%22%7D; _gl_tracker=%7B%22ca_source%22%3A%22-%22%2C%22ca_name%22%3A%22-%22%2C%22ca_kw%22%3A%22-%22%2C%22ca_id%22%3A%22-%22%2C%22ca_s%22%3A%22self%22%2C%22ca_n%22%3A%22-%22%2C%22ca_i%22%3A%22-%22%2C%22sid%22%3A33328051149%7D; user_city_id=35; antipas=3648G495F07766u003V7E7dad1; cityDomain=zjtaizhou; preTime=%7B%22last%22%3A1550887174%2C%22this%22%3A1549967158%2C%22pre%22%3A1549967158%7D'
UA = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
headers = {
    'User-Agent': UA,
    'Cookie': cookie
  }

cities = gz.getCity()
carTypes = gz.getCarType()
for city in cities:
    for carType in carTypes:
        realUrl = url + city + "/" + carType
        # 得到网页的bs对象
        bsObj = gz.getBSObj(realUrl, headers)
        # 当前页的car-a
        carList = bsObj.findAll("a", {"class": "car-a"})
        # print(bsObj)
        # 判断是否有分页
        if bsObj.find('ul', {'class': 'pageLink'}):
            uls = bsObj.find('ul', {'class': 'pageLink'})
            # 用temp来存储页面的page信息，存储的格式类似如下
            # ['1', '2', '3', '4', '5', '6', '7', '...', '14', '下一页>']
            temp = []
            for ul in uls:
                for li in ul:
                    temp.append(li.get_text())
            # 取出temp中的最大页码
            try:
                maxPage = int(temp[-2])
            except BaseException as error:
                print("转换页码出错：", error)
                maxPage = 0
            maxCarNum = gz.getCarNum(bsObj, 'listFilter')
            for i in range(maxPage):
                finalUrl = url+city+"/"+carType+"/o"+str(i+1)
                if i+1 != maxPage:
                    for j in range(40):
                        appendStr = carList[j].get('href').split('#')[0].split('/')[2]
                        realCity = carList[j].get('href').split('#')[0].split('/')[1]
                        # print(cities[city]+"： 第" + str(i) + "页", url+city+"/"+appendStr)
                        gz.saveCarAllInfo(url+city+"/"+appendStr, headers, i, j, cities, city, carTypes, carType, realCity)
                else:
                    lastCarNum = maxCarNum - (maxPage - 1) * 40
                    for j in range(lastCarNum):
                        appendStr = carList[j].get('href').split('#')[0].split('/')[2]
                        realCity = carList[j].get('href').split('#')[0].split('/')[1]
                        # print(cities[city]+"： 第" + str(i) + "页", url+city+"/"+appendStr)
                        gz.saveCarAllInfo(url+city+"/"+appendStr, headers, i, j, cities, city, carTypes, carType, realCity)
        else:
            # 用周边城市的t-i类来确认此地区有无该种车
            # 如果t-i的div的文字数组==2时，表明此地区有这种车

            li = bsObj.find("div", {"class": "t-i"})
            try:
                if len(li.get_text().split('|')) == 2:
                    lists = bsObj.findAll("div", {"class": "t-i"})
                    # 页码
                    i = 0
                    # 第几项
                    j = 0
                    for item in lists:
                        appendStr = carList[j].get('href').split('#')[0].split('/')[2]
                        realCity = carList[j].get('href').split('#')[0].split('/')[1]
                        gz.saveCarAllInfo(url+city+"/"+appendStr, headers, i, j, cities, city, carTypes, carType, realCity)
                        j += 1
                else:
                    print("【" + cities[city] + "】" + "没有" + "【" + carTypes[carType] + "】" + "的车辆出售！")
            except BaseException as err:
                print(err)
