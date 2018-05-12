/**
 * 发送消息
 */
$('#send').on('click', send);
function send() {
    var txt, msg;
    txt = $("#msg");
    msg = txt.val();
    var csrftoken = $('[name="csrfmiddlewaretoken"]').val();
    // console.log("message is", msg);
    if (!msg) {
        alert("Message can not be empty");
        return;
    }
    up_say();
    txt.focus();
    $.ajax(
        {
        type: "POST",
        url: '/get_msg',
        data: {
            msg: msg,csrf: csrftoken
        },
        dataType: 'json',
        cache: true,
        success: function () {

            },
        error: function () {
            log('请求失败，请刷新页面后重试');
        }
    });
    return false;
}
$(function () {
    function updatemsg() {
        var msg = $('#msg').val();
        if (msg == 'quit'){
            window.clearInterval(time1);
        }
        $.getJSON(
            '/get_msg',function(data){
                console.log(data.have)
                if (data.have != 0){
                    var ans = '<div class="answer"><div class="heard_img left"><img src="static/images/0001.jpg"></div>';
                    ans += '<div class="answer_text"><p>' + data.uid + '说:' + data['rmsg'] + '</p><i></i>';
                    ans += '</div></div>';
                    $('.speak_box').append(ans);
                    for_bottom();
                }else {

                }
            }
    );}
    time1 = setInterval(function () {
        updatemsg();
    }, 1000)
}());

/**
 * 退出
 */
window.onbeforeunload = function () {
    try {
        socket.send('quit');
    } catch (ex) {
        log(ex);
    }
};


function log(msg) {
    $("#log").html("<br>" + msg);
}
function tip(msg) {
    $("#tip").html("<br>" + msg);
}
$('#msg').on('keydown', onkey);
function onkey(event) {
    if (event.keyCode == 13) {
        send();
    }
}

/**
 * 聊天框弹出消息
 */
function up_say() {
    $('.write_list').remove();
    var text = $('.write_box input').val(),
    str = '<div class="question">';
    str += '<div class="heard_img right"><img src="static/images/0001.jpg"></div>';
    str += '<div class="question_text clear"><p>' + text + '</p><i></i>';
    str += '</div></div>';
    if (text == '') {
        alert('请输入提问！');
        $('.write_box input').focus();
    } else {
        $('.speak_box').append(str);
        $('.write_box input').val('');
        $('.write_box input').focus();
        autoWidth();
        for_bottom();
    }
}

/**
 * 滑动滚轮使屏幕随着消息滚动
 */
function for_bottom() {
    var speak_height = $('.speak_box').height();
    $('.speak_box,.speak_window').animate({scrollTop: speak_height+50}, 550);
}

/**
 * 动态渲染自己发送的消息
 */
function autoWidth() {
    $('.question_text').css('max-width', $('.question').width() - 60);
}
autoWidth();

