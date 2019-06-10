import renRen_func as rr

url = "https://www.renrenche.com/"
cookie = 'rrc_ip_province=%E6%B5%99%E6%B1%9F; new_visitor_uuid=d7a938b90cfeb4ea33b37cff702e4d58; rrc_promo_two_years=rrc_promo_two_years; _ga=GA1.2.1770156642.1549969281; rls_uuid=78ADBF84-D34A-4DA1-B563-256557234EC8; CNZZDATA1254447652=1533262456-1457330637-https%253A%252F%252Fwww.renrenche.com%252F%7C1457330637; rrc_modified_city=true; zhimai-page-list-banner=true; rrc_modified_city=true; UM_distinctid=1691ee82af832c-0e5d3297866a82-5b412a18-144000-1691ee82afa423; rrc_new_city_open=rrc_new_city_open; rrc_muti_city_name=wz_; Hm_lvt_41492a13e2cb85da5d4810b1d7f8a01a=1551002201; gifts-show=1551006497061; gifts-show-time=2; popwin-show-time=7; popwin-show=1551006740086; rrc_record_city=jh; rrc_rrc_session=to7ub11q0cuubg3n426s79t7h1; rrc_rrc_signed=s%2Cto7ub11q0cuubg3n426s79t7h1%2Cced496034a2ef1e33812e497e0183aea; rrc_fr=bd_pz; rrc_tg=fr%3Dbd_pz%26tg_aid%3D10055728; rrc_ss=initiative; rrc_session_city=jh; _gat=1; Hm_lvt_c8b7b107a7384eb2ad1c1e2cf8c62dbe=1550642306,1550805895,1551001493,1551054897; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22168e15e51a6434-0e60761f4db4d1-58422116-1327104-168e15e51a7270%22%2C%22%24device_id%22%3A%22168e15e51a6434-0e60761f4db4d1-58422116-1327104-168e15e51a7270%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E5%BC%95%E8%8D%90%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Fsp0.baidu.com%2F9q9JcDHa2gU2pMbgoY3K%2Fadrc.php%3Ft%3D06KL00c00fDju9C0fMux0PIxI008rZPT00000A-7O-b00000T0o2Bs.THLcztWQ_eR0UWdBmy-bIfK15H9BPvDYuhD1nj0snWT3nAm0IHYYnbNAnWwjnW7arHDYfYN7fRc4fb7aPRfknYn1nW-%22%2C%22%24latest_referrer_host%22%3A%22sp0.baidu.com%22%2C%22%24latest_search_keyword%22%3A%22%E4%BA%BA%E4%BA%BA%E8%BD%A6%22%7D%7D; LXB_REFER=sp0.baidu.com; _pzfxuvpc=1549969280997%7C2421959215142404441%7C137%7C1551054904521%7C18%7C8489033661729931065%7C2845474214974203132; _pzfxsvpc=2845474214974203132%7C1551054897163%7C2%7Chttps%3A%2F%2Fsp0.baidu.com%2F9q9JcDHa2gU2pMbgoY3K%2Fadrc.php%3Ft%3D06KL00c00fDju9C0fMux0PIxI008rZPT00000A-7O-b00000T0o2Bs.THLcztWQ_eR0UWdBmy-bIfK15H9BPvDYuhD1nj0snWT3nAm0IHYYnbNAnWwjnW7arHDYfYN7fRc4fb7aPRfknYn1nW-an0K95gTqFhdWpyfqn1DdnjR1PWbkniusThqbpyfqnHm0uHdCIZwsT1CEQLILIz4zuy4zuy4WpAR8mvqVQ1qhTWdBu7qsXBuYudq9pyfqnH0sPHRLnW60mLFW5HD4nHb%26tpl%3Dtpl_11534_18995_14134%26l%3D1509836137%26attach%3Dlocation%253D%2526linkName%253D%2525E6%2525A0%252587%2525E5%252587%252586%2525E5%2525A4%2525B4%2525E9%252583%2525A8-%2525E6%2525A0%252587%2525E9%2525A2%252598-%2525E4%2525B8%2525BB%2525E6%2525A0%252587%2525E9%2525A2%252598%2526linkText%253D%2525E3%252580%252590%2525E4%2525BA%2525BA%2525E4%2525BA%2525BA%2525E8%2525BD%2525A6%2525E4%2525BA%25258C%2525E6%252589%25258B%2525E8%2525BD%2525A6%2525E3%252580%252591%2525E4%2525B9%2525B0%2525E8%2525BD%2525A6%2525E6%25259C%252589%2525E4%2525BF%25259D%2525E9%25259A%25259C%25252C%2525E5%25258D%252596%2525E8%2525BD%2525A6%2525E6%25259B%2525B4%2525E4%2525BE%2525BF%2525E6%25258D%2525B7%25252C%2525E6%25259C%252589%2525E5%25258F%2525A3%2525E7%2525A2%252591%2525E6%25259B%2525B4%2525E6%252594%2525BE%2525E5%2525BF%252583%2526xp%253Did(%252522m3150536911_canvas%252522)%25252FDIV%25255B1%25255D%25252FDIV%25255B1%25255D%25252FDIV%25255B1%25255D%25252FDIV%25255B1%25255D%25252FDIV%25255B1%25255D%25252FH2%25255B1%25255D%25252FA%25255B1%25255D%2526linkType%253D%2526checksum%253D45%26ie%3DUTF-8%26f%3D8%26tn%3Dbaidu%26wd%3D%25E4%25BA%25BA%25E4%25BA%25BA%25E8%25BD%25A6%26oq%3D%25E4%25BA%25BA%25E4%25BA%25BA%25E8%25BD%25A6%26rqlang%3Dcn; Hm_lpvt_c8b7b107a7384eb2ad1c1e2cf8c62dbe=1551054905'
UA = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
headers = {
    'User-Agent': UA,
    'Cookie': cookie
  }
carUrl = [
    {'num': '180', 'href': 'https://www.renrenche.com/hz/car/d0d555a5b512818b'},
    {'num': '182', 'href': 'https://www.renrenche.com/hz/car/a8adc7dd6a0b84f0'},
    {'num': '183', 'href': 'https://www.renrenche.com/hz/car/0cced9c4c2d509b9'},
    {'num': '184', 'href': 'https://www.renrenche.com/hz/car/46564cb466680aa8'},
    {'num': '185', 'href': 'https://www.renrenche.com/hz/car/49392d3fffccefee'},
    {'num': '186', 'href': 'https://www.renrenche.com/hz/car/bbfc619309214b76'},
    {'num': '187', 'href': 'https://www.renrenche.com/hz/car/bf05d1d86b8ad84b'},
    {'num': '190', 'href': 'https://www.renrenche.com/hz/car/0bf2daf54b23df04'}
]
for i in range(len(carUrl)):
    bsObj = rr.getBSObj(carUrl[i]['href'], headers)
    valueobj = bsObj.findAll('div', {'class': 'item-value'})
    nameobj = bsObj.findAll('div', {'class': 'item-name'})
    valueNum = len(bsObj.findAll('div', {'class': 'item-value'}))
    # print(carUrl[i]['num'], rr.getCarBaseInfo(bsObj, valueNum))
    # print(carUrl[i]['num'], rr.getCarOutsideInfo(bsObj, valueNum))
    # 有问题
    # print(carUrl[i]['num'], rr.getCarStoppingInfo(bsObj, valueNum))
    # print(carUrl[i]['num'], rr.getCarInsideInfo(bsObj, valueNum))
    # print(carUrl[i]['num'], rr.getCarEngineInfo(bsObj, valueNum))
    # print(carUrl[i]['num'], rr.getCarSafeInfo(bsObj, valueNum))
    # print(carUrl[i]['num'], nameobj[62].get_text().replace('\n', '').replace(' ', ''))
    print(rr.isElectricCar(bsObj, carUrl[i]['href'], valueNum))
