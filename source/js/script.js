if (window.innerWidth > 600) {
    var text = document.getElementById('text'),
        body = document.body,
        steps = 7;
    function threedee(e) {
        var x = Math.round(steps / (window.innerWidth / 2) * (window.innerWidth / 2 - e.clientX)),
            y = Math.round(steps / (window.innerHeight / 2) * (window.innerHeight / 2 - e.clientY)),
            shadow = '',
            color = 190,
            radius = 3,
            i;
        for (i = 0; i < steps; i++) {
            tx = Math.round(x / steps * i);
            ty = Math.round(y / steps * i);
            if (tx || ty) {
                color -= 3 * i;
                shadow += tx + 'px ' + ty + 'px 0 rgb(' + color + ', ' + color + ', ' + color + '), ';
            }
        }
        shadow += x + 'px ' + y + 'px 1px rgba(0,0,0,.2), ' + x * 2 + 'px ' + y * 2 + 'px 6px rgba(0,0,0,.3)';
        text.style.textShadow = shadow;
        text.style.webkitTransform = 'translateZ(0) rotateX(' + y * 1.5 + 'deg) rotateY(' + -x * 1.5 + 'deg)';
        text.style.MozTransform = 'translateZ(0) rotateX(' + y * 1.5 + 'deg) rotateY(' + -x * 1.5 + 'deg)';
    }
    $('.content-header').on('mousemove', threedee);
    $(".footer").xs999(2);
    $("#gotop").xs999(1);
    $("#reward").xs999(7);
    $("#wechat").xs999(8);
    $('#example').bumpyText();
    $('.post-card-title').bumpyText();
    $('#hitokoto_p').bumpyText();
}
setInterval(function () {
    setTime('2017/10/11')
}, 1000);
function setTime(a) {
    var mydate = new Date();
    var now = Date.parse(mydate.toLocaleDateString());
    var start = Date.parse(a);
    var day = (now - start) / 1000 / 86400;
    var myHours = "";
    var myMinutes = "";
    var mySeconds = "";
    myHours = mydate.getHours();
    myMinutes = parseInt(mydate.getMinutes()) < 10 ? "0" + mydate.getMinutes() : mydate.getMinutes();
    mySeconds = parseInt(mydate.getSeconds()) < 10 ? "0" + mydate.getSeconds() : mydate.getSeconds();
    if (!isNaN(day))
        RunTime.innerHTML = "本网站已运行：" + day + "天 " + myHours + "小时 " + myMinutes + "分 " + mySeconds + "秒 ";
    return false;
}
function get_hitokoto() {
    $.ajax({
        type: 'GET',
        url: 'https://sslapi.hitokoto.cn/',
        dataType: 'json',
        timeout: 4000,
        success: function (data) {
            if (data.hitokoto.length + data.from.length > 20 && window.innerWidth < 600) {
                get_hitokoto();
            } else {
                $("#hitokoto_p").html(data.hitokoto + " --" + data.from);
                $('#hitokoto_p').bumpyText();
            }
        },
        error: function () {
            $("#hitokoto_p").html("我好像又抽风了~ (゜-゜)つロ ");
        }
    });
}
$("#refresh").click(function () {
    get_hitokoto();
})
get_hitokoto();
    
function xl() {
    $(".article-card").each(function (i) {
        var article_height = $(".article-card").eq(i).offset().top;
        $(window).scroll(function () {
            var window_height = $(window).height();
            var scrolltop = $(window).scrollTop();
            if (scrolltop + window_height >= article_height && scrolltop) {
                $(".article-card").eq(i).addClass("animation-show");
            }
        });
    });
}
xl();
elasticText({
    id: 'otext2',
    duration: 100,
    effact: 'easeOut',
    content: '你算哪块小饼干！'
});
var G = function (a, b, c) {
    function d(a, b) {
        return ['著作权归作者所有。',
            '商业转载请联系作者获得授权，非商业转载请注明出处。',
            '作者：' + b,
            '链接：' + a,
            '',
            ''
        ]
    }
    function f(b, c, m) {
        return '<div>' + d(b, c).join('<br />') + m + '</div>'
    }
    function g(a) {
        if (!window.getSelection) {
            return;
        }
        var m = window.getSelection().toString();
        if ('object' === typeof a.originalEvent.clipboardData) {
            var m = window.getSelection().toString();
            a.originalEvent.clipboardData.setData('text/html', f(b, c));
            a.originalEvent.clipboardData.setData('text/plain', d(b, c).join('\n') + m);
            a.preventDefault();
            return;
        }
        var n = $(f(b, c, m)).css({
            position: 'fixed',
            left: '-9999px'
        }).appendTo('body');
        window.getSelection().selectAllChildren(n[0]);
    }
    a.on('copy', g);
}
var a = $('.post-content');
G(a, location.href, "Simon Ma");