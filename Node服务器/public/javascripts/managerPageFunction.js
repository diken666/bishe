 function carInfoStore(method, domID) {
     document.querySelector('#'+domID).addEventListener('click', ()=>{
         let id = document.querySelector('#'+domID).getAttribute('data-id');
         let obj = {};
         if(method === 'shortInfo'){
             obj.carname = $('#c-show-carname').val();
             obj.cartype =  $('#c-show-cartype').val();
             obj.owner = $('#c-show-owner').val();
             obj.place = $('#c-show-place').val();
             obj.price = $('#c-show-price').val();
             obj.firstPay = $('#c-show-firstPay').val();
             obj.spsj = $('#c-show-spsj').val();
             obj.distance = $('#c-show-distance').val();
             obj.spd = $('#c-show-spd').val();
             obj.pfbz = $('#c-show-pfbz').val();
             obj.bsx = $('#c-show-bsx').val();
             obj.pl = $('#c-show-pl').val();
             obj.gh = $('#c-show-gh').val();
             obj.njsj = $('#c-show-njsj').val();
             obj.jqx = $('#c-show-jqx').val();
             obj.syx = $('#c-show-syx').val();
         }
         else if(method === 'baseInfo'){
             obj.company = $('#c-show-base-company').val();
             obj.engine = $('#c-show-base-engine').val();
             obj.bsx = $('#c-show-base-bsx').val();
             obj.body = $('#c-show-base-body').val();
             obj.size = $('#c-show-base-size').val();
             obj.zj = $('#c-show-base-zj').val();
             obj.weight = $('#c-show-base-weight').val();
         }
         else if(method === 'engineInfo'){
            obj.pl = $('#c-show-engine-pl').val();
            obj.jqxs = $('#c-show-engine-jqxs').val();
            obj.qg = $('#c-show-engine-qg').val();
            obj.zdml = $('#c-show-engine-zdml').val();
            obj.zdnj = $('#c-show-engine-zdnj').val();
            obj.rllx = $('#c-show-engine-rllx').val();
            obj.rlbh = $('#c-show-engine-rlbh').val();
            obj.gyfs = $('#c-show-engine-gyfs').val();
            obj.pfbz = $('#c-show-engine-pfbz').val();
         }
         else if(method === 'stopInfo'){
             obj.qdfs = $('#c-show-stop-qdfs').val();
             obj.zlfs = $('#c-show-stop-zlfs').val();
             obj.qxglx = $('#c-show-stop-qxglx').val();
             obj.hxglx = $('#c-show-stop-hxglx').val();
             obj.qzdlx = $('#c-show-stop-qzdlx').val();
             obj.hzdlx = $('#c-show-stop-hzdlx').val();
             obj.qltgg = $('#c-show-stop-qltgg').val();
             obj.hltgg = $('#c-show-stop-hltgg').val();
         }
         else if(method === 'safeInfo'){
             obj.aqqn = $('#c-show-safe-aqqn').val();
             obj.tyjc = $('#c-show-safe-tyjc').val();
             obj.cnzks = $('#c-show-safe-cnzks').val();
             obj.zyjk = $('#c-show-safe-zyjk').val();
             obj.wysqd = $('#c-show-safe-wysqd').val();
             obj.abs = $('#c-show-safe-abs').val();
         }
         else if(method === 'outsideInfo'){
             obj.ddcc = $('#c-show-outside-ddcc').val();
             obj.qjtc = $('#c-show-outside-qjtc').val();
             obj.ddxhm = $('#c-show-outside-ddxhm').val();
             obj.qhddcc = $('#c-show-outside-qhddcc').val();
             obj.ddtj = $('#c-show-outside-ddtj').val();
             obj.hsjjr = $('#c-show-outside-hsjjr').val();
         }
         else if(method === 'insideInfo'){
             obj.fxp = $('#c-show-inside-fxp').val();
             obj.dsxh = $('#c-show-inside-dsxh').val();
             obj.kt = $('#c-show-inside-kt').val();
             obj.gps = $('#c-show-inside-gps').val();
         }

         $.ajax({
             url: 'http://localhost:3000/carinfostore',
             data:{ id, method, ...obj },
             dataType: 'json',
             success(res){
                 alert(res.msg)
             },
             fail(){
                 alert('请求失败！')
             }
         })
     })
 }


function commentDel(domList){
    for(let i=0; i<domList.length; i++){
        domList[i].addEventListener('click', ()=>{
            var name = domList[i].getAttribute('data-name');
            var id = domList[i].getAttribute('data-id');
            var isDel = confirm('确定删除【'+name+'】的该条评论？');
            if (isDel){
                $.ajax({
                    url: "http://localhost:3000/delcommentandfeedbackerr",
                    data:{
                        id,
                        type: 'comment'
                    },
                    dataType: 'json',
                    success(res){
                        alert(res.msg)
                    },
                    fail(){
                        alert('请求失败！')
                    }
                })
            }

        })
    }
}

function feedbackErrDel(domList){
    for(let i=0; i<domList.length; i++){
        domList[i].addEventListener('click', ()=>{
            var name = domList[i].getAttribute('data-name');
            var id = domList[i].getAttribute('data-id');
            var isDel = confirm('确定删除【'+name+'】的该条反馈？');
            if (isDel){
                $.ajax({
                    url: "http://localhost:3000/delcommentandfeedbackerr",
                    data:{
                        id,
                        type: 'feedbackErr'
                    },
                    dataType: 'json',
                    success(res){
                        alert(res.msg)
                    },
                    fail(){
                        alert('请求失败！')
                    }
                })
            }

        })
    }
}


function getAllQuestion(){
    $.ajax({
        url: "http://localhost:3000/getallquestion",
        dataType: "json",
        success(res){
            var str = `<table class="gridtable"><tr><th>ID</th><th>UID</th><th>标题</th><th>内容</th><th>阅读数</th><th>回复数</th><th>发布时间</th><th>操作</th></tr>`
            for(let i=0; i<res.data.length; i++){
                str += `
                    <tr>
                        <td>${res.data[i].id}</td>
                        <td>${res.data[i].uid}</td>
                        <td>${res.data[i].title}</td>
                        <td>${res.data[i].content}</td>
                        <td>${res.data[i].looknum}</td>
                        <td>${res.data[i].replynum}</td> 
                        <td>${res.data[i].time}</td>
                        <td>
                             <img data-id="${res.data[i].id}" class="q-reply " src="./images/server/reply.png">
                             <img data-title="${res.data[i].title}" data-id="${res.data[i].id}" class='q-delete' src="./images/server/delete.png">
                        </td>
                        
                    </tr>`
            }
            str += '</table>';
            document.querySelector('.q-container').innerHTML = str;
            var qReply = document.querySelectorAll('.q-reply');
            var qDelete = document.querySelectorAll('.q-delete');
            for(let i=0; i<qReply.length; i++){
                qReply[i].addEventListener('click', ()=>{
                    var id = qReply[i].getAttribute('data-id');
                    $('.mask').show();
                    $('.q-reply-container').show();
                    getQuestionComment(id)
                });
                qDelete[i].addEventListener('click', ()=>{
                    var id = qDelete[i].getAttribute('data-id');
                    var title = qDelete[i].getAttribute('data-title');
                    delQuestion(title, id)
                })
            }
        },
        fail(){
            alert("请求失败")
        }
    })
}

function getQuestionComment(qid){
    $.ajax({
        url: "http://localhost:3000/getquestioncomment",
        data:{
            qid
        },
        dataType: "json",
        success(res){
            var str = `<table class="gridtable"><tr><th>ID</th><th>QID</th><th>UID</th><th>用户昵称</th><th>回复内容</th><th>点赞数</th><th>用户头像</th><th>回复时间</th><th>操作</th></tr>`
            for(let i=0; i<res.result.length; i++){
                str += `
                    <tr>
                        <td>${res.result[i].id}</td>
                        <td>${res.result[i].qid}</td>
                        <td>${res.result[i].uid}</td>
                        <td>${res.result[i].name}</td>
                        <td>${res.result[i].content}</td>
                        <td>${res.result[i].likes}</td> 
                        <td>${res.result[i].link}</td>
                        <td>${res.result[i].time}</td>
                        <td>
                             <img data-name="${res.result[i].name}" data-id="${res.result[i].id}" class='q-deleteComment' src="./images/server/delete.png">
                        </td>
                        
                    </tr>`
            }
            str += '</table>';
            document.querySelector('.q-reply-box').innerHTML = str;
            var qDelete = document.querySelectorAll('.q-deleteComment');
            for(let i=0; i<qDelete.length; i++){
                qDelete[i].addEventListener('click', ()=>{
                    var id = qDelete[i].getAttribute('data-id');
                    var name = qDelete[i].getAttribute('data-name');
                    delQuestionComment(name, id)
                })
            }
        },
        fail(){
            alert("请求失败")
        }
    })
}


// 删除用户发表的问问文章
 function delQuestion(title, id){
    var isDel = confirm("确认删除【"+title+"】该条问问？");
    if (isDel){
        $.ajax({
            url: "http://localhost:3000/delquestion",
            data:{
                id
            },
            dataType: 'json',
            success(res){
                alert(res.msg)
            },
            fail(){
                alert('操作失败')
            }

        })
    }
 }

 // 删除用户的问问评论
 function delQuestionComment(name, id){
     var isDel = confirm("确认删除【"+name+"】的该条评论？");
     if (isDel){
         $.ajax({
             url: "http://localhost:3000/delquestioncomment",
             data:{
                 id
             },
             dataType: 'json',
             success(res){
                 alert(res.msg)
             },
             fail(){
                 alert('操作失败')
             }

         })
     }
 }

 // 删除用户的聊天记录
 function getUserChatInfo(){
     $.ajax({
         url: "http://localhost:3000/getuserchatinfo",
         dataType: 'json',
         success(res){
             var str = `<table class="gridtable"><tr><th>ID</th><th>发送者ID</th><th>发送者昵称</th><th>发送者头像</th><th>接受者ID</th><th>接受者昵称</th><th>接受者头像</th><th>内容</th><th>时间</th><th>操作</th></tr>`;
             for(let i=0; i<res.data.length; i++){
                 str += `
                    <tr>
                        <td>${res.data[i].id}</td>
                        <td>${res.data[i].sid}</td>
                        <td>${res.data[i].sname}</td>
                        <td>${res.data[i].simg}</td>
                        <td>${res.data[i].lid}</td>
                        <td>${res.data[i].lname}</td>
                        <td>${res.data[i].limg}</td>
                        <td>${res.data[i].content}</td>
                        <td>${res.data[i].time}</td>
                        <td>
                             <img data-id="${res.data[i].id}" class='q-deleteChatInfo' src="./images/server/delete.png">
                        </td>
                        
                    </tr>`
             }
             str += '</table>';
             document.querySelector('.c-container').innerHTML = str;
             var qDeleteChatInfo = document.querySelectorAll('.q-deleteChatInfo');
             for(let i=0; i<qDeleteChatInfo.length; i++){
                 qDeleteChatInfo[i].addEventListener('click', ()=>{
                     var id = qDeleteChatInfo[i].getAttribute('data-id');
                     delChatInfo(id);
                 })
             }
         },
         fail(){
             alert('获取失败')
         }

     })
 }


 function delChatInfo(id){
    var isDel = confirm("确认删除此条聊天记录？");
    if (isDel){
        $.ajax({
            url: 'http://localhost:3000/delchatinfo',
            data:{
                id
            },
            dataType: "json",
            success(res){
                alert(res.msg);
            },
            fail(){
                alert("操作失败");
            }
        })
    }
 }


 // 获取用户的举报信息
function getUserReport(){
    $.ajax({
        url: 'http://localhost:3000/getalluserreport',
        dataType: "json",
        success(res){
            var str = `<table class="gridtable"><tr><th>ID</th><th>举报者ID</th><th>举报者</th><th>被举报者ID</th><th>被举报者</th><th>举报类型</th><th>举报理由</th><th>举报者电话</th><th>举报时间</th><th>处理时间</th><th>操作</th></tr>`;
            for(let i=0; i<res.data.length; i++){
                str += `
                    <tr>
                        <td>${res.data[i].id}</td>
                        <td>${res.data[i].uid}</td>
                        <td>${res.data[i].uname}</td>
                        <td>${res.data[i].bid}</td>
                        <td>${res.data[i].bname}</td>
                        <td>${res.data[i].type}</td>
                        <td>${res.data[i].reason}</td>
                        <td>${res.data[i].uphone}</td>
                        <td>${res.data[i].time}</td>
                        <td>${res.data[i].checktime}</td>
                        <td>
                             <img data-id="${res.data[i].id}" data-bid="${res.data[i].bid}" class='q-pass' src="./images/server/pass.png">
                             <img data-id="${res.data[i].id}" class='q-deleteReport' src="./images/server/delete.png">
                        </td>
                        
                    </tr>`
            }
            str += '</table>';
            document.querySelector('.r-container').innerHTML = str;
            var qPass = document.querySelectorAll('.q-pass');
            var qDelReport = document.querySelectorAll('.q-deleteReport');
            for(let i=0; i<qPass.length; i++){
                qPass[i].addEventListener('click', ()=>{
                    var bid = qPass[i].getAttribute('data-bid');
                    var id = qPass[i].getAttribute('data-id');
                    reportPass(id, bid);
                });
                qDelReport[i].addEventListener('click', ()=>{
                    var id = qDelReport[i].getAttribute('data-id');
                    delReport(id);
                })
            }
        },
        fail(){
            alert('操作失败')
        }
    })
}


function reportPass(id, bid){
    var isPass = confirm("确认该条举报成功吗？【举报成功后，被举报者将扣去5点行为分】");
    if (isPass){
        $.ajax({
            url: "http://localhost:3000/passreport",
            data: {
                id, bid
            },
            dataType: "json",
            success(res){
                alert(res.msg)
            },
            fail(){
                alert("操作失败")
            }
        })
    }
}
function delReport(id){
    var isDel = confirm("确认删除该条举报信息吗？");
    if (isDel){
        $.ajax({
            url: "http://localhost:3000/delreport",
            data: {
                id
            },
            dataType: "json",
            success(res){
                alert(res.msg)
            },
            fail(){
                alert("操作失败")
            }
        })
    }
}


function getSaleCarInfo(){
    $.ajax({
        url: "http://localhost:3000/getallsalecarinfo",
        dataType: "json",
        success(res){
            var str = `<table class="gridtable"><tr><th>ID</th><th>UID</th><th>汽车类型</th><th>上牌时间</th><th>行驶里程</th><th>车辆所在地</th><th>车辆自评</th><th>发布时间</th><th>预约看车地</th><th>处理时间</th><th>操作</th></tr>`;
            for(let i=0; i<res.data.length; i++){
                str += `
                    <tr>
                        <td>${res.data[i].id}</td>
                        <td>${res.data[i].uid}</td>
                        <td>${res.data[i].cartype}</td>
                        <td>${res.data[i].date}</td>
                        <td>${res.data[i].distance}</td>
                        <td>${res.data[i].city}</td>
                        <td>${res.data[i].appraise}</td>
                        <td>${res.data[i].time}</td>
                        <td>${res.data[i].checkplace}</td>
                        <td>${res.data[i].checktime}</td>
                        <td>
                             <img  data-id="${res.data[i].id}" data-uid="${res.data[i].uid}" class='s-reply' src="./images/server/huihu.png">
                        </td>

                    </tr>`
            }
            str += '</table>';
            document.querySelector('.s-container').innerHTML = str;
            var sReply = document.querySelectorAll('.s-reply');
            for(let i=0; i<sReply.length; i++){
                sReply[i].addEventListener('click', ()=>{
                    var uid = sReply[i].getAttribute('data-uid');
                    var id = sReply[i].getAttribute('data-id');
                    document.querySelector('#lookCarPlace').setAttribute('data-id', id);
                    $('.s-userBox').show();
                    $('.mask').show()
                    getUserInfo(uid);
                });
            }
        },
        fail(){
            alert("操作失败")
        }
    })
}

function getUserInfo(uid) {
    $.ajax({
        url: "http://localhost:3000/getuserinfo",
        data: {
            uid
        },
        dataType: "json",
        success(res){
            var str = `BEGIN:VCARD`+ '\n'+
            `VERSION:2.1`+'\n'+
            `FN:${res.data.name}`+'\n'+
            `ORG:个人`+'\n'+
            `TITLE:车主 `+'\n'+
            `TEL;WORK;VOICE:${res.data.phone}`+'\n'+
            `ADR;HOME:中国;${res.data.location}; `+'\n'+
            `END:VCARD`;
            var qrcode = new QRCode("qrcode", {
                text: str,
                width: 128,
                height: 128,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
        },
        fail(){
            alert("获取失败")
        }
    })
}


function logOut(){
    var mid = getMID();
    var date = new Date();
    document.cookie = `mid=${mid}; expires=${date.toGMTString()}`;
    window.location.href = '/managelogin'
}

 function getMID(){
     var cookie = document.cookie;
     var cookieStart = cookie.indexOf('mid=');
     var cookieValue = null;
     if(cookieStart > -1){
         var cookieEnd = cookie.indexOf(';', cookieStart);
         if(cookieEnd === -1){
             cookieEnd = cookie.length;
         }
         cookieValue = decodeURIComponent(cookie.substring(cookieStart+'mid='.length, cookieEnd))
     }
     return cookieValue;

 }