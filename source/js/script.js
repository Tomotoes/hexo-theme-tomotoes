/* 文字跳动 */
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    
    easeOutCubic: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    }
});

(function ($) {
    $.fn.bumpyText = function (options) {
        var defaults = {
            bounceHeight: '1.3em',
            bounceUpDuration: 500,
            bounceDownDuration: 700,
        };
        var options = $.extend(defaults, options);
        return this.each(function () {
            var obj = $(this);
            if (obj.text() !== obj.html()) {
                return
            };
            var text = obj.text();
            var newMarkup = '';
            for (var i = 0; i <= text.length; i++) {
                var character = text.slice(i, i + 1);
                newMarkup += ($.trim(character)) ? '<span class="bumpy-char">' + character + '</span>' : character
            }
            obj.html(newMarkup);
            obj.find('span.bumpy-char').each(function () {
                $(this).mouseover(function () {
                    $(this).animate({
                        bottom: options.bounceHeight
                    }, {
                        queue: false,
                        duration: options.bounceUpDuration,
                        easing: 'easeOutCubic',
                        complete: function () {
                            $(this).animate({
                                bottom: 0
                            }, {
                                queue: false,
                                duration: options.bounceDownDuration,
                                easing: 'easeOutBounce'
                            })
                        }
                    })
                })
            })
        })
    }
})(jQuery);

/* 文字音效 */
function elasticText() {
    var args = arguments;
    var EventUtil = {
        e: "",
        gEve: function (event) {
            this.e = event ? event : window.event;
            return this;
        },
        getEvent: function (event) {
            return event ? event : window.event;
        },
        ce: function (e, callback) {
            if (e) {
                return callback(e);
            } else {
                return callback(this.e);
            }
        },
        addHandler: function (ele, type, handler) {
            if (ele.addEventListener) {
                ele.addEventListener(type, handler, false);
            } else if (ele.attachEvent) {
                ele.attachEvent('on' + type, handler);
            } else {
                ele["on" + type] = handler;
            }
        },
        removeHandler: function (ele, type, handler) {
            if (ele.removeEventListener) {
                ele.removeEventListener(type, handler, false);
            } else if (ele.detachEvent) {
                ele.detachEvent('on' + type, handler);
            } else {
                ele["on" + type] = null;
            }
        }
    }

    function mouserEvent(event) {
        var e = EventUtil.getEvent(event);
        var left = this.offsetLeft;
        var top = this.offsetTop;
        var x = e.clientX ? e.clientX : e.pageX;
        var y = e.clientY ? e.clientY : e.pageY;
        return {
            x: x - left,
            y: y - top
        }
    }

    function triangleCalc(w, h, m, n, arr, fs, ac) {
        var z = 0;
        var posarr = [];
        if (ac instanceof Array && ac.length > 0) {
            posarr = ac.concat([]);
        }
        if (n.y < m.y) {
            z = 1;
        } else {
            z = -1;
        }
        arr.map(function (item, index, arr) {
            var l = arr.length - 1;
            var hw = l * fs;
            var lw = index * fs + fs / 2;
            var rw = (l - index) * fs + fs / 2;
            if (lw < n.x && n.x > fs / 2) {
                ip = z * (lw / n.x * (n.y - m.y) * z).toFixed(2);
            }
            if (lw > n.x && n.x < hw + fs / 2) {
                ip = z * (rw / (fs * l - n.x + fs / 2) * (n.y - m.y) * z).toFixed(2);
            }
            if (ip != 0 && ip) {
                posarr[index] = ip;
            }
            item.style = "display:inline-block;transform:translateY(" + ip + "px)";
        })
        return posarr;
    }
    var ef = {
        easeOut: function (t, b, c, d, a, p) {
            var s;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == "undefined") p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return -a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + b;
        },
        jump: function (t, b, c, d) {
            c = Math.abs(c);
            if (t & 1) {
                var z = 1;
            } else {
                var z = -1;
            }
            return z * (c - t * (1 / d) * c);
        }
    }

    function back(ac, arr, _this, fs, effact, du) {
        if (ac.length === 0) {
            return
        }
        cancelAnimationFrame(_this.Ani);
        var t = 0;

        function def() {
            if (t == du) {
                cancelAnimationFrame(_this.Ani);
                rolBack(arr);
                return false;
            }
            arr.forEach(function (item, index, arr) {
                var np = ef[effact](t, 0, ac[index], du);
                item.style = "display:inline-block;transform:translateY(" + np + "px)";
            })
            t++;
            _this.Ani = requestAnimationFrame(def);
        }
        def();
    }

    function rolBack(arr) {
        arr.forEach(function (item) {
            item.style = "";
        })
    }

    function mFn(obj) {
        var _this = this;
        var id = obj.id,
            fs = obj.fontSize || 14,
            colr = obj.color || '#000',
            ct = obj.content,
            du = obj.duration || 50,
            effact = obj.effact;
        var tf = document.getElementById(id);
        if (typeof fs !== 'string') {
            fs = fs.toString();
        }
        fs = fs.match(/^\d{2}/)[0];
        var textBox = document.createElement('div');
        textBox.setAttribute('class', 'eBox');

        var frg = document.createDocumentFragment();
        var arr = ct.split('');
        var textarr = [];
        arr.forEach(function (item, val) {
            var dom = document.createElement('span');
            dom.innerText = item;
            textarr.push(dom);
            frg.appendChild(dom);
        })
        textBox.appendChild(frg);
        tf.innerHTML = '';
        textBox.style = "width:" + fs * arr.length + "px;font-size:" + fs + "px;cursor:url('../img/pointer.cur'),auto !important;color:" + colr + ";position:relative";
        tf.appendChild(textBox);

        var m, n, ac, w, h;
        Array.prototype.forEach.call(textBox.children, function (item) {
            item.onselectstart = function () {
                return false;
            }
        })
        EventUtil.addHandler(textBox, 'mouseenter', enter);
        EventUtil.addHandler(textBox, 'mouseleave', leave);
        EventUtil.addHandler(textBox, 'mousemove', move);
        var mark = false,
            gb = false;

        function enter(event) {
            cancelAnimationFrame(_this.Ani);
            w = this.offsetWidth;
            h = this.offsetHeight;
            m = mouserEvent.call(this, event);
            mark = true;
        }

        function move(event) {
            n = mouserEvent.call(textBox, event);
            if (!mark) {
                return;
            }
            if (Math.abs(m.y - n.y) > h) {
                EventUtil.removeHandler(textBox, 'mousemove', move);
                back(ac, textarr, _this, fs, effact, du);
                gb = true;
                return false;
            }
            ac = triangleCalc(w, h, m, n, textarr, fs, ac);
        }

        function leave() {
            EventUtil.removeHandler(textBox, 'mouseleave', leave);
            EventUtil.removeHandler(textBox, 'mouseenter', enter);
            setTimeout(function () {
                EventUtil.addHandler(textBox, 'mouseenter', enter);
                EventUtil.addHandler(textBox, 'mouseleave', leave);
                EventUtil.addHandler(textBox, 'mousemove', move);
            }, 100);
            if (Math.abs(m.y - n.y) < .5 * h && m.y != n.y) {
                rolBack(textarr);
                return false;
            }
            if (!gb) {
                back(ac, textarr, _this, fs, effact, du);
                EventUtil.removeHandler(textBox, 'mousemove', move);
                return false;
            }
            gb = false;
            mark = false;
        }
    }
    Array.prototype.forEach.call(args, function (item) {
        new mFn(item);
    })
}

/* hover特效 */
(function () {
    function b(t, u, s) {
        this.t = t;
        this.u = u;
        this.c = s.color;
        this.m1();
    };
    b.prototype = {
        m1: function () {
            var t = this;
            t.d = false;
            if (t.t.css('position') != 'fixed' && t.t.css('position') != 'absolute') {
                t.t.css('position', 'relative');
            }
            t.w = t.t.width();
            t.h = t.t.height();
            t.t.children().each(function () {
                if ($(this).css('position') != 'fixed' && $(this).css('position') != 'absolute') {
                    $(this).css({
                        'position': 'relative',
                        'z-index': '2'
                    });
                } else if (parseInt($(this).css('z-index')) < 2) {
                    $(this).css({
                        'z-index': '2'
                    });
                }
            });
            if (t.t.css('background-color') != "rgba(0, 0, 0, 0)") {
                t.bc = t.t.css('background-color');
            } else {
                t.bc = '#ffffff';
            }
            t.t.append('<canvas width="' + t.w + '" height="' + t.h + '" style="position:absolute; top:0; left:0; z-index:1;"></canvas>');
            t.ctx = t.t.children('canvas')[0].getContext('2d');
            if (t.c === false) {
                t.t.mouseenter(function () {
                    t.c = 'hsl(' + (Math.random() * 360) + ',60%,80%)';
                    t.ctx.fillStyle = t.c;
                });
            } else {
                t.ctx.fillStyle = t.c;
            };
            t.t.mousemove(function (e) {
                t.x = e.pageX - t.t.offset().left - parseInt(t.t.css('border-left-width'));
                t.y = e.pageY - t.t.offset().top - parseInt(t.t.css('border-top-width'));
            });
            t.a = [];
            t.t.mouseenter(function (e) {
                t.f = true;
                t.x = e.pageX - t.t.offset().left - parseInt(t.t.css('border-left-width'));
                t.y = e.pageY - t.t.offset().top - parseInt(t.t.css('border-top-width'));
                t.n1();
            });
            t.t.mouseleave(function () {
                t.f = false;
            });
            t.ctx.clearRect(0, 0, t.w, t.h);
        },
        n1: function () {
            var t = this;
            if (t.u <= 0) {
                console.warn('hover.js错误');
                return false;
            }
            if (t.u == 1) {
                if (t.a.length == 0) {
                    t.x1(t);
                }
            } else if (t.u == 2) {
                if (t.a.length == 0) {
                    for (var i = 0; i < t.w / 2; i++) {
                        t.a[i] = {
                            y: t.h
                        };
                    }
                }
                if (!t.d) {
                    t.d = true;
                    t.x2(t);
                }
            } else if (t.u == 3) {
                if (t.a.length == 0) {
                    t.x3(t);
                }
            } else if (t.u == 4) {
                if (t.a.length == 0) {
                    t.x4(t);
                }
            }
        },
        x1: function (t) {
            if (t.f) {
                t.a.push({
                    x: t.x,
                    y: t.y,
                    r: 2,
                    o: 1,
                    c: t.c
                });
            }
            t.ctx.clearRect(0, 0, t.w, t.h);
            for (var i = 0; i < t.a.length; i++) {
                t.ctx.beginPath();
                t.ctx.arc(t.a[i].x, t.a[i].y, t.a[i].r, 0, Math.PI * 2);
                t.ctx.closePath();
                t.ctx.globalAlpha = t.a[i].o;
                t.ctx.fillStyle = t.a[i].c;
                t.ctx.fill();
                t.a[i].o -= .02;
                t.a[i].r += 1;
                if (t.a[i].o <= 0) {
                    t.a.splice(i, 1);
                    i--;
                }
            }
            t.ctx.globalAlpha = 1;
            if (t.f || t.a.length > 0) {
                requestAnimationFrame(function () {
                    t.x1(t);
                });
            } else {
                t.ctx.clearRect(0, 0, t.w, t.h);
            }
        },
        x2: function (t) {
            t.ctx.clearRect(0, 0, t.w, t.h);
            t.q = false;
            t.ctx.fillStyle = t.c;
            for (var i = 0; i < t.a.length; i++) {
                if (t.h != t.y) {
                    t.a[i].h = t.h - t.y;
                    for (var j = 0; j < Math.ceil(Math.abs(t.x - (i * 2 + 1)) / 2) - 1; j++) {
                        t.a[i].h *= 5 / 6;
                    }
                    t.a[i].h = t.h - t.a[i].h;
                } else {
                    t.a[i].h = t.h;
                }
                if (t.f) {
                    if (t.a[i].h - t.a[i].y < 0) {
                        t.a[i].y += Math.floor((t.a[i].h - t.a[i].y) / 14);
                    } else {
                        t.a[i].y += Math.ceil((t.a[i].h - t.a[i].y) / 14);
                    };
                } else {
                    t.a[i].y += Math.ceil((t.h - t.a[i].y) / 14);
                };
                t.ctx.fillRect(i * 2, t.a[i].y, 2, t.h * 2);
                if (t.a[i].y < t.h) {
                    t.q = true;
                }
            }
            t.ctx.globalAlpha = 1;
            if (t.f || t.q) {
                requestAnimationFrame(function () {
                    t.x2(t);
                });
            } else {
                t.ctx.clearRect(0, 0, t.w, t.h);
                t.d = false;
            }
        },
        x3: function (t) {
            if (t.f) {
                t.tan = Math.random() * 2 + 1;
                t.a.push({
                    x: t.w * Math.random(),
                    y: -t.tan,
                    r: t.tan,
                    c: t.c
                });
            }
            t.ctx.globalAlpha = 0.3;
            t.ctx.fillStyle = t.bc;
            t.ctx.fillRect(0, 0, t.w, t.h);
            for (var i = 0; i < t.a.length; i++) {
                t.ctx.beginPath();
                t.ctx.arc(t.a[i].x, t.a[i].y, t.a[i].r, 0, Math.PI * 2);
                t.ctx.closePath();
                t.ctx.fillStyle = t.a[i].c;
                t.ctx.fill();
                t.a[i].x += (t.x - t.w / 2) / (t.w / 2) * (t.a[i].r - 0.7);
                if (t.a[i].x < -t.a[i].r) {
                    t.a[i].x = t.w + t.a[i].r;
                } else if (t.a[i].x > t.w + t.a[i].r) {
                    t.a[i].x = -t.a[i].r;
                }
                t.a[i].y += t.a[i].r - 0.7;
                if (t.a[i].y >= t.h + t.a[i].r) {
                    t.a.splice(i, 1);
                    i--;
                }
            }
            t.ctx.globalAlpha = 1;
            if (t.f || t.a.length > 0) {
                requestAnimationFrame(function () {
                    t.x3(t);
                });
            } else {
                t.ctx.clearRect(0, 0, t.w, t.h);
            }
        },
        x4: function (t) {
            if (t.f) {
                t.tan = Math.random() * 2 + 1;
                t.a.push({
                    x: t.w * Math.random(),
                    y: t.tan + t.h,
                    r: t.tan,
                    c: t.c
                });
            }
            t.ctx.globalAlpha = 0.3;
            t.ctx.fillStyle = t.bc;
            t.ctx.fillRect(0, 0, t.w, t.h);
            for (var i = 0; i < t.a.length; i++) {
                t.ctx.beginPath();
                t.ctx.arc(t.a[i].x, t.a[i].y, t.a[i].r, 0, Math.PI * 2);
                t.ctx.closePath();
                t.ctx.fillStyle = t.a[i].c;
                t.ctx.fill();
                t.a[i].x += (Math.random() - 0.5) * 2;
                t.a[i].y -= 1;
                if (t.a[i].y <= -t.a[i].r) {
                    t.a.splice(i, 1);
                    i--;
                }
            }
            t.ctx.globalAlpha = 1;
            if (t.f || t.a.length > 0) {
                requestAnimationFrame(function () {
                    t.x4(t);
                });
            } else {
                t.ctx.clearRect(0, 0, t.w, t.h);
            }
        }
    };
    var y = {
        color: false,
    };
    $.fn.hover = function (u, g) {
        y = {
            color: false,
        }
        $.extend(y, g);
        $(this).each(function () {
            new b($(this), u, y);
        });
    }
})(jQuery);
(function () {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var xx = 0; xx < vendors.length && !window.requestAnimationFrame; ++xx) {
        window.requestAnimationFrame = window[vendors[xx] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[xx] + 'CancelAnimationFrame'] ||
            window[vendors[xx] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }

}());

/* 网站运行时间 */
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
        RunTime.innerHTML = "网站已运行：" + day + "天 " + myHours + "小时 " + myMinutes + "分 " + mySeconds + "秒 ";
    return false;
}

/* 一言的调用 */
function get_hitokoto() {
    $.ajax({
        type: 'GET',
        url: 'https://sslapi.hitokoto.cn/',
        dataType: 'json',
        timeout: 4000,
        success: function (data) {
            if (data.hitokoto.length> 12) {
                get_hitokoto();
            } else {
                /* 签名 */
                elasticText({
                    id: 'yiyanmotto',
                    duration: 100,
                    effact: 'easeOut',
                    content: data.hitokoto
                });
            }
        },
        error: function () {
            elasticText({
                id: 'yiyanmotto',
                duration: 100,
                effact: 'easeOut',
                content: '生活不止眼前的苟且'
            });
        }
    });
}

/* 粘贴提示 */
var G = function (a, b, c) {
    function d(a, b) {
        return [
            '',
            '',
            '作者：' + b,
            '链接：' + a,
            '著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。',
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
            if(m.length>42){
                a.originalEvent.clipboardData.setData('text/html', f(b, c));
                a.originalEvent.clipboardData.setData('text/plain', m + d(b, c).join('\n'));
                a.preventDefault();
            }
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

/* 文章块的淡出 */
function postshow() {
    $(".article-card").each(function (i) {
        var article_height = $(".article-card").eq(i).offset().top;
        if($(window).height()+$(window).scrollTop()>=article_height){
            $(".article-card").eq(i).addClass('animation-show');
        }
        $(window).scroll(function () {
            var window_height = $(window).height();
            var scrolltop = $(window).scrollTop();
            if (scrolltop + window_height >= article_height && scrolltop) {
                $(".article-card").eq(i).addClass("animation-show");
            }
        });
    });
}

/* 3D标题 */
var header = document.getElementById('myheader'),
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
    header.style.textShadow = shadow;
    header.style.webkitTransform = 'translateZ(0) rotateX(' + y * 1.5 + 'deg) rotateY(' + -x * 1.5 + 'deg)';
    header.style.MozTransform = 'translateZ(0) rotateX(' + y * 1.5 + 'deg) rotateY(' + -x * 1.5 + 'deg)';
}
