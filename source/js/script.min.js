/* 文字跳动 */
jQuery.easing["jswing"] = jQuery.easing["swing"];
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",

    easeOutCubic: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t /= d) < 1 / 2.75) {
            return c * (7.5625 * t * t) + b;
        } else if (t < 2 / 2.75) {
            return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
        } else if (t < 2.5 / 2.75) {
            return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
        }
        return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;

    }
});

(function ($) {
    $.fn.bumpyText = function (options) {
        const defaults = {
            bounceHeight: "1.3em",
            bounceUpDuration: 500,
            bounceDownDuration: 700
        };
        options = $.extend(defaults, options);
        return this.each(function () {
            const obj = $(this);
            if (obj.text() !== obj.html()) {
                return;
            }
            const text = obj.text();
            let newMarkup = "";
            for (let i = 0; i <= text.length; i++) {
                const character = text.slice(i, i + 1);
                newMarkup += $.trim(character) ? `<span class="bumpy-char">${ character }</span>` : character;
            }
            obj.html(newMarkup);
            obj.find("span.bumpy-char").each(function () {
                $(this).mouseover(function () {
                    $(this).animate({
                        bottom: options.bounceHeight
                    }, {
                        queue: false,
                        duration: options.bounceUpDuration,
                        easing: "easeOutCubic",
                        complete: function () {
                            $(this).animate({
                                bottom: 0
                            }, {
                                queue: false,
                                duration: options.bounceDownDuration,
                                easing: "easeOutBounce"
                            });
                        }
                    });
                });
            });
        });
    };
}(jQuery));

/* 文字音效 */
function elasticText() {
    const args = arguments;
    const EventUtil = {
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
            }
            return callback(this.e);

        },
        addHandler: function (ele, type, handler) {
            if (ele.addEventListener) {
                ele.addEventListener(type, handler, false);
            } else if (ele.attachEvent) {
                ele.attachEvent(`on${ type}`, handler);
            } else {
                ele[`on${ type}`] = handler;
            }
        },
        removeHandler: function (ele, type, handler) {
            if (ele.removeEventListener) {
                ele.removeEventListener(type, handler, false);
            } else if (ele.detachEvent) {
                ele.detachEvent(`on${ type}`, handler);
            } else {
                ele[`on${ type}`] = null;
            }
        }
    };

    function mouserEvent(event) {
        const e = EventUtil.getEvent(event);
        const left = this.offsetLeft;
        const top = this.offsetTop;
        const x = e.clientX ? e.clientX : e.pageX;
        const y = e.clientY ? e.clientY : e.pageY;
        return {
            x: x - left,
            y: y - top
        };
    }

    function triangleCalc(w, h, m, n, arr, fs, ac) {
        let z = 0;
        let posarr = [];
        if (ac instanceof Array && ac.length > 0) {
            posarr = ac.concat([]);
        }
        if (n.y < m.y) {
            z = 1;
        } else {
            z = -1;
        }
        arr.map(function (item, index, array) {
            const l = array.length - 1;
            const hw = l * fs;
            const lw = index * fs + fs / 2;
            const rw = (l - index) * fs + fs / 2;
            let ip;
            if (lw < n.x && n.x > fs / 2) {
                ip = z * (lw / n.x * (n.y - m.y) * z).toFixed(2);
            }
            if (lw > n.x && n.x < hw + fs / 2) {
                ip = z * (rw / (fs * l - n.x + fs / 2) * (n.y - m.y) * z).toFixed(2);
            }
            if (ip !== 0 && ip) {
                posarr[index] = ip;
            }
            item.style = `display:inline-block;transform:translateY(${ ip }px)`;
        });
        return posarr;
    }
    const ef = {
        easeOut: function (t, b, c, d, a, p) {
            let s;
            if (t === 0) {
                return b;
            }
            if ((t /= d) === 1) {
                return b + c;
            }
            if (typeof p === "undefined") {
                p = d * 0.3;
            }
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
            let z;
            if (t & 1) {
                z = 1;
            } else {
                z = -1;
            }
            return z * (c - t * (1 / d) * c);
        }
    };

    function rolBack(arr) {
        arr.forEach(function (item) {
            item.style = "";
        });
    }

    function back(ac, arr, mythis, fs, effact, du) {
        if (ac.length === 0) {
            return;
        }
        cancelAnimationFrame(mythis.Ani);
        let t = 0;

        function def() {
            if (t === du) {
                cancelAnimationFrame(mythis.Ani);
                rolBack(arr);
                return false;
            }
            arr.forEach(function (item, index) {
                const np = ef[effact](t, 0, ac[index], du);
                item.style = `display:inline-block;transform:translateY(${ np }px)`;
            });
            t++;
            mythis.Ani = requestAnimationFrame(def);
        }
        def();
    }

    function mFn(obj) {
        const mythis = this,
            id = obj.id,
            colr = obj.color || "#000",
            ct = obj.content,
            du = obj.duration || 50,
            effact = obj.effact;
        let fs = obj.fontSize || 14;
        const tf = document.getElementById(id);
        if (typeof fs !== "string") {
            fs = fs.toString();
        }
        fs = fs.match(/^\d{2}/)[0];
        const textBox = document.createElement("div");
        textBox.setAttribute("class", "eBox");

        const frg = document.createDocumentFragment();
        const arr = ct.split("");
        const textarr = [];
        arr.forEach(function (item) {
            const dom = document.createElement("span");
            dom.innerText = item;
            textarr.push(dom);
            frg.appendChild(dom);
        });
        textBox.appendChild(frg);
        tf.innerHTML = "";
        textBox.style = `width:${ fs * arr.length }px;font-size:${ fs }px;color:${ colr };position:relative`;
        tf.appendChild(textBox);

        let m, n, ac, w, h;
        Array.prototype.forEach.call(textBox.children, function (item) {
            item.onselectstart = function () {
                return false;
            };
        });
        let mark = false,
            gb = false;

        function enter(event) {
            cancelAnimationFrame(mythis.Ani);
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
                EventUtil.removeHandler(textBox, "mousemove", move);
                back(ac, textarr, mythis, fs, effact, du);
                gb = true;
                return false;
            }
            ac = triangleCalc(w, h, m, n, textarr, fs, ac);
        }

        function leave() {
            EventUtil.removeHandler(textBox, "mouseleave", leave);
            EventUtil.removeHandler(textBox, "mouseenter", enter);
            setTimeout(function () {
                EventUtil.addHandler(textBox, "mouseenter", enter);
                EventUtil.addHandler(textBox, "mouseleave", leave);
                EventUtil.addHandler(textBox, "mousemove", move);
            }, 100);
            if (Math.abs(m.y - n.y) < 0.5 * h && m.y !== n.y) {
                rolBack(textarr);
                return false;
            }
            if (!gb) {
                back(ac, textarr, mythis, fs, effact, du);
                EventUtil.removeHandler(textBox, "mousemove", move);
                return false;
            }
            gb = false;
            mark = false;
        }
        EventUtil.addHandler(textBox, "mouseenter", enter);
        EventUtil.addHandler(textBox, "mouseleave", leave);
        EventUtil.addHandler(textBox, "mousemove", move);

    }
    Array.prototype.forEach.call(args, function (item) {
        new mFn(item);
    });
}

/* hover特效 */
(function () {
    function b(t, u, s) {
        this.t = t;
        this.u = u;
        this.c = s.color;
        this.m1();
    }
    b.prototype = {
        m1: function () {
            const t = this;
            t.d = false;
            if (t.t.css("position") !== "fixed" && t.t.css("position") !== "absolute") {
                t.t.css("position", "relative");
            }
            t.w = t.t.width();
            t.h = t.t.height();
            t.t.children().each(function () {
                if ($(this).css("position") !== "fixed" && $(this).css("position") !== "absolute") {
                    $(this).css({
                        "position": "relative",
                        "z-index": "2"
                    });
                } else if (parseInt($(this).css("z-index")) < 2) {
                    $(this).css({
                        "z-index": "2"
                    });
                }
            });
            if (t.t.css("background-color") !== "rgba(0, 0, 0, 0)") {
                t.bc = t.t.css("background-color");
            } else {
                t.bc = "#ffffff";
            }
            t.t.append(`<canvas width="${ t.w }" height="${ t.h }" style="position:absolute; top:0; left:0; z-index:1;"></canvas>`);
            t.ctx = t.t.children("canvas")[0].getContext("2d");
            if (t.c === false) {
                t.t.mouseenter(function () {
                    t.c = `hsl(${ Math.random() * 360 },60%,80%)`;
                    t.ctx.fillStyle = t.c;
                });
            } else {
                t.ctx.fillStyle = t.c;
            }
            t.t.mousemove(function (e) {
                t.x = e.pageX - t.t.offset().left - parseInt(t.t.css("border-left-width"));
                t.y = e.pageY - t.t.offset().top - parseInt(t.t.css("border-top-width"));
            });
            t.a = [];
            t.t.mouseenter(function (e) {
                t.f = true;
                t.x = e.pageX - t.t.offset().left - parseInt(t.t.css("border-left-width"));
                t.y = e.pageY - t.t.offset().top - parseInt(t.t.css("border-top-width"));
                t.n1();
            });
            t.t.mouseleave(function () {
                t.f = false;
            });
            t.ctx.clearRect(0, 0, t.w, t.h);
        },
        n1: function () {
            const t = this;
            if (t.u <= 0) {
                console.warn("hover.js错误");
                return false;
            }
            if (t.u === 1) {
                if (t.a.length === 0) {
                    t.x1(t);
                }
            } else if (t.u === 2) {
                if (t.a.length === 0) {
                    for (let i = 0; i < t.w / 2; i++) {
                        t.a[i] = {
                            y: t.h
                        };
                    }
                }
                if (!t.d) {
                    t.d = true;
                    t.x2(t);
                }
            } else if (t.u === 3) {
                if (t.a.length === 0) {
                    t.x3(t);
                }
            } else if (t.u === 4) {
                if (t.a.length === 0) {
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
            for (let i = 0; i < t.a.length; i++) {
                t.ctx.beginPath();
                t.ctx.arc(t.a[i].x, t.a[i].y, t.a[i].r, 0, Math.PI * 2);
                t.ctx.closePath();
                t.ctx.globalAlpha = t.a[i].o;
                t.ctx.fillStyle = t.a[i].c;
                t.ctx.fill();
                t.a[i].o -= 0.02;
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
            for (let i = 0; i < t.a.length; i++) {
                if (t.h !== t.y) {
                    t.a[i].h = t.h - t.y;
                    for (let j = 0; j < Math.ceil(Math.abs(t.x - (i * 2 + 1)) / 2) - 1; j++) {
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
                    }
                } else {
                    t.a[i].y += Math.ceil((t.h - t.a[i].y) / 14);
                }
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
            for (let i = 0; i < t.a.length; i++) {
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
            for (let i = 0; i < t.a.length; i++) {
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
    let y = {
        color: false
    };
    $.fn.hover = function (u, g) {
        y = {
            color: false
        };
        $.extend(y, g);
        $(this).each(function () {
            new b($(this), u, y);
        });
    };
}(jQuery));
(function () {
    let lastTime = 0;
    const vendors = ["webkit", "moz"];
    for (let xx = 0; xx < vendors.length && !window.requestAnimationFrame; ++xx) {
        window.requestAnimationFrame = window[`${vendors[xx] }RequestAnimationFrame`];
        window.cancelAnimationFrame = window[`${vendors[xx] }CancelAnimationFrame`] ||
            window[`${vendors[xx] }CancelRequestAnimationFrame`];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback) {
            const currTime = new Date().getTime();
            const timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            const id = window.setTimeout(function () {
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
    const
        mydate = new Date(),
        now = Date.parse(mydate.toLocaleDateString()),
        start = Date.parse(a),
        day = (now - start) / 1000 / 86400,
        myHours = mydate.getHours(),
        myMinutes = parseInt(mydate.getMinutes()) < 10 ? `0${ mydate.getMinutes()}` : mydate.getMinutes(),
        mySeconds = parseInt(mydate.getSeconds()) < 10 ? `0${ mydate.getSeconds()}` : mydate.getSeconds();
    if (!isNaN(day)) {
        RunTime.innerHTML = `网站已运行：${ day }天 ${ myHours }小时 ${ myMinutes }分 ${ mySeconds }秒 `;
    }
    return false;
}

/* 一言的调用 */
let countFail = 0;

function getHitokoto() {
    $.ajax({
        type: "GET",
        url: "https://sslapi.hitokoto.cn/",
        dataType: "json",
        timeout: 2500,
        success: function (data) {
            if (data.hitokoto.length > 12) {
                countFail++;
                if (countFail > 5) {
                    elasticText({
                        id: "yiyanmotto",
                        duration: 100,
                        effact: "easeOut",
                        content: "为了正义！"
                    });
                } else {
                    getHitokoto();
                }
            } else {
                /* 签名 */
                elasticText({
                    id: "yiyanmotto",
                    duration: 100,
                    effact: "easeOut",
                    content: data.hitokoto
                });
            }
        },
        error: function () {
            elasticText({
                id: "yiyanmotto",
                duration: 100,
                effact: "easeOut",
                content: "生活不止眼前的苟且"
            });
        }
    });
}

/* 粘贴提示 */
const G = function (a, b, c) {
    function d(aa, bb) {
        return [
            "",
            "",
            `作者：${ bb}`,
            `链接：${ aa}`,
            "著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。"
        ];
    }

    function f(bc, cc, m) {
        return `<div>${ d(bc, cc).join("<br />") }${m }</div>`;
    }

    function g(av) {
        if (!window.getSelection) {
            return;
        }
        const m = window.getSelection().toString();
        if (typeof av.originalEvent.clipboardData === "object") {
            if (m.length > 42) {
                av.originalEvent.clipboardData.setData("text/html", f(b, c));
                av.originalEvent.clipboardData.setData("text/plain", m + d(b, c).join("\n"));
                av.preventDefault();
            }
            return;
        }
        const n = $(f(b, c, m)).css({
            position: "fixed",
            left: "-9999px"
        }).appendTo("body");
        window.getSelection().selectAllChildren(n[0]);
    }
    a.on("copy", g);
};

/* 文章块的淡出 */
function postshow() {
    $(".article-card").each(function (i) {
        const articleHeight = $(".article-card").eq(i).offset().top;
        if ($(window).height() + $(window).scrollTop() >= articleHeight) {
            $(".article-card").eq(i).addClass("animation-show");
        }
        $(window).scroll(function () {
            const windowHeight = $(window).height();
            const scrolltop = $(window).scrollTop();
            if (scrolltop + windowHeight >= articleHeight && scrolltop) {
                $(".article-card").eq(i).addClass("animation-show");
            }
        });
    });
}

/* 3D标题 */
const header = document.getElementById("myheader"),
    steps = 7;

function threedee(e) {
    const x = Math.round(steps / (window.innerWidth / 2) * (window.innerWidth / 2 - e.clientX)),
        y = Math.round(steps / (window.innerHeight / 2) * (window.innerHeight / 2 - e.clientY));

    let shadow = "",
        color = 190,
        i, tx, ty;
    for (i = 0; i < steps; i++) {
        tx = Math.round(x / steps * i);
        ty = Math.round(y / steps * i);
        if (tx || ty) {
            color -= 3 * i;
            shadow += `${tx }px ${ ty }px 0 rgb(${ color }, ${ color }, ${ color }), `;
        }
    }
    shadow += `${x }px ${ y }px 1px rgba(0,0,0,.2), ${ x * 2 }px ${ y * 2 }px 6px rgba(0,0,0,.3)`;
    header.style.textShadow = shadow;
    header.style.webkitTransform = `translateZ(0) rotateX(${ y * 1.5 }deg) rotateY(${ -x * 1.5 }deg)`;
    header.style.MozTransform = `translateZ(0) rotateX(${ y * 1.5 }deg) rotateY(${ -x * 1.5 }deg)`;
}
