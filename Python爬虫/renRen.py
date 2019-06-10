import renRen_func as rr

url = "https://www.renrenche.com/"
cookie = 'rrc_ip_province=%E6%B5%99%E6%B1%9F; new_visitor_uuid=d7a938b90cfeb4ea33b37cff702e4d58; rrc_promo_two_years=rrc_promo_two_years; _ga=GA1.2.1770156642.1549969281; rls_uuid=78ADBF84-D34A-4DA1-B563-256557234EC8; CNZZDATA1254447652=1533262456-1457330637-https%253A%252F%252Fwww.renrenche.com%252F%7C1457330637; rrc_modified_city=true; zhimai-page-list-banner=true; rrc_modified_city=true; UM_distinctid=1691ee82af832c-0e5d3297866a82-5b412a18-144000-1691ee82afa423; rrc_new_city_open=rrc_new_city_open; rrc_muti_city_name=wz_; popwin-show-time=7; popwin-show=1551146083719; gifts-show=1551150289692; gifts-show-time=3; rrc_rrc_session=2lr37rjph9msjg54lj0fbvkrf7; rrc_rrc_signed=s%2C2lr37rjph9msjg54lj0fbvkrf7%2C86f6b38f8a1741e87687e554f29e32d0; rrc_fr=bd_seo; rrc_tg=fr%3Dbd_seo; rrc_ss=initiative; _gat=1; Hm_lvt_c8b7b107a7384eb2ad1c1e2cf8c62dbe=1551001493,1551054897,1551141422,1551227059; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22168e15e51a6434-0e60761f4db4d1-58422116-1327104-168e15e51a7270%22%2C%22%24device_id%22%3A%22168e15e51a6434-0e60761f4db4d1-58422116-1327104-168e15e51a7270%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E8%87%AA%E7%84%B6%E6%90%9C%E7%B4%A2%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Fwww.baidu.com%2Flink%22%2C%22%24latest_referrer_host%22%3A%22www.baidu.com%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%7D%7D; LXB_REFER=www.baidu.com; rrc_record_city=hz; rrc_session_city=hz; _pzfxuvpc=1549969280997%7C2421959215142404441%7C248%7C1551227194258%7C33%7C1034661364149512334%7C7423083562173575641; _pzfxsvpc=7423083562173575641%7C1551227058798%7C6%7Chttps%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3DdFoLSW98IvzhZxSVv2dcWCWmCUGa7fTx8wdbd5QPHOwHdwehNoGDwmdEHq11gZco%26wd%3D%26eqid%3Dc80e14e2000285d6000000065c75d8ad; Hm_lpvt_c8b7b107a7384eb2ad1c1e2cf8c62dbe=1551227194; Hm_lvt_41492a13e2cb85da5d4810b1d7f8a01a=1551002201,1551141422,1551227194; Hm_lpvt_41492a13e2cb85da5d4810b1d7f8a01a=1551227194'
UA = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
headers = {
    'User-Agent': UA,
    'Cookie': cookie
  }
cities = rr.getCity()
carTypes = rr.getCarType()
for city in cities:
    for carType in carTypes:
        try:
            bsObj = rr.getBSObj(url+city+'/'+carType, headers)
            carPage = rr.getCarPage(bsObj)
            for i in range(carPage):
                try:
                    newUrl = url+city+'/'+carType+'/p'+str(i+1)
                    print(cities[city], carTypes[carType], i+1, newUrl)
                    if i == 0:
                        newBsObj = bsObj
                    else:
                        newBsObj = rr.getBSObj(newUrl, headers)
                    carLinkObj = rr.getCarLink(newBsObj)
                    for j in range(len(carLinkObj)):
                        try:
                            if carLinkObj[j]['city'] == city:
                                carUrl = url + city + '/car/' + carLinkObj[j]['href']
                                # print(carUrl)
                                finBsObj = rr.getBSObj(carUrl, headers)
                                valueNum = len(finBsObj.findAll('div', {'class': 'item-value'}))
                                isContinue = rr.isElectricCar(finBsObj, carUrl, valueNum)

                                if isContinue:
                                    rr.saveCarAllInfo(finBsObj, i+1, j+1, cities, city, carTypes, carType, valueNum, carUrl)
                                else:
                                    continue
                            else:
                                print("不算！该车属于【" + carLinkObj[j]['city'] + "】")
                        except BaseException as error:
                            print("车辆循环抓取时出现错误！", "当前：【"+str(i+1)+"】【"+str(j+1)+"】")
                            print("错误描述：", error)
                except BaseException as err:
                    print("页码页出错：", err)
        except BaseException as err:
            print("外部：", err)


