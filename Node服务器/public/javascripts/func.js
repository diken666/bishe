function getUserName(){
    var cookie = document.cookie;
    var cookieStart = cookie.indexOf('userName=');
    var cookieValue = null;
    if(cookieStart > -1){
        var cookieEnd = cookie.indexOf(';', cookieStart);
        if(cookieEnd === -1){
            cookieEnd = cookie.length;
        }
        cookieValue = decodeURIComponent(cookie.substring(cookieStart+'userName='.length, cookieEnd))
    }
    return cookieValue;

}
function getUid(){
    var cookie = document.cookie;
    var cookieStart = cookie.indexOf('uid=');
    var cookieValue = null;
    if(cookieStart > -1){
        var cookieEnd = cookie.indexOf(';', cookieStart);
        if(cookieEnd === -1){
            cookieEnd = cookie.length;
        }
        cookieValue = decodeURIComponent(cookie.substring(cookieStart+'uid='.length, cookieEnd))
    }
    return cookieValue;

}

function cityTypePriceClick(obj1_class, obj2_class, num, obj3_class){
    var obj1 = document.querySelectorAll('.'+obj1_class);
    var obj2 = document.querySelector('.'+obj2_class);
    var obj3 = '';
    if(obj3_class){
        obj3 = document.querySelector('.'+obj3_class);
    }
    for(let i=0; i<obj1.length; i++){
        obj1[i].addEventListener('click', function(e){
            e.preventDefault();
            var temp = obj2.innerText;
            obj2.innerText = temp.split(':')[0]+':'+obj1[i].innerText;
            if (num === 1 && i > 15) {
                obj1[15].classList.add('select');
                obj1[15].innerText = obj1[i].innerText;
                for(let j=0; j<15; j++){
                    if(i !== j){
                        obj1[j].classList.remove('select');
                    }
                }
            }
            if(num === 1 && i < 15){
                obj1[i].classList.add('select');
                obj1[15].innerText = '';
                for(let j=0; j<obj1.length; j++){
                    if(i !== j){
                        obj1[j].classList.remove('select');
                    }
                }
            }
            if(num === 2){
                obj1[i].classList.add('select');
                obj3.setAttribute('data-info',obj1[i].getAttribute('data-info'));
                for(let j=0; j<obj1.length; j++){
                    if(i !== j){
                        obj1[j].classList.remove('select');
                    }
                }
            }
            if(num === 0){
                obj1[i].classList.add('select');
                for(let j=0; j<obj1.length; j++){
                    if(i !== j){
                        obj1[j].classList.remove('select');
                    }
                }
            }

        })
    }
}
function othersClick(obj1_class, obj2_class, obj3_class){
    var obj1 = document.querySelectorAll('.'+obj1_class);
    var obj2 = document.querySelector('.'+obj2_class);
    var obj3 = document.querySelector('.'+obj3_class);
    for(let i=0; i<obj1.length; i++){
        obj1[i].addEventListener('click', function(e){
            e.preventDefault();
            obj1[i].classList.add('click');
            var temp = obj3.innerText;
            obj2.style.display = 'inline-block';
            obj3.innerText = temp.split(':')[0]+ ":" + obj1[i].innerText;
            obj3.setAttribute('data-info', obj1[i].getAttribute('data-info'));
            for(let j=0; j<obj1.length; j++){
                if(i !== j){
                    obj1[j].classList.remove('click');
                }
            }
        })
    }
}
function setClearSelect(obj1_class, obj2_class, obj3_class){
    var obj1 = document.querySelector('.'+obj1_class);
    var obj2 = document.querySelectorAll('.'+obj2_class);
    var obj3 = document.querySelector('.'+obj3_class);
    obj1.addEventListener('click', function(e){
        e.preventDefault();
        obj3.setAttribute('data-info', '');
        obj1.style.display = 'none';
        for(let i=0; i<obj2.length; i++){
            obj2[i].classList.remove('click');
        }
    })
}



//当页码被点击时
function pageClick(obj){
    var childLen = obj.children.length;
    var childs = obj.children;
    for(let i=0; i< childLen; i++){
        childs[i].addEventListener('click', function(e){
            e.preventDefault();
        })
    }
}


// 向页面插入页码
function insertPage(className, pageNow, allPage){
    var page = document.querySelector('.' + className);
    var item = '';
    if(allPage <= 5){
        for (let i=0; i<allPage+2; i++){
            if (i===0 || i=== allPage+1){
                item += '<li></li>'
            }else{
                if (i === pageNow){
                    item += `<li class="active">${i}</li>`
                } else{
                    item += `<li>${i}</li>`
                }
            }
        }
    }
    if(allPage > 5){
        for (let i=0; i<allPage+2; i++){
            if (i===0 || i=== allPage+1){
                item += '<li></li>'
            }else{
                if (i === pageNow){
                    item += `<li class="active">${i}</li>`
                } else{
                    item += `<li>${i}</li>`
                }
            }
        }
    }
    page.innerHTML = item;
}



