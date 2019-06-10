
var obj = {

    shortInfoStore(id, carname, cartype, owner, place, price, firstPay, spsj, distance, spd, pfbz, bsx, pl, gh, njsj, jqx, syx){
        return `update shortcarinfo set
              carname = '${carname}', cartype = '${cartype}', owner = '${owner}', place = '${place}', price = ${price}, 
              firstPay = ${firstPay}, spsj = '${spsj}', xslc = ${distance}, spd = '${spd}', pfbz = '${pfbz}', 
              bsx = '${bsx}', pl = ${pl}, gh = ${gh}, nj = '${njsj}', jqx = '${jqx}', syx = '${syx}'  
              where id = '${id}'
      `
    },
    baseInfoStore(id, company, engine, bsx, body, size, zj, weight){
        return `update basecarinfo set 
          company = '${company}', engine = '${engine}', bsx = '${bsx}', body = '${body}', 
          carSize = '${size}', zj = '${zj}', weight = '${weight}'
          where id = '${id}'
          `
    },
    engineInfoStore(id, pl, jqxs, qg, zdml, zdnj, rllx, rlbh, gyfs, pfbz){
        return `update engineinfo set
          pl = ${pl}, jqxs = '${jqxs}', qg = '${qg}', zdml = ${zdml}, zdnj = ${zdnj}, rllx = '${rllx}',
          rlbh = '${rlbh}', gyfs = '${gyfs}', pfbz = '${pfbz}'    
          where id = '${id}'    
`
    },
    stopInfoStore(id, qdfs, zlfs, qxglx, hxglx, qzdlx, hzdlx, qltgg, hltgg){
        return `update stoppinginfo set
        qdfs = '${qdfs}', zlfs = '${zlfs}', qxglx = '${qxglx}', hxglx = '${hxglx}', qzdlx = '${qzdlx}',
        hzdlx = '${hzdlx}', qltgg = '${qltgg}', hltgg = '${hltgg}'
        where id = '${id}'         
`
    },
    safeInfoStore(id, aqqn, tyjc, cnzks, zyjk, wysqd, abs){
        return `update safeinfo set
          aqqn = '${aqqn}', tyjc = '${tyjc}', cnzks = '${cnzks}', zyjk = '${zyjk}', wysqd = '${wysqd}', fbsxt = '${abs}'
        where id = '${id}'
`
    },
    outsideInfoStore(id, ddtc, qjtc, ddxhm, qhddcc, ddtj, hsjjr){
        return `update outsideinfo set
        ddtc = '${ddtc}', qjtc = '${qjtc}', ddxhm = '${ddxhm}', qhddcc = '${qhddcc}',
        ddtj = '${ddtj}', hsjjr = '${hsjjr}' 
        where id = '${id}'        
`
    },
    insideInfoStore(id, fxp, dsxh, kt, gps){
        return `update insideinfo set
        fxp = '${fxp}', dsxh = '${dsxh}', kt = '${kt}', GPS = '${gps}'
        where id = '${id}'        
`
    }


};

module.exports = obj;