var userName = getUserName();
var uid = getUid();
if(userName){
    var a = document.querySelector('.username');
    var noUser = document.querySelector('.noUser');
    var hasUser = document.querySelector('.hasUser');
    a.innerText = userName;
    noUser.style.display= 'none';
    hasUser.style.display = 'inline-block';
}
var quit = document.getElementsByClassName('quit');
quit[0].addEventListener('click', function(e){
    var hasUser = document.querySelector('.hasUser');
    var noUser = document.querySelector('.noUser');
    var date = new Date();
    e.preventDefault();
    document.cookie = `userName=${userName}; expires=${date.toGMTString()}`;
    document.cookie = `uid=${uid}; expires=${date.toGMTString()}`;
    noUser.style.display = 'inline-block';
    hasUser.style.display = 'none';
});
var caTitle = document.querySelector('.ca-title');
var caList = document.querySelector('.ca-list');
var gbTitle = document.querySelector('.gb-title');
var gbList = document.querySelector('.gb-list');
var disTitle = document.querySelector('.dis-title');
var disList = document.querySelector('.dis-list');
var plTitle = document.querySelector('.pl-title');
var plList = document.querySelector('.pl-list');
var bzTitle = document.querySelector('.bz-title');
var bzList = document.querySelector('.bz-list');
var fromTitle = document.querySelector('.from-title');
var fromList = document.querySelector('.from-list');
var more = document.querySelector('.more');
var title = [caTitle, gbTitle, disTitle, plTitle, bzTitle, fromTitle];
var list = [caList, gbList, disList, plList, bzList, fromList];
more.onmouseleave = function () {
    for (let i=0; i< list.length; i++){
        list[i].style.display = 'none';
    }
};
for (let i=0; i< title.length; i++){
    title[i].onmouseenter = function(){
        for (let j=0; j<list.length; j++){
            if (j === i){
                list[j].style.display = 'block';
            }else{
                list[j].style.display = 'none'
            }
        }
    };
    list[i].onmouseleave = function () {list[i].style.display = 'none'};
}
var moreCar = document.querySelector('.more-car');
var allCar = document.querySelector('.all-car');
var carName = document.querySelector('.carname');
moreCar.onmouseenter = function(){
    allCar.style.display ='block';
};
allCar.onmouseleave = function () {
    allCar.style.display = 'none';
};
carName.onmouseleave = function () {
    allCar.style.display = 'none';
};


cityTypePriceClick('location', 'city-select', 0, '');
cityTypePriceClick('carType', 'type-select', 1, '');
cityTypePriceClick('carPrice', 'price-select', 2, 'price-select');
othersClick('carAge', 'CarAge', 'Age-select');
othersClick('gear-box', 'gearBox', 'gear-select');
othersClick('distance', 'Dis', 'dis-select');
othersClick('pl', 'PL', 'pl-select');
othersClick('bz', 'BZ', 'bz-select');
othersClick('from', 'FROM', 'from-select');
setClearSelect('CarAge', 'carAge', 'Age-select');
setClearSelect('gearBox', 'gear-box', 'gear-select');
setClearSelect('Dis', 'distance', 'dis-select');
setClearSelect('PL', 'pl', 'pl-select');
setClearSelect('BZ', 'bz', 'bz-select');
setClearSelect('FROM', 'from', 'from-select');


// 提交表单
var formBtn = document.querySelector('#formBtn');
formBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var result = [];
    var selectText = document.querySelectorAll('.select-text');
    var href = '';
    for(let i=0; i<selectText.length; i++){
        if(i <2 ){
            var text = selectText[i].innerText;
            if (text.indexOf('不限') === -1){
                result.push(text.split(':')[1]);
            }else{
                result.push('');
            }

        }else{
            result.push(selectText[i].getAttribute('data-info'))
        }
    }
    for (let i=0; i<result.length; i++){
        switch(i){
            case 0: href += '?city='+encodeURI(result[0]); break;
            case 1: href += '&ct='+result[1]; break;
            case 2: href += '&cp='+result[2]; break;
            case 3: href += '&ca='+result[3]; break;
            case 4: href += '&gb='+result[4]; break;
            case 5: href += '&dis='+result[5]; break;
            case 6: href += '&pl='+result[6]; break;
            case 7: href += '&bz='+result[7]; break;
            case 8: href += '&from='+result[8]; break;
        }
    }
    console.log(result);
    console.log(href);
    window.location.href = href;
});

var page = document.querySelector('.page');
pageClick(page);

