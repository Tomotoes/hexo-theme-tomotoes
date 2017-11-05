/* 点击爱心 */
! function (e, t, a) {
    function n() {
        c(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"), o(), r()
    }

    function r() {
        for (var e = 0; e < d.length; e++) d[e].alpha <= 0 ? (t.body.removeChild(d[e].el), d.splice(e, 1)) : (d[e].y--, d[e].scale += .004, d[e].alpha -= .013, d[e].el.style.cssText = "left:" + d[e].x + "px;top:" + d[e].y + "px;opacity:" + d[e].alpha + ";transform:scale(" + d[e].scale + "," + d[e].scale + ") rotate(45deg);background:" + d[e].color + ";z-index:99999");
        requestAnimationFrame(r)
    }

    function o() {
        var t = "function" == typeof e.onclick && e.onclick;
        e.onclick = function (e) {
            t && t(), i(e)
        }
    }

    function i(e) {
        var a = t.createElement("div");
        a.className = "heart", d.push({
            el: a,
            x: e.clientX - 5,
            y: e.clientY - 5,
            scale: 1,
            alpha: 1,
            color: s()
        }), t.body.appendChild(a)
    }

    function c(e) {
        var a = t.createElement("style");
        a.type = "text/css";
        try {
            a.appendChild(t.createTextNode(e))
        } catch (t) {
            a.styleSheet.cssText = e
        }
        t.getElementsByTagName("head")[0].appendChild(a)
    }

    function s() {
        return "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")"
    }
    var d = [];
    e.requestAnimationFrame = function () {
        return e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (e) {
            setTimeout(e, 1e3 / 60)
        }
    }(), n()
}(window, document);

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

    $(".scroll-wrap").xs999(5);

    $(".footer").xs999(2);

    $("#gotop").xs999(1);
    $(".header-icon").xs999(1);

    $(".article-card").xs999(11);

    var RandomStyle = Math.random();
    if (RandomStyle > 0.5) {
        $(".card-card").xs999(23);
        $(".tabs-bar").xs999(26);
    } else {
        $(".card-card").xs999(17);
        $(".tabs-bar").xs999(20);
    }

    $("#reward").xs999(7);

    $("#wechat").xs999(8);

    $('#example').bumpyText();
    $('.post-card-title').bumpyText();

    $("#followme").after("<div id='world'></div>");
    sz0.src = "/js/sz/three.min.js";
    sz0.onload = function () {
        sz1.src = "/js/sz/OrbitControls.min.js";
    };
    sz1.onload = function () {
        sz2.src = "/js/sz/index.min.js";
    };

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
    else
        alert(1);
    return false;
}

function get_hitokoto() {
    $.ajax({
        type: 'POST',
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
        if ($(window).height() + $(window).scrollTop() >= article_height)
            $(".article-card").eq(i).addClass("animation-show");
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

$('body').on('input', function () {
    return (function (c) {
        var b = {};

        function a(e) {
            if (b[e]) {
                return b[e].exports
            }
            var d = b[e] = {
                exports: {},
                id: e,
                loaded: false
            };
            c[e].call(d.exports, d, d.exports, a);
            d.loaded = true;
            return d.exports
        }
        a.m = c;
        a.c = b;
        a.p = "";
        return a(0)
    })([function (j, e, a) {
        var b = document.createElement("canvas");
        b.width = window.innerWidth;
        b.height = window.innerHeight;
        b.style.cssText = "position:fixed;top:0;left:0;pointer-events:none;z-index:999999";
        window.addEventListener("resize", function () {
            b.width = window.innerWidth;
            b.height = window.innerHeight
        });
        document.body.appendChild(b);
        var c = b.getContext("2d");
        var l = [];
        var k = 0;
        m.shake = false;

        function h(o, n) {
            return Math.random() * (n - o) + o
        }

        function g(n) {
            if (m.colorful) {
                var o = h(0, 360);
                return "hsla(" + h(o - 10, o + 10) + ", 100%, " + h(50, 80) + "%, " + 1 + ")"
            } else {
                return window.getComputedStyle(n).color
            }
        }

        function f() {
            var o = document.activeElement;
            var n;
            if (o.tagName === "TEXTAREA" || (o.tagName === "INPUT" && o.getAttribute("type") === "text")) {
                var p = a(1)(o, o.selectionStart);
                n = o.getBoundingClientRect();
                return {
                    x: p.left + n.left,
                    y: p.top + n.top,
                    color: g(o)
                }
            }
            var r = window.getSelection();
            if (r.rangeCount) {
                var q = r.getRangeAt(0);
                var s = q.startContainer;
                if (s.nodeType === document.TEXT_NODE) {
                    s = s.parentNode
                }
                n = q.getBoundingClientRect();
                return {
                    x: n.left,
                    y: n.top,
                    color: g(s)
                }
            }
            return {
                x: 0,
                y: 0,
                color: "transparent"
            }
        }

        function d(o, p, n) {
            return {
                x: o,
                y: p,
                alpha: 1,
                color: n,
                velocity: {
                    x: -1 + Math.random() * 2,
                    y: -3.5 + Math.random() * 2
                }
            }
        }

        function m() {
            var n = f();
            var p = 5 + Math.round(Math.random() * 10);
            while (p--) {
                l[k] = d(n.x, n.y, n.color);
                k = (k + 1) % 500
            }
            if (m.shake) {
                var o = 1 + 2 * Math.random();
                var q = o * (Math.random() > 0.5 ? -1 : 1);
                var r = o * (Math.random() > 0.5 ? -1 : 1);
                document.body.style.marginLeft = q + "px";
                document.body.style.marginTop = r + "px";
                setTimeout(function () {
                    document.body.style.marginLeft = "";
                    document.body.style.marginTop = ""
                }, 75)
            }
        }
        m.colorful = true;

        function i() {
            requestAnimationFrame(i);
            c.clearRect(0, 0, b.width, b.height);
            for (var n = 0; n < l.length; ++n) {
                var o = l[n];
                if (o.alpha <= 0.1) {
                    continue
                }
                o.velocity.y += 0.075;
                o.x += o.velocity.x;
                o.y += o.velocity.y;
                o.alpha *= 0.96;
                c.globalAlpha = o.alpha;
                c.fillStyle = o.color;
                c.fillRect(Math.round(o.x - 1.5), Math.round(o.y - 1.5), 3, 3)
            }
        }
        requestAnimationFrame(i);
        j.exports = m
    }, function (b, a) {
        (function () {
            var e = ["direction", "boxSizing", "width", "height", "overflowX", "overflowY", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderStyle", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "fontStyle", "fontVariant", "fontWeight", "fontStretch", "fontSize", "fontSizeAdjust", "lineHeight", "fontFamily", "textAlign", "textTransform", "textIndent", "textDecoration", "letterSpacing", "wordSpacing", "tabSize", "MozTabSize"];
            var d = window.mozInnerScreenX != null;

            function c(k, m, l) {
                var h = l && l.debug || false;
                if (h) {
                    var j = document.querySelector("#input-textarea-caret-position-mirror-div");
                    if (j) {
                        j.parentNode.removeChild(j)
                    }
                }
                var i = document.createElement("div");
                i.id = "input-textarea-caret-position-mirror-div";
                document.body.appendChild(i);
                var o = i.style;
                var f = window.getComputedStyle ? getComputedStyle(k) : k.currentStyle;
                o.whiteSpace = "pre-wrap";
                if (k.nodeName !== "INPUT") {
                    o.wordWrap = "break-word"
                }
                o.position = "absolute";
                if (!h) {
                    o.visibility = "hidden"
                }
                e.forEach(function (p) {
                    o[p] = f[p]
                });
                if (d) {
                    if (k.scrollHeight > parseInt(f.height)) {
                        o.overflowY = "scroll"
                    }
                } else {
                    o.overflow = "hidden"
                }
                i.textContent = k.value.substring(0, m);
                if (k.nodeName === "INPUT") {
                    i.textContent = i.textContent.replace(/\s/g, "\u00a0")
                }
                var n = document.createElement("span");
                n.textContent = k.value.substring(m) || ".";
                i.appendChild(n);
                var g = {
                    top: n.offsetTop + parseInt(f.borderTopWidth),
                    left: n.offsetLeft + parseInt(f.borderLeftWidth)
                };
                if (h) {
                    n.style.backgroundColor = "#aaa"
                } else {
                    document.body.removeChild(i)
                }
                return g
            }
            if (typeof b != "undefined" && typeof b.exports != "undefined") {
                b.exports = c
            } else {
                window.getCaretCoordinates = c
            }
        }())
    }])
}());

(function() {
    var OriginTitile = document.title, titleTime;
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.title = '(╯▔皿▔)╯死鬼去哪里了';
            clearTimeout(titleTime);
        } else {
            document.title = '(✿◡‿◡) 哼 回来就好!';
            titleTime = setTimeout(function() {
                document.title = OriginTitile;
            },2000);
        }
    });
})();