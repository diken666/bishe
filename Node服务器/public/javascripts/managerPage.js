
$(document).ready(function(){

    //页面首页加载用户列表信息
    $.ajax({
        url: 'http://localhost:3000/getalluserinfo',
        dataType: 'json',
        success(res){
            var str = `<table class="gridtable"><tr><th>UID</th><th>密码</th><th>昵称</th><th>性别</th><th>地址</th><th>电话</th><th>头像</th><th>行为分</th><th>注册时间</th><th>操作</th></tr>`
            for(let i=0; i<res.data.length; i++){
                str += `
                    <tr>
                        <td>${res.data[i].uid}</td>
                        <td>${res.data[i].password}</td>
                        <td>${res.data[i].name}</td>
                        <td>${res.data[i].sex}</td>
                        <td>${res.data[i].location}</td>
                        <td>${res.data[i].phone}</td>
                        <td>${res.data[i].link}</td>
                        <td>${res.data[i].score}</td>
                        <td>${res.data[i].time}</td>
                        <td>
                             <img data-uid="${res.data[i].uid}" class="update" src="./images/server/update.png">
                             <img data-name="${res.data[i].name}" data-uid="${res.data[i].uid}" class='delete' src="./images/server/delete.png">
                        </td>
                        
                    </tr>`
            }
            str += '</table>';
            document.querySelector('.u-container').innerHTML = str;

            // 成功后，为用户信息页的用户信息操作添加监听事件
            var updateDOM = document.querySelectorAll('.update');
            var deleteDOM = document.querySelectorAll('.delete');
            for(let i=0; i<updateDOM.length; i++){
                updateDOM[i].addEventListener('click', e=>{
                    let uid = updateDOM[i].getAttribute('data-uid');
                    $('#uid').val(uid);
                    $('#password').val(res.data[i].password);
                    $('#name').val(res.data[i].name);
                    $('#sex').val(res.data[i].sex);
                    $('#location').val(res.data[i].location);
                    $('#phone').val(res.data[i].phone);
                    $('#link').val(res.data[i].link);
                    $('#score').val(res.data[i].score);
                    $('#time').val(res.data[i].time);
                    // updateBox弹出， mask弹出防止用户其他操作
                    $('.updateBox').show();
                    $('.mask').show()
                });
                deleteDOM[i].addEventListener('click', e=>{
                    let uid = deleteDOM[i].getAttribute('data-uid');
                    let name = deleteDOM[i].getAttribute('data-name');
                    var isDelete = confirm(`确认删除用户【${name}】`);
                    if(isDelete){
                        $.ajax({
                            url: 'http://localhost:3000/deleteuserinfo',
                            data: {uid},
                            dataType: 'json',
                            success(res){
                                alert(res.msg)
                            },
                            fail(){
                                alert('删除失败！')
                            }
                        })
                    }

                })
            }
        },
        fail(){
            document.querySelector('.u-container').innerHTML =   '<h4>获取用户数据失败，请检查连接</h4>'
        }
    });

    // 当updateBox中的按钮被点击时
    $('.cancel').on('click',()=>{
        $('.updateBox').hide();
        $('.mask').hide();
    });
    $('.submit').on('click',()=>{
        var uid = $('#uid').val();
        var password = $('#password').val();
        var name = $('#name').val();
        var sex = $('#sex').val();
        var location = $('#location').val();
        var phone = $('#phone').val();
        var link = $('#link').val();
        var score = $('#score').val();
        console.log(score)
        $.ajax({
            url: "http://localhost:3000/updateuserinfo",
            data: {
                uid, password, name, sex, location, phone,score, link
            },
            dataType: 'json',
            success(res){
                alert(res.msg);
                $('.updateBox').hide()
                $('.mask').hide()
            },
            fail(){
                alert('修改失败！')
            }
        })
    });

    // 当左侧导航栏的 n-item 被点击时
    var nItemDOM = document.querySelectorAll('.n-item');
    for(let i=0; i<nItemDOM.length; i++){
        nItemDOM[i].addEventListener('click', ()=>{
            nItemDOM[i].classList.add('n-item-active');
            for(let j=0; j<nItemDOM.length; j++){
                if (i !== j){
                    nItemDOM[j].classList.remove('n-item-active')
                }
            }
            switch (i) {
                case 0:
                    $('.userPage').show();
                    $('.carPage').hide();
                    $('.questionPage').hide();
                    $('.chatPage').hide();
                    $('.reportPage').hide();
                    $('.salePage').hide();
                    break;
                case 1:
                    $('.carPage').show();
                    $('.userPage').hide();
                    $('.questionPage').hide();
                    $('.chatPage').hide();
                    $('.reportPage').hide();
                    $('.salePage').hide();
                    setTimeout(()=>{
                        $('.c-init-box').css({
                            "right":"2px",
                            "transition": "right .5s"
                        });
                    },0);
                    break;
                case 2:
                    $('.questionPage').show();
                    $('.carPage').hide();
                    $('.userPage').hide();
                    $('.chatPage').hide();
                    $('.reportPage').hide();
                    $('.salePage').hide();
                    getAllQuestion();
                    break;
                case 3:
                    $('.chatPage').show();
                    $('.userPage').hide();
                    $('.carPage').hide();
                    $('.questionPage').hide();
                    $('.reportPage').hide();
                    $('.salePage').hide();
                    getUserChatInfo();
                    break;
                case 4:
                    $('.reportPage').show();
                    $('.chatPage').hide();
                    $('.userPage').hide();
                    $('.carPage').hide();
                    $('.questionPage').hide();
                    $('.salePage').hide();
                    getUserReport();
                    break;
                case 5:
                    $('.salePage').show();
                    $('.reportPage').hide();
                    $('.chatPage').hide();
                    $('.userPage').hide();
                    $('.carPage').hide();
                    $('.questionPage').hide();
                    getSaleCarInfo();
                    break;
                case 6:
                    logOut()
            }
        })
    }

    // carPage页tips点击关闭
    $('.c-init-box-close').on('click', ()=>{
        $('.c-init-box').css({
            "right":"-205px",
            "transition": "right .5s"
        })
    });

    // carPage页点击搜索按钮后
    $('.c-search-box-btn').on('click', ()=>{
        if($('.c-search-box-input').val()){
            // 先插入加载动画
            document.querySelector('.c-show-box').innerHTML = `<div class="loadingBox"><img class="loading" src="./images/server/loading.png"></div>`

            // 发送异步请求
            $.ajax({
                url: 'http://localhost:3000/carallinfo',
                data: {
                    id: $('.c-search-box-input').val()
                },
                dataType: 'json',
                success(res){
                    if (res.state === 'error'){
                        document.querySelector('.c-show-box').innerHTML = `<div class="c-show-empty-box"><img src="./images/server/cry.png" alt="empty"><p>${res.msg}~</p></div>`
                    }
                    else {
                        var str = '';


                        // 基本信息
                        str += `
                                <div class="c-show-box-table">
                            <div class="c-show-box-table-title">基本信息</div>
                            <div class="c-show-box-table-container">
                                <div class="c-show-item">
                                    <label for="c-show-id">ID</label><input id="c-show-id" type="text" value="${res.shortInfo.id}" readonly="readonly">
                                </div>
                                <div class="c-show-item">
                                    <label for="c-show-carname">车名</label><input id="c-show-carname" type="text" value="${res.shortInfo.carname}">
                                </div>
                                <div class="c-show-item">
                                    <label for="c-show-cartype">厂商</label><input id="c-show-cartype" type="text" value="${res.shortInfo.cartype}">
                                </div>
                                <div class="c-show-item">
                                    <label for="c-show-owner">车主</label><input id="c-show-owner" type="text" value="${res.shortInfo.owner}">
                                </div>
                                <div class="c-show-item">
                                    <label for="c-show-place">地址</label><input id="c-show-place" type="text" value="${res.shortInfo.place}">
                                </div>
                                <div class="c-show-item">
                                    <label for="c-show-price">价格</label><input id="c-show-price" type="text" value="${res.shortInfo.price}">
                                </div>
                                <div class="c-show-item">
                                    <label for="c-show-firstPay">首付</label><input id="c-show-firstPay" type="text" value="${res.shortInfo.firstPay}">
                                </div>
                                <div class="c-show-item">
                                    <label for="c-show-spsj">上牌时间</label><input id="c-show-spsj" type="text" value="${res.shortInfo.spsj}">
                                </div>
                                <div class="c-show-item">
                                    <label for="c-show-distance">行驶里程</label><input id="c-show-distance" type="text" value="${res.shortInfo.xslc}">
                                </div>
                                <div class="c-show-item">
                                    <label for="c-show-spd">上牌地</label><input id="c-show-spd" type="text" value="${res.shortInfo.spd}">
                                </div>
                                <div class="c-show-item">
                                    <label for="c-show-pfbz">排放标准</label><input id="c-show-pfbz" type="text" value="${res.shortInfo.pfbz}">
                                </div>
                                <div class="c-show-item">
                                    <label for="c-show-bsx">变速箱</label><input id="c-show-bsx" type="text" value="${res.shortInfo.bsx}">
                                </div>
                                <div class="c-show-item">
                                    <label for="c-show-pl">排量</label><input id="c-show-pl" type="text" value="${res.shortInfo.pl}">
                                </div>
                                <div class="c-show-item">
                                    <label for="c-show-gh">过户次数</label><input id="c-show-gh" type="text" value="${res.shortInfo.gh}">
                                </div>
                                <div class="c-show-item">
                                    <label for="c-show-njsj">年检时间</label><input id="c-show-njsj" type="text" value="${res.shortInfo.nj}">
                                </div>
                                <div class="c-show-item">
                                    <label for="c-show-jqx">交强险</label><input id="c-show-jqx" type="text" value="${res.shortInfo.jqx}">
                                </div>
                                <div class="c-show-item">
                                    <label for="c-show-syx">商业险</label><input id="c-show-syx" type="text" value="${res.shortInfo.syx}">
                                </div>
                                <div class="c-show-item">
                                    <label for="c-show-from">数据来源</label><input id="c-show-from" type="text" value="${res.shortInfo.isFrom}" readonly="readonly">
                                </div>
                                <div id="shortInfoSubmit" class="carInfoStore" data-id="${res.shortInfo.id}"></div>
                            </div>
                        </div>`;

                        // 基本参数
                        str += `
                                <div class="c-show-box-small-table">
                                    <div class="c-show-box-table-title">基本参数</div>
                                    <div class="c-show-box-table-container">
                                        <div class="c-show-small-item">
                                            <label for="c-show-base-company">厂商</label>
                                            <input id="c-show-base-company" type="text" value="${res.baseInfo.company}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-base-engine">发动机</label>
                                            <input id="c-show-base-engine" type="text" value="${res.baseInfo.engine}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-base-bsx">变速箱</label>
                                            <input id="c-show-base-bsx" type="text" value="${res.baseInfo.bsx}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-base-body">车身结构</label>
                                            <input id="c-show-base-body" type="text" value="${res.baseInfo.body}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-base-size">长*宽*高</label>
                                            <input id="c-show-base-size" type="text" value="${res.baseInfo.carSize}">
                                            <span>(mm)</span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-base-zj">轴距</label>
                                            <input id="c-show-base-zj" type="text" value="${res.baseInfo.zj}">
                                            <span>(mm)</span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-base-weight">整备质量</label>
                                            <input id="c-show-base-weight" type="text" value="${res.baseInfo.weight}">
                                            <span>(kg)</span>
                                        </div>
                                        <div id="baseInfoSubmit" class="carInfoStore" data-id="${res.baseInfo.id}"></div>
                                    </div>
                                </div>`;

                        // 发动机参数
                        str += `
                                 <div class="c-show-box-small-table">
                                    <div class="c-show-box-table-title">发动机参数</div>
                                    <div class="c-show-box-table-container">
                                        <div class="c-show-small-item">
                                            <label for="c-show-engine-pl">排量</label>
                                            <input id="c-show-engine-pl" type="text" value="${res.engineInfo.pl}">
                                            <span>(L)</span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-engine-jqxs">进气形式</label>
                                            <input id="c-show-engine-jqxs" type="text" value="${res.engineInfo.jqxs}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-engine-qg">气缸</label>
                                            <input id="c-show-engine-qg" type="text" value="${res.engineInfo.qg}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-engine-zdml">最大马力</label>
                                            <input id="c-show-engine-zdml" type="text" value="${res.engineInfo.zdml}">
                                            <span>(Ps)</span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-engine-zdnj">最大扭矩</label>
                                            <input id="c-show-engine-zdnj" type="text" value="${res.engineInfo.zdnj}">
                                            <span>(N*m)</span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-engine-rllx">燃料类型</label>
                                            <input id="c-show-engine-rllx" type="text" value="${res.engineInfo.rllx}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-engine-rlbh">燃料标号</label>
                                            <input id="c-show-engine-rlbh" type="text" value="${res.engineInfo.rlbh}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-engine-gyfs">供油方式</label>
                                            <input id="c-show-engine-gyfs" type="text" value="${res.engineInfo.gyfs}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-engine-pfbz">排放标准</label>
                                            <input id="c-show-engine-pfbz" type="text" value="${res.engineInfo.pfbz}">
                                            <span></span>
                                        </div>
                                        <div id="engineInfoSubmit" class="carInfoStore" data-id="${res.engineInfo.id}"></div>
                                    </div>
                                </div>
                            `;

                        // 底盘及制动
                        str += `
                                <div class="c-show-box-small-table">
                                    <div class="c-show-box-table-title">底盘及制动</div>
                                    <div class="c-show-box-table-container">
                                        <div class="c-show-small-item">
                                            <label for="c-show-stop-qdfs">驱动方式</label>
                                            <input id="c-show-stop-qdfs" type="text" value="${res.stopInfo.qdfs}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-stop-zlfs">助力方式</label>
                                            <input id="c-show-stop-zlfs" type="text" value="${res.stopInfo.zlfs}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-stop-qxglx">前悬挂类型</label>
                                            <input id="c-show-stop-qxglx" type="text" value="${res.stopInfo.qxglx}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-stop-hxglx">后悬挂类型</label>
                                            <input id="c-show-stop-hxglx" type="text" value="${res.stopInfo.hxglx}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-stop-qzdlx">前制动类型</label>
                                            <input id="c-show-stop-qzdlx" type="text" value="${res.stopInfo.qzdlx}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-stop-hzdlx">后制动类型</label>
                                            <input id="c-show-stop-hzdlx" type="text" value="${res.stopInfo.hzdlx}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-stop-qltgg">前轮胎规格</label>
                                            <input id="c-show-stop-qltgg" type="text" value="${res.stopInfo.qltgg}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-stop-hltgg">后轮胎规格</label>
                                            <input id="c-show-stop-hltgg" type="text" value="${res.stopInfo.hltgg}">
                                            <span></span>
                                        </div>
                                        <div id="stopInfoSubmit" class="carInfoStore" data-id="${res.stopInfo.id}"></div>
                                    </div>
                                </div>
                            `;

                        // 安全配置
                        str += `
                                <div class="c-show-box-small-table">
                                    <div class="c-show-box-table-title">安全配置</div>
                                    <div class="c-show-box-table-container">
                                        <div class="c-show-small-item">
                                            <label for="c-show-safe-aqqn">主副安全气囊</label>
                                            <input id="c-show-safe-aqqn" type="text" value="${res.safeInfo.aqqn}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-safe-tyjc">胎压监测</label>
                                            <input id="c-show-safe-tyjc" type="text" value="${res.safeInfo.tyjc}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-safe-cnzks">车内中控锁</label>
                                            <input id="c-show-safe-cnzks" type="text" value="${res.safeInfo.cnzks}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-safe-zyjk">儿童座椅接口</label>
                                            <input id="c-show-safe-zyjk" type="text" value="${res.safeInfo.zyjk}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-safe-wysqd">无钥匙启动</label>
                                            <input id="c-show-safe-wysqd" type="text" value="${res.safeInfo.wysqd}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-safe-abs">防抱死系统</label>
                                            <input id="c-show-safe-abs" type="text" value="${res.safeInfo.fbsxt}">
                                            <span></span>
                                        </div>
                                        <div id="safeInfoSubmit" class="carInfoStore" data-id="${res.safeInfo.id}"></div>
                                    </div>
                                </div>
                            `;

                        // 外部配置
                        str += `
                                <div class="c-show-box-small-table">
                                    <div class="c-show-box-table-title">外部配置</div>
                                    <div class="c-show-box-table-container">
                                        <div class="c-show-small-item">
                                            <label for="c-show-outside-ddcc">电动车窗</label>
                                            <input id="c-show-outside-ddcc" type="text" value="${res.outsideInfo.ddtc}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-outside-qjtc">全景天窗</label>
                                            <input id="c-show-outside-qjtc" type="text" value="${res.outsideInfo.qjtc}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-outside-ddxhm">电动吸合门</label>
                                            <input id="c-show-outside-ddxhm" type="text" value="${res.outsideInfo.ddxhm}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-outside-qhddcc">前后电动车窗</label>
                                            <input id="c-show-outside-qhddcc" type="text" value="${res.outsideInfo.qhddcc}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-outside-ddtj">后视镜电动调节</label>
                                            <input id="c-show-outside-ddtj" type="text" value="${res.outsideInfo.ddtj}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-outside-hsjjr">后视镜加热</label>
                                            <input id="c-show-outside-hsjjr" type="text" value="${res.outsideInfo.hsjjr}">
                                            <span></span>
                                        </div>
                                        <div id="outsideInfoSubmit" class="carInfoStore" data-id="${res.outsideInfo.id}"></div>
                                    </div>
                                </div>
                            `;

                        // 内部配置
                        str += `
                                <div class="c-show-box-small-table">
                                    <div class="c-show-box-table-title">内部配置</div>
                                    <div class="c-show-box-table-container">
                                        <div class="c-show-small-item">
                                            <label for="c-show-inside-fxp">多功能方向盘</label>
                                            <input id="c-show-inside-fxp" type="text" value="${res.insideInfo.fxp}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-inside-dsxh">定速巡航</label>
                                            <input id="c-show-inside-dsxh" type="text" value="${res.insideInfo.dsxh}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-inside-kt">空调</label>
                                            <input id="c-show-inside-kt" type="text" value="${res.insideInfo.kt}">
                                            <span></span>
                                        </div>
                                        <div class="c-show-small-item">
                                            <label for="c-show-inside-gps">GPS</label>
                                            <input id="c-show-inside-gps" type="text" value="${res.insideInfo.GPS}">
                                            <span></span>
                                        </div>
                                        <div id="insideInfoSubmit" class="carInfoStore" data-id="${res.insideInfo.id}"></div>
                                    </div>
                                </div>
                            `;

                        if (res.comments.length === 0) {
                            str += `<div class="c-show-box-table"><div class="c-show-box-table-title">用户评论</div><div class="c-show-box-table-container" style="text-align: center">`;
                            str += `<div class="c-show-empty-content"><img src="./images/server/empty.png" alt="empty"><p>评论为空喔~</p></div></div></div>`
                        }
                        else {
                            // 评论信息
                            str += `<div class="c-show-box-table"><div class="c-show-box-table-title">用户评论</div><div class="c-show-box-table-container" style="text-align: center">`;
                            str += `<table class="gridtable"><tr><th>ID</th><th>UID</th><th>用户昵称</th><th>CID</th><th>评论内容</th><th>点赞数</th><th>评论时间</th><th>操作</th></tr>`
                            for (let i = 0; i < res.comments.length; i++) {
                                str += `
                                    <tr>
                                        <td>${res.comments[i].id}</td>
                                        <td>${res.comments[i].uid}</td>
                                        <td>${res.comments[i].uname}</td>
                                        <td>${res.comments[i].cid}</td>
                                        <td>${res.comments[i].content}</td>
                                        <td>${res.comments[i].likes}</td>
                                        <td>${res.comments[i].time}</td>
                                        <td>
                                             <img data-name="${res.comments[i].uname}" data-id="${res.comments[i].id}" class='delete comments-delete' src="./images/server/delete.png">
                                        </td>
                                    </tr>`
                            }
                            str += `</table></div></div>`;
                        }

                        // 用户错误反馈
                        if (res.feedbackerr.length === 0) {
                            str += `<div class="c-show-box-table"><div class="c-show-box-table-title">用户错误反馈</div><div class="c-show-box-table-container" style="text-align: center">`;
                            str += `<div class="c-show-empty-content"><img src="./images/server/empty.png" alt="empty"><p>反馈为空喔~</p></div></div></div>`
                        }
                        else {
                            str += `<div class="c-show-box-table"><div class="c-show-box-table-title">用户错误反馈</div><div class="c-show-box-table-container" style="text-align: center">`;
                            str += `<table class="gridtable"><tr><th>ID</th><th>CID</th><th>汽车名称</th><th>UID</th><th>错误类型</th><th>错误描述</th><th>发布时间</th><th>操作</th></tr>`
                            for (let i = 0; i < res.feedbackerr.length; i++) {
                                str += `
                                    <tr>
                                        <td>${res.feedbackerr[i].id}</td>
                                        <td>${res.feedbackerr[i].cid}</td>
                                        <td>${res.feedbackerr[i].cname}</td>
                                        <td>${res.feedbackerr[i].uname}</td>
                                        <td>${res.feedbackerr[i].title}</td>
                                        <td>${res.feedbackerr[i].content}</td>
                                        <td>${res.feedbackerr[i].publishtime}</td>
                                        <td>
                                             <img data-name="${res.feedbackerr[i].uname}" data-id="${res.feedbackerr[i].id}" class='delete feedbackErr-delete' src="./images/server/delete.png">
                                        </td>
                                    </tr>`
                            }
                            str += `</table></div></div>`;
                        }

                        // 汽车外观图片
                        str += `<div class="c-show-box-table"><div class="c-show-box-table-title">汽车外观图</div><div class="c-show-box-table-container">`;
                        for (let i = 0; i < res.picInfo.outside.length; i++) {
                            str += `<p>
                                        <a href="${res.picInfo.outside[i]}">${res.picInfo.outside[i]}</a>
                                    </p>`
                        }
                        str += `</div></div>`;


                        // 发动机底盘图片
                        str += `<div class="c-show-box-table"><div class="c-show-box-table-title">发动机底盘图</div><div class="c-show-box-table-container">`;
                        for (let i = 0; i < res.picInfo.engine.length; i++) {
                            str += `<p>
                                        <a href="${res.picInfo.engine[i]}">${res.picInfo.engine[i]}</a>
                                    </p>`
                        }
                        str += `</div></div>`;
                        document.querySelector('.c-show-box').innerHTML = str;

                        // 当点击基本信息里的保存按钮后
                        carInfoStore('shortInfo', 'shortInfoSubmit');

                        // 当点击基本参数里的保存按钮后
                        carInfoStore('baseInfo', 'baseInfoSubmit');

                        // 当点击发动机参数保存后
                        carInfoStore('engineInfo', 'engineInfoSubmit');

                        // 点击保存底盘及制动参数
                        carInfoStore('stopInfo', 'stopInfoSubmit');

                        // 点击安全配置保存
                        carInfoStore('safeInfo', 'safeInfoSubmit');

                        // 点击外部配置保存
                        carInfoStore('outsideInfo', 'outsideInfoSubmit');

                        // 点击内部配置保存
                        carInfoStore('insideInfo', 'insideInfoSubmit');

                        // 评论删除按钮点击时
                        var commentsDelDOM = document.querySelectorAll('.comments-delete');
                        var feedbackErrDelDOM = document.querySelectorAll('.feedbackErr-delete');
                        commentDel(commentsDelDOM);
                        feedbackErrDel(feedbackErrDelDOM);
                    }

                },
                fail(){
                    alert('请求失败！')
                }
            })
        }else{
            alert('条件不能为空！')
        }

    });




    // questionPage中的关闭按钮点击时
    $('#q-reply-close').on('click', ()=>{
        $('.q-reply-container').hide();
        $('.mask').hide();
    });

    $('#showQrcode').on('click', ()=>{
        $('#qrcode').toggle();
    });

    $('#close').on('click', ()=>{
        $('.s-userBox').hide();
        $('.mask').hide();
        $('#qrcode').hide();
        $('#qrcode')[0].innerHTML = '';
    });

    $('#s-btn').on('click', ()=>{
        var place = $('#lookCarPlace').val();
        var id = document.querySelector('#lookCarPlace').getAttribute('data-id');
        $.ajax({
            url: "http://localhost:3000/addlookcarplace",
            data: {
                place, id
            },
            dataType: "json",
            success(res){
                alert(res.msg);
                $('.mask').hide();
                $('.s-userBox').hide();
                $('#qrcode').hide();
                $('#qrcode')[0].innerHTML = '';
                getSaleCarInfo();
            },
            fail(){
                alert("操作失败")
            }
        })
    })
});


