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

// 点击注销按钮后
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

