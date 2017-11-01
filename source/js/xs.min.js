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
                console.warn('鑾氬倯绲碉拷锟斤拷缇冣墽锟斤拷鑶冿拷' + t.u + '绛濓拷锟斤拷锟斤拷閻氾拷閻氾拷');
                return false;
            }
            if (t.u <= 10) {
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
                        for (var i = 0; i < t.h / 5; i++) {
                            if (i % 2) {
                                t.a[i] = {
                                    x: t.w,
                                    y: 5 * i,
                                    w: t.w,
                                    h: 5
                                };
                            } else {
                                t.a[i] = {
                                    x: -t.w,
                                    y: 5 * i,
                                    w: t.w,
                                    h: 5
                                };
                            }
                        }
                    }
                    if (!t.d) {
                        t.d = true;
                        t.x4(t);
                    }
                } else if (t.u == 5) {
                    if (t.a.length == 0) {
                        t.x5(t);
                    }
                } else if (t.u == 6) {
                    if (t.a.length == 0) {
                        t.x6(t);
                    }
                } else if (t.u == 7) {
                    if (t.a.length == 0) {
                        t.x7(t);
                    }
                } else if (t.u == 8) {
                    if (t.a.length == 0) {
                        t.x8(t);
                    }
                } else if (t.u == 9) {
                    if (t.a.length == 0) {
                        t.x9(t);
                    }
                } else if (t.u == 10) {
                    if (t.a.length == 0) {
                        t.x10(t);
                    }
                }
            } else if (t.u <= 20) {
                if (t.u == 11) {
                    if (t.a.length == 0) {
                        t.x11(t);
                    }
                } else if (t.u == 12) {
                    if (t.a.length == 0) {
                        t.x12(t);
                    }
                } else if (t.u == 13) {
                    t.o = 1;
                    if (t.a.length == 0) {
                        for (var i = 0; i < 4; i++) {
                            t.a[i] = {
                                x: t.w / 2,
                                y: t.h / 2,
                                c: t.c
                            };
                        }
                        t.m = 0;
                        t.z = Math.sqrt(Math.pow(t.w / 2, 2) + Math.pow(t.h / 2, 2));
                        t.a[0].x1 = t.w / 2 - t.z;
                        t.a[0].y1 = t.h / 2;
                        t.a[1].x1 = t.w / 2 + t.z;
                        t.a[1].y1 = t.h / 2;
                        t.a[2].x1 = t.w / 2;
                        t.a[2].y1 = t.h / 2 + t.z;
                        t.a[3].x1 = t.w / 2;
                        t.a[3].y1 = t.h / 2 - t.z;
                    }
                    if (!t.d) {
                        t.d = true;
                        t.x13(t);
                    }
                } else if (t.u == 14) {
                    if (t.a.length == 0) {
                        t.z = Math.ceil(t.h / 3);
                        t.zx = t.w / 20;
                        t.zy = t.z / 10;
                        t.a[0] = {
                            x: 0,
                            y: -t.z,
                            w: t.w,
                            h: t.z
                        };
                        t.a[1] = {
                            x: 0,
                            y: t.h,
                            w: t.w,
                            h: t.z
                        };
                        t.a[2] = {
                            x: -t.w,
                            y: t.z,
                            w: t.w,
                            h: t.z
                        };
                        t.a[3] = {
                            x: t.w,
                            y: t.z,
                            w: t.w,
                            h: t.z
                        };
                    }
                    if (!t.d) {
                        t.d = true;
                        t.x14(t);
                    }
                } else if (t.u == 15) {
                    if (t.a.length == 0) {
                        for (var i = 0; i < t.w / 2; i++) {
                            t.a[i] = {
                                x: i * 2,
                                y: t.h,
                                w: 2,
                                h: t.h
                            };
                        }
                    }
                    if (!t.d) {
                        t.z = 0;
                        t.d = true;
                        t.x15(t);
                    }
                } else if (t.u == 16) {
                    if (t.a.length == 0) {
                        t.zx = t.w / 20;
                        t.zy = t.h / 20;
                        if (Math.random() < .5) {
                            if (Math.random() < .5) {
                                t.a[0] = {
                                    x: 0,
                                    y: 0,
                                    w: 0,
                                    h: 0
                                };
                            } else {
                                t.a[0] = {
                                    x: t.w,
                                    y: 0,
                                    w: 0,
                                    h: 0
                                };
                            }
                        } else {
                            if (Math.random() < .5) {
                                t.a[0] = {
                                    x: 0,
                                    y: t.h,
                                    w: 0,
                                    h: 0
                                };
                            } else {
                                t.a[0] = {
                                    x: t.w,
                                    y: t.h,
                                    w: 0,
                                    h: 0
                                };
                            }
                        }
                    }
                    if (!t.d) {
                        t.d = true;
                        t.x16(t);
                    }
                } else if (t.u == 17) {
                    if (t.a.length == 0) {
                        for (var i = 0; i < 11; i++) {
                            t.a[i] = {};
                            t.a[i].x = i / 10 * t.w;
                            if (i % 2) {
                                t.a[i].y = 5;
                            } else {
                                t.a[i].y = t.h - 5;
                            }
                        }
                        t.a1 = -t.h;
                        t.a2 = t.h;
                    }
                    if (!t.d) {
                        t.d = true;
                        t.x17(t);
                    }
                } else if (t.u == 18) {
                    if (t.a.length == 0) {
                        t.ar = t.w < t.h ? t.w / 4 : t.h / 4;
                        t.z = Math.random() * Math.PI * 2;
                        t.ax = Math.cos(t.z) * t.ar / 2;
                        t.ay = Math.sin(t.z) * t.ar / 2;
                        t.a = [Math.random() * (t.w - t.ar * 2) + t.ar, Math.random() * (t.h - t.ar * 2) + t.ar, t.ax, t.ay, t.ar];
                    }
                    if (!t.d) {
                        t.d = true;
                        t.x18(t);
                    }
                } else if (t.u == 19) {
                    if (t.a.length == 0) {
                        t.zx = t.w / 20;
                        t.zy = t.h / 40;
                        t.a = [-t.w, (t.h / 2) - 1, t.w, 2];
                    }
                    if (!t.d) {
                        t.d = true;
                        t.x19(t);
                    }
                } else if (t.u == 20) {
                    if (t.a.length == 0) {
                        t.z = Math.sqrt(Math.pow(t.w / 2, 2) + Math.pow(t.h / 2, 2));
                        t.a = [t.w / 2, t.h / 2, 1];
                    }
                    if (!t.d) {
                        t.d = true;
                        t.x20(t);
                    }
                }
            } else if (t.u <= 30) {
                if (t.u == 21) {
                    t.o = 1;
                    if (t.a.length == 0) {
                        t.x21(t);
                    }
                } else if (t.u == 22) {
                    if (t.a.length == 0) {
                        t.zx = t.w / 40;
                        t.zy = t.h / 40;
                        t.z = 18 * Math.PI / 180;
                        t.a = [t.w / 2, t.h / 2, 0, 0, 0];
                    }
                    if (!t.d) {
                        t.d = true;
                        t.x22(t);
                    }
                } else if (t.u == 23) {
                    if (t.a.length == 0) {
                        for (var i = 0; i < 10; i++) {
                            t.a[i] = {
                                x: Math.floor(i * t.w / 10),
                                y: -t.h,
                                w: Math.ceil(t.w / 10),
                                h: t.h
                            };
                        }
                    }
                    if (!t.d) {
                        t.d = true;
                        t.x23(t);
                    }
                } else if (t.u == 24) {
                    t.z = 0;
                    if (t.a.length == 0) {
                        for (var i = 1; i < t.w; i += 4) {
                            for (var j = 1; j < t.h; j += 4) {
                                t.a.push({
                                    x: i,
                                    y: j,
                                    w: 3,
                                    h: 3
                                });
                            }
                        }
                    }
                    if (!t.d) {
                        t.d = true;
                        t.x24(t);
                    }
                } else if (t.u == 25) {
                    if (t.a.length == 0) {
                        t.z0 = -90;
                        t.z1 = 90;
                        t.a[0] = {
                            x: 0,
                            y: 0,
                            w: t.w,
                            h: Math.ceil(t.h / 2)
                        };
                        t.a[1] = {
                            x: 0,
                            y: Math.ceil(t.h / 2),
                            w: t.w,
                            h: Math.ceil(t.h / 2)
                        };
                    }
                    if (!t.d) {
                        t.d = true;
                        t.x25(t);
                    }
                } else if (t.u == 26) {
                    if (t.a.length == 0) {
                        t.z = t.h / 40;
                        for (var i = 0; i < 20; i++) {
                            t.a[i] = {
                                x: i * t.w / 20,
                                y: t.h / 2,
                                w: Math.ceil(t.w / 20) + 1,
                                h: 0
                            };
                        }
                    }
                    if (!t.d) {
                        t.d = true;
                        t.x26(t);
                    }
                } else if (t.u == 27) {
                    if (t.a.length == 0) {
                        t.zx = t.w / 40;
                        t.zy = t.h / 40;
                        t.o = 1;
                        t.z = 1;
                        t.a = [t.w / 2, t.h / 2, 0, 0];
                    }
                    if (!t.d) {
                        t.d = true;
                        t.x27(t);
                    }
                } else if (t.u == 28) {
                    if (t.a.length == 0) {
                        t.o = 1;
                        t.a1 = [];
                        for (var i = 0; i < t.w / 2; i++) {
                            t.a[i] = {
                                x: i * 2,
                                y: -t.h,
                                w: 2,
                                h: t.h,
                                t: false
                            };
                            t.a1.push(i);
                        }
                    }
                    if (!t.d) {
                        t.d = true;
                        t.x28(t);
                    }
                } else if (t.u == 29) {
                    if (t.a.length == 0) {
                        t.a1 = [];
                        for (var i = 0; i < t.w / 10; i++) {
                            t.a[i] = {
                                x: i * 10,
                                y: -t.h,
                                w: 5,
                                h: t.h
                            };
                        }
                        for (var j = 0; j < t.h / 10; j++) {
                            t.a1[j] = {
                                x: -t.w,
                                y: j * 10,
                                w: t.w,
                                h: 5
                            };
                        }
                    }
                    if (!t.d) {
                        t.d = true;
                        t.x29(t);
                    }
                } else if (t.u == 30) {
                    if (t.a.length == 0) {
                        t.z = Math.sqrt(Math.pow(t.w / 2, 2) + Math.pow(t.h / 2, 2));
                        t.a = [t.w / 2, t.h / 2, t.z, -90];
                    }
                    if (!t.d) {
                        t.d = true;
                        t.x30(t);
                    }
                }
            } else {
                console.warn('鑾氬倯绲碉拷锟斤拷缇冣墽锟斤拷鑶冿拷' + t.u + '绛濓拷锟斤拷锟斤拷閻氾拷閻氾拷');
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
                if (Math.random() <= 0.5) {
                    if (Math.random() <= 0.5) {
                        t.ran = parseInt(Math.random() * t.w);
                        if (Math.random() <= 0.5) {
                            t.a.push({
                                x1: t.ran,
                                y1: -2,
                                x2: t.x - ((t.ran - t.x) * (t.h - t.y)) / t.y,
                                y2: t.h + 2,
                                o: 1,
                                c: t.c
                            });
                        } else {
                            t.a.push({
                                x1: t.ran,
                                y1: t.h + 2,
                                x2: t.x - ((t.ran - t.x) * t.y) / (t.h - t.y),
                                y2: -2,
                                o: 1,
                                c: t.c
                            });
                        }
                    } else {
                        t.ran = parseInt(Math.random() * t.h);
                        if (Math.random() <= 0.5) {
                            t.a.push({
                                y1: t.ran,
                                x1: -2,
                                y2: t.y - ((t.ran - t.y) * (t.w - t.x)) / t.x,
                                x2: t.w + 2,
                                o: 1,
                                c: t.c
                            });
                        } else {
                            t.a.push({
                                y1: t.ran,
                                x1: t.w + 2,
                                y2: t.y - ((t.ran - t.y) * t.x) / (t.w - t.x),
                                x2: -2,
                                o: 1,
                                c: t.c
                            });
                        }
                    }
                }
            }
            t.ctx.clearRect(0, 0, t.w, t.h);
            for (var i = 0; i < t.a.length; i++) {
                t.ctx.beginPath();
                t.ctx.moveTo(t.a[i].x1, t.a[i].y1);
                t.ctx.lineTo(t.a[i].x2, t.a[i].y2);
                t.ctx.closePath();
                t.ctx.globalAlpha = t.a[i].o;
                t.ctx.strokeStyle = t.a[i].c;
                t.ctx.lineWidth = 2;
                t.ctx.stroke();
                t.a[i].o -= .01;
                if (t.a[i].o <= 0) {
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
            t.ctx.clearRect(0, 0, t.w, t.h);
            t.ctx.fillStyle = t.c;
            for (var i = 0; i < t.a.length; i++) {
                if (t.f) {
                    if (t.a[i].x > 0) {
                        t.a[i].x -= Math.ceil(t.a[i].x / 14);
                    } else if (t.a[i].x < 0) {
                        t.a[i].x -= Math.floor(t.a[i].x / 14);
                    }
                } else {
                    if (i % 2) {
                        t.a[i].x -= Math.floor((t.a[i].x - t.w) / 14);
                    } else {
                        t.a[i].x -= Math.ceil((t.a[i].x + t.w) / 14);
                    }
                };
                t.ctx.fillRect(t.a[i].x, t.a[i].y, t.a[i].w, t.a[i].h);
            }
            t.ctx.globalAlpha = 1;
            if (t.f || t.a[0].x > -t.w) {
                requestAnimationFrame(function () {
                    t.x4(t);
                });
            } else {
                t.ctx.clearRect(0, 0, t.w, t.h);
                t.d = false;
            }
        },
        x5: function (t) {
            if (t.f) {
                t.a.push({
                    x: t.x,
                    y: t.y,
                    r: 10,
                    o: 1,
                    c: t.c,
                    xv: (Math.random() - 0.5) * 5,
                    yv: Math.random() * 3 + 3
                });
            }
            t.ctx.clearRect(0, 0, t.w, t.h);
            for (var i = 0; i < t.a.length; i++) {
                t.ctx.globalAlpha = t.a[i].o;
                t.ctx.fillStyle = t.a[i].c;
                t.ctx.fillRect(t.a[i].x, t.a[i].y, t.a[i].r, t.a[i].r);
                t.a[i].o -= .03;
                t.a[i].yv -= .5;
                t.a[i].xv -= t.a[i].xv / 20;
                t.a[i].x -= t.a[i].xv;
                t.a[i].y -= t.a[i].yv;
                if (t.a[i].o <= 0 || t.a[i].y >= t.h) {
                    t.a.splice(i, 1);
                    i--;
                }
            }
            t.ctx.globalAlpha = 1;
            if (t.f || t.a.length > 0) {
                requestAnimationFrame(function () {
                    t.x5(t);
                });
            } else {
                t.ctx.clearRect(0, 0, t.w, t.h);
            }
        },
        x6: function (t) {
            if (t.f && Math.random() < .5) {
                t.a.push({
                    x: t.w * Math.random(),
                    y: t.h * Math.random(),
                    r: 1,
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
                t.a[i].o -= .025;
                t.a[i].r += .4;
                if (t.a[i].o <= 0) {
                    t.a.splice(i, 1);
                    i--;
                }
            }
            t.ctx.globalAlpha = 1;
            if (t.f || t.a.length > 0) {
                requestAnimationFrame(function () {
                    t.x6(t);
                });
            } else {
                t.ctx.clearRect(0, 0, t.w, t.h);
            }
        },
        x7: function (t) {
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
                    t.x7(t);
                });
            } else {
                t.ctx.clearRect(0, 0, t.w, t.h);
            }
        },
        x8: function (t) {
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
                    t.x8(t);
                });
            } else {
                t.ctx.clearRect(0, 0, t.w, t.h);
            }
        },
        x9: function (t) {
            if (t.f) {
                t.tan = Math.random() * 3 + 1;
                t.a.push({
                    x: Math.random() * t.w,
                    y: Math.random() * t.h,
                    r: t.tan,
                    c: t.c,
                    o: 1
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
                t.ctx.globalAlpha = t.a[i].o;
                t.ctx.fill();
                t.a[i].x += Math.cos(Math.random() * Math.PI * 2);
                t.a[i].y += Math.sin(Math.random() * Math.PI * 2);
                t.a[i].o -= 0.01;
                /*if(t.a[i].y>t.a[i].r+t.h || t.a[i].y<-t.a[i].r || t.a[i].x<-t.a[i].r || t.a[i].x > t.a[i].r+t.w){
                	t.a.splice(i,1);
                	i--;
                }*/
                if (t.a[i].o <= 0) {
                    t.a.splice(i, 1);
                    i--;
                }
            }
            t.ctx.globalAlpha = 1;
            if (t.f || t.a.length > 0) {
                requestAnimationFrame(function () {
                    t.x9(t);
                });
            } else {
                t.ctx.clearRect(0, 0, t.w, t.h);
            }
        },
        x10: function (t) {
            if (t.f) {
                t.tan = Math.random() * 3 + 1;
                t.tan2 = Math.random() * Math.PI * 2;
                t.a.push({
                    x: Math.random() * t.w,
                    y: Math.random() * t.h,
                    r: t.tan,
                    c: t.c,
                    t: t.tan2
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
                t.a[i].x += Math.cos(t.a[i].t);
                t.a[i].y += Math.sin(t.a[i].t);
                if (t.a[i].y > t.a[i].r + t.h || t.a[i].y < -t.a[i].r || t.a[i].x < -t.a[i].r || t.a[i].x > t.a[i].r + t.w) {
                    t.a.splice(i, 1);
                    i--;
                }
            }
            t.ctx.globalAlpha = 1;
            if (t.f || t.a.length > 0) {
                requestAnimationFrame(function () {
                    t.x10(t);
                });
            } else {
                t.ctx.clearRect(0, 0, t.w, t.h);
            }
        },
        x11: function (t) {
            if (t.f) {
                t.tan = Math.random() * 3 + 1;
                t.tan2 = Math.random() * Math.PI * 2;
                t.a.push({
                    x: t.x,
                    y: t.y,
                    r: t.tan,
                    c: t.c,
                    t: t.tan2
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
                t.a[i].x += Math.cos(t.a[i].t);
                t.a[i].y += Math.sin(t.a[i].t);
                if (t.a[i].y > t.a[i].r + t.h || t.a[i].y < -t.a[i].r || t.a[i].x < -t.a[i].r || t.a[i].x > t.a[i].r + t.w) {
                    t.a.splice(i, 1);
                    i--;
                }
            }
            t.ctx.globalAlpha = 1;
            if (t.f || t.a.length > 0) {
                requestAnimationFrame(function () {
                    t.x11(t);
                });
            } else {
                t.ctx.clearRect(0, 0, t.w, t.h);
            }
        },
        x12: function (t) {
            if (t.f) {
                t.tan = Math.random() * 3 + 4;
                t.a.push({
                    x: Math.random() * t.w,
                    y: Math.random() * t.h,
                    r: t.tan,
                    c: t.c,
                    v: 0
                });
            }
            t.ctx.globalAlpha = 0.3;
            t.ctx.fillStyle = t.bc;
            t.ctx.fillRect(0, 0, t.w, t.h);
            for (var i = 0; i < t.a.length; i++) {
                t.ctx.fillStyle = t.a[i].c;
                t.ctx.fillRect(t.a[i].x, t.a[i].y, t.a[i].r, t.a[i].r);
                t.a[i].v += 0.02;
                t.a[i].y += t.a[i].v;
                if (t.a[i].y > t.a[i].r + t.h) {
                    t.a.splice(i, 1);
                    i--;
                }
            }
            t.ctx.globalAlpha = 1;
            if (t.f || t.a.length > 0) {
                requestAnimationFrame(function () {
                    t.x12(t);
                });
            } else {
                t.ctx.clearRect(0, 0, t.w, t.h);
            }
        },
        x13: function (t) {
            t.ctx.globalAlpha = 0.3;
            t.ctx.fillStyle = t.bc;
            t.ctx.fillRect(0, 0, t.w, t.h);
            t.ctx.lineWidth = 5;
            if (t.f) {
                t.o = 1;
            } else {
                t.o -= 0.02;
            }
            t.ctx.globalAlpha = t.o;
            t.ctx.save();
            t.ctx.translate(t.w / 2, t.h / 2);
            t.ctx.rotate(t.m * Math.PI / 180);
            t.ctx.translate(-t.w / 2, -t.h / 2);
            for (var i = 0; i < t.a.length; i++) {
                t.ctx.strokeStyle = t.a[i].c;
                t.ctx.beginPath();
                t.ctx.moveTo(t.a[i].x, t.a[i].y);
                t.ctx.lineTo(t.a[i].x1, t.a[i].y1);
                t.ctx.closePath();
                t.ctx.stroke();
            }
            t.ctx.restore();
            t.m += 5;
            if (t.o <= 0) {
                t.a = [];
            }
            t.ctx.globalAlpha = 1;
            if (t.f || t.a.length > 0) {
                requestAnimationFrame(function () {
                    t.x13(t);
                });
            } else {
                t.ctx.clearRect(0, 0, t.w, t.h);
                t.d = false;
            }
        },
        x14: function (t) {
            t.ctx.globalAlpha = 1;
            t.ctx.fillStyle = t.bc;
            t.ctx.clearRect(0, 0, t.w, t.h);
            if (t.f) {
                t.a[0].y += t.zy;
                t.a[1].y -= t.zy;
                if (t.a[0].y >= 0) {
                    t.a[0].y = 0;
                }
                if (t.a[1].y <= t.h - t.z) {
                    t.a[1].y = t.h - t.z;
                }
                if (t.a[0].y == 0) {
                    t.a[2].x += t.zx;
                    t.a[3].x -= t.zx;
                    if (t.a[2].x >= -t.w / 2) {
                        t.a[2].x = -t.w / 2;
                    }
                    if (t.a[3].x <= t.w / 2) {
                        t.a[3].x = t.w / 2;
                    }
                }
            } else {
                t.a[2].x -= t.zx;
                t.a[3].x += t.zx;
                if (t.a[2].x <= -t.w) {
                    t.a[2].x = -t.w;
                }
                if (t.a[3].x >= t.w) {
                    t.a[3].x = t.w;
                }
                if (t.a[2].x == -t.w) {
                    t.a[0].y -= t.zy;
                    t.a[1].y += t.zy;
                    if (t.a[0].y <= -t.z) {
                        t.a[0].y = -t.z;
                    }
                    if (t.a[1].y >= t.h) {
                        t.a[1].y = t.h;
                    }
                }
            }
            t.ctx.fillStyle = t.c;
            for (var i = 0; i < t.a.length; i++) {
                t.ctx.fillRect(t.a[i].x, t.a[i].y, t.a[i].w, t.a[i].h);
            }
            if (t.f || t.a[1].y < t.h) {
                requestAnimationFrame(function () {
                    t.x14(t);
                });
            } else {
                t.ctx.clearRect(0, 0, t.w, t.h);
                t.d = false;
            }
        },
        x15: function (t) {
            t.q = false;
            t.ctx.globalAlpha = 1;
            t.ctx.fillStyle = t.c;
            t.ctx.clearRect(0, 0, t.w, t.h);
            t.z += Math.PI / 60;
            if (t.f) {
                t.a[0].y = t.h / 2 + Math.cos(t.z) * t.h / 2;
            } else {
                t.a[0].y = t.h;
            }
            t.ctx.fillRect(t.a[0].x, t.a[0].y, t.a[0].w, t.a[0].h);
            if (t.a[0].y < t.h) {
                t.q = true;
            }
            for (var i = t.a.length - 1; i > 0; i--) {
                t.a[i].y = t.a[i - 1].y;
                t.ctx.fillRect(t.a[i].x, t.a[i].y, t.a[i].w, t.a[i].h);
                if (t.a[i].y < t.h) {
                    t.q = true;
                }
            }
            if (t.f || t.q) {
                requestAnimationFrame(function () {
                    t.x15(t);
                });
            } else {
                t.ctx.clearRect(0, 0, t.w, t.h);
                t.d = false;
            }
        },
        x16: function (t) {
            t.ctx.globalAlpha = 1;
            t.ctx.fillStyle = t.c;
            t.ctx.clearRect(0, 0, t.w, t.h);
            if (t.f) {
                t.a[0].x -= t.zx;
                t.a[0].y -= t.zy;
                t.a[0].w += t.zx;
                t.a[0].h += t.zy;
                if (t.a[0].x <= 0) {
                    t.a[0].x = 0;
                }
                if (t.a[0].y <= 0) {
                    t.a[0].y = 0;
                }
                if (t.a[0].w >= t.w) {
                    t.a[0].w = t.w;
                }
                if (t.a[0].h > t.h) {
                    t.a[0].h = t.h;
                }
            } else {
                if (t.a[0].x == 0 && t.a[0].y == 0) {
                    if (t.a[0].w == t.w) {
                        if (Math.random() < .5) {
                            if (Math.random() < .5) {
                                t.a[0].xj = 0;
                                t.a[0].yj = 0;
                            } else {
                                t.a[0].xj = t.zx;
                                t.a[0].yj = 0;
                            }
                        } else {
                            if (Math.random() < .5) {
                                t.a[0].xj = 0;
                                t.a[0].yj = t.zy;
                            } else {
                                t.a[0].xj = t.zx;
                                t.a[0].yj = t.zy;
                            }
                        }
                    } else {
                        t.a[0].xj = 0;
                        t.a[0].yj = 0;
                    }
                } else if (t.a[0].x == 0) {
                    t.a[0].xj = 0;
                    t.a[0].yj = t.zy;
                } else if (t.a[0].y == 0) {
                    t.a[0].xj = t.zx;
                    t.a[0].yj = 0;
                } else {
                    t.a[0].xj = t.zx;
                    t.a[0].yj = t.zy;
                }
                t.a[0].x += t.a[0].xj;
                t.a[0].y += t.a[0].yj;
                t.a[0].w -= t.zx;
                t.a[0].h -= t.zy;
                if (t.a[0].w <= 0) {
                    t.a[0].w = 0;
                }
                if (t.a[0].h <= 0) {
                    t.a[0].h = 0;
                }
                if (t.a[0].x >= t.w) {
                    t.a[0].x = t.w;
                }
                if (t.a[0].y >= t.h) {
                    t.a[0].y = t.h;
                }
            }
            t.ctx.fillRect(t.a[0].x, t.a[0].y, t.a[0].w, t.a[0].h);
            if (t.a[0].w == 0 && t.a[0].h == 0) {
                t.a = [];
            }
            if (t.f || t.a.length > 0) {
                requestAnimationFrame(function () {
                    t.x16(t);
                });
            } else {
                t.ctx.clearRect(0, 0, t.w, t.h);
                t.d = false;
            }
        },
        x17: function (t) {
            t.ctx.globalAlpha = 1;
            t.ctx.fillStyle = t.c;
            t.ctx.clearRect(0, 0, t.w, t.h);
            if (t.f) {
                t.a1 += t.h / 20;
                t.a2 -= t.h / 20;
                if (t.a1 >= 0) {
                    t.a1 = 0;
                }
                if (t.a2 <= 0) {
                    t.a2 = 0;
                }
            } else {
                t.a1 -= t.h / 20;
                t.a2 += t.h / 20;
                if (t.a1 <= -t.h) {
                    t.a1 = -t.h;
                }
                if (t.a2 >= t.h) {
                    t.a2 = t.h;
                }
            }
            t.ctx.beginPath();
            t.ctx.moveTo(0, -t.h);
            for (var i = 0; i < t.a.length; i++) {
                t.ctx.lineTo(t.a[i].x, t.a[i].y + t.a1);
            }
            t.ctx.lineTo(t.w, -t.h);
            t.ctx.closePath();
            t.ctx.fill();
            t.ctx.beginPath();
            t.ctx.moveTo(0, t.h);
            for (var i = 0; i < t.a.length; i++) {
                t.ctx.lineTo(t.a[i].x, t.a[i].y + t.a2);
            }
            t.ctx.lineTo(t.w, t.h);
            t.ctx.closePath();
            t.ctx.fill();
            if (t.f || t.a1 > -t.h) {
                requestAnimationFrame(function () {
                    t.x17(t);
                });
            } else {
                t.ctx.clearRect(0, 0, t.w, t.h);
                t.d = false;
            }
        },
        x18: function (t) {
            t.q = true;
            t.ctx.globalAlpha = 0.3;
            t.ctx.fillStyle = t.bc;
            t.ctx.fillRect(0, 0, t.w, t.h);
            t.a[0] += t.a[2];
            t.a[1] += t.a[3];
            if (t.f) {
                if (t.a[0] <= t.a[4]) {
                    t.a[0] = 2 * t.a[4] - t.a[0];
                    t.a[2] *= -1;
                } else if (t.a[0] >= t.w - t.a[4]) {
                    t.a[0] = 2 * (t.w - t.a[4]) - t.a[0];
                    t.a[2] *= -1;
                }
                if (t.a[1] <= t.a[4]) {
                    t.a[1] = 2 * t.a[4] - t.a[1];
                    t.a[3] *= -1;
                } else if (t.a[1] >= t.h - t.a[4]) {
                    t.a[1] = 2 * (t.h - t.a[4]) - t.a[1];
                    t.a[3] *= -1;
                }
            } else {
                if (t.a[0] <= -t.a[4] || t.a[0] >= t.a[4] + t.w || t.a[1] <= -t.a[4] || t.a[1] >= t.a[4] + t.h) {
                    t.q = false;
                    t.a = [];
                }
            }
            t.ctx.fillStyle = t.c;
            t.ctx.globalAlpha = 1;
            t.ctx.beginPath();
            t.ctx.arc(t.a[0], t.a[1], t.a[4], 0, Math.PI * 2);
            t.ctx.closePath();
            t.ctx.fill();
            if (t.f || t.q) {
                requestAnimationFrame(function () {
                    t.x18(t);
                });
            } else {
                t.ctx.clearRect(0, 0, t.w, t.h);
                t.d = false;
            }
        },
        x19: function (t) {
            t.ctx.globalAlpha = 1;
            t.ctx.clearRect(0, 0, t.w, t.h);
            t.ctx.fillStyle = t.c;
            if (t.f) {
                t.a[0] += t.zx;
                if (t.a[0] >= 0) {
                    t.a[0] = 0;
                    t.a[1] -= t.zy;
                    t.a[3] += 2 * t.zy;
                }
                if (t.a[1] <= 0) {
                    t.a[1] = 0;
                }
                if (t.a[3] >= t.h) {
                    t.a[3] = t.h;
                }
            } else {
                t.a[1] += t.zy;
                t.a[3] -= 2 * t.zy;
                if (t.a[1] >= (t.h / 2) - 1) {
                    t.a[1] = (t.h / 2) - 1;
                }
                if (t.a[3] <= 2) {
                    t.a[3] = 2;
                }
                if (t.a[1] == (t.h / 2) - 1 && t.a[3] == 2) {
                    t.a[0] -= t.zx;
                }
                if (t.a[0] <= -t.w) {
                    t.a[0] = -t.w;
                }
            }
            t.ctx.fillRect(t.a[0], t.a[1], t.a[2], t.a[3]);
            if (t.f || t.a[0] > -t.w) {
                requestAnimationFrame(function () {
                    t.x19(t);
                });
            } else {
                t.a = [];
                t.ctx.clearRect(0, 0, t.w, t.h);
                t.d = false;
            }
        },
        x20: function (t) {
            t.ctx.globalAlpha = 1;
            t.ctx.clearRect(0, 0, t.w, t.h);
            t.ctx.fillStyle = t.c;
            if (t.f) {
                t.a[2] += t.z / 20;
                if (t.a[2] >= t.z) {
                    t.a[2] = t.z;
                }
            } else {
                t.a[2] -= t.z / 20;
                if (t.a[2] <= 1) {
                    t.a[2] = 1;
                }
            }
            t.ctx.beginPath();
            t.ctx.arc(t.a[0], t.a[1], t.a[2], 0, Math.PI * 2);
            t.ctx.fill();
            if (t.f || t.a[2] > 1) {
                requestAnimationFrame(function () {
                    t.x20(t);
                });
            } else {
                t.a = [];
                t.ctx.clearRect(0, 0, t.w, t.h);
                t.d = false;
            }
        },
        x21: function (t) {
            if (t.f && t.a.length < 50) {
                t.z = Math.ceil(Math.random() * 4);
                if (t.z == 1) {
                    t.a.push({
                        x: t.w / 2,
                        y: t.h / 2,
                        r: 2,
                        zx: 2,
                        zy: 0
                    });
                } else if (t.z == 2) {
                    t.a.push({
                        x: t.w / 2,
                        y: t.h / 2,
                        r: 2,
                        zx: -2,
                        zy: 0
                    });
                } else if (t.z == 3) {
                    t.a.push({
                        x: t.w / 2,
                        y: t.h / 2,
                        r: 2,
                        zx: 0,
                        zy: 2
                    });
                } else {
                    t.a.push({
                        x: t.w / 2,
                        y: t.h / 2,
                        r: 2,
                        zx: 0,
                        zy: -2
                    });
                }
            }
            t.ctx.globalAlpha = 0.3;
            t.ctx.fillStyle = t.bc;
            t.ctx.fillRect(0, 0, t.w, t.h);
            t.ctx.fillStyle = t.c;
            if (t.f) {
                t.o = 1;
            } else {
                t.o -= 0.05;
                if (t.o <= 0) {
                    t.o = 0;
                }
            }
            t.ctx.globalAlpha = t.o;
            for (var i = 0; i < t.a.length; i++) {
                t.a[i].x += t.a[i].zx;
                t.a[i].y += t.a[i].zy;
                if (Math.random() < .1) {
                    if (t.a[i].zy == 0) {
                        t.a[i].zx = 0;
                        if (Math.random() < .5) {
                            t.a[i].zy = 2;
                        } else {
                            t.a[i].zy = -2;
                        }
                    } else {
                        t.a[i].zy = 0;
                        if (Math.random() < .5) {
                            t.a[i].zx = 2;
                        } else {
                            t.a[i].zx = -2;
                        }
                    }
                }
                t.ctx.fillRect(t.a[i].x, t.a[i].y, t.a[i].r, t.a[i].r);
                if (t.a[i].x <= -t.a[i].r || t.a[i].x >= t.w || t.a[i].y <= -t.a[i].r || t.a[i].y >= t.h) {
                    t.a.splice(i, 1);
                    i--;
                }
            }
            if (t.f || t.o > 0) {
                requestAnimationFrame(function () {
                    t.x21(t);
                });
            } else {
                t.a = [];
                t.ctx.clearRect(0, 0, t.w, t.h);
            }
        },
        x22: function (t) {
            t.ctx.globalAlpha = 1;
            t.ctx.clearRect(0, 0, t.w, t.h);
            t.ctx.fillStyle = t.c;
            if (t.f) {
                t.a[4] += t.z;
                t.a[0] -= t.zx / 2;
                t.a[1] -= t.zy / 2;
                t.a[2] += t.zx;
                t.a[3] += t.zy;
                if (t.a[4] >= 4 * Math.PI) {
                    t.a[4] = 4 * Math.PI;
                }
                if (t.a[0] <= 0) {
                    t.a[0] = 0;
                }
                if (t.a[1] <= 0) {
                    t.a[1] = 0;
                }
                if (t.a[2] >= t.w) {
                    t.a[2] = t.w;
                }
                if (t.a[3] >= t.h) {
                    t.a[3] = t.h;
                }
            } else {
                t.a[4] -= t.z;
                t.a[0] += t.zx / 2;
                t.a[1] += t.zy / 2;
                t.a[2] -= t.zx;
                t.a[3] -= t.zy;
                if (t.a[4] <= 0) {
                    t.a[4] = 0
                }
            }
            t.ctx.save();
            t.ctx.translate(t.w / 2, t.h / 2);
            t.ctx.rotate(t.a[4]);
            t.ctx.translate(-t.w / 2, -t.h / 2);
            t.ctx.fillRect(t.a[0], t.a[1], t.a[2], t.a[3]);
            t.ctx.restore();
            if (t.f || t.a[4] > 0) {
                requestAnimationFrame(function () {
                    t.x22(t);
                });
            } else {
                t.a = [];
                t.ctx.clearRect(0, 0, t.w, t.h);
                t.d = false;
            }
        },
        x23: function (t) {
            t.ctx.clearRect(0, 0, t.w, t.h);
            t.q = false;
            t.ctx.fillStyle = t.c;
            for (var i = 0; i < t.a.length; i++) {
                if (t.f) {
                    if (i == 0) {
                        t.a[i].y += t.h / 20;
                    } else if ((t.a[i - 1].y >= -t.h / 1.3 && t.a[i - 1].y >= t.a[i].y + (t.h - t.h / 1.3)) || t.a[i - 1].y == 0) {
                        t.a[i].y += t.h / 20;
                    }
                    if (t.a[i].y >= 0) {
                        t.a[i].y = 0;
                    }
                } else {
                    if (i == 0) {
                        t.a[i].y -= t.h / 20;
                    } else if (t.a[i - 1].y <= t.a[i].y - (t.h - t.h / 1.3) || t.a[i - 1].y == -t.h) {
                        t.a[i].y -= t.h / 20;
                    }
                    if (t.a[i].y <= -t.h) {
                        t.a[i].y = -t.h;
                    }
                };
                t.ctx.fillRect(t.a[i].x, t.a[i].y, t.a[i].w, t.a[i].h);
                if (t.a[i].y > -t.h) {
                    t.q = true;
                }
            }
            t.ctx.globalAlpha = 1;
            if (t.f || t.q) {
                requestAnimationFrame(function () {
                    t.x23(t);
                });
            } else {
                t.ctx.clearRect(0, 0, t.w, t.h);
                t.d = false;
            }
        },
        x24: function (t) {
            t.ctx.globalAlpha = 0.3;
            t.ctx.fillStyle = t.bc;
            t.ctx.fillRect(0, 0, t.w, t.h);
            t.ctx.fillStyle = t.c;
            for (var i = 0; i < t.a.length; i++) {
                if (t.f) {
                    if (Math.random() < .3) {
                        t.ctx.fillRect(t.a[i].x, t.a[i].y, t.a[i].w, t.a[i].h);
                    }
                } else {
                    if (t.z <= 10) {
                        t.ctx.fillRect(t.a[i].x, t.a[i].y, t.a[i].w, t.a[i].h);
                    }
                };
            }
            if (!t.f) {
                t.z++;
            }
            if (t.f || t.z < 20) {
                requestAnimationFrame(function () {
                    t.x24(t);
                });
            } else {
                t.ctx.clearRect(0, 0, t.w, t.h);
                t.d = false;
            }
        },
        x25: function (t) {
            t.ctx.clearRect(0, 0, t.w, t.h);
            t.ctx.fillStyle = t.c;
            if (t.f) {
                t.z0 += 3;
                t.z1 -= 3;
                if (t.z0 >= 0) {
                    t.z0 = 0;
                }
                if (t.z1 <= 0) {
                    t.z1 = 0;
                }
            } else {
                t.z0 -= 3;
                t.z1 += 3;
                if (t.z0 <= -90) {
                    t.z0 = -90;
                }
                if (t.z1 >= 90) {
                    t.z1 = 90;
                }
            }
            t.ctx.save();
            t.ctx.translate(0, t.h / 2);
            t.ctx.rotate(t.z0 * Math.PI / 180);
            t.ctx.translate(0, -t.h / 2);
            t.ctx.fillRect(t.a[0].x, t.a[0].y, t.a[0].w, t.a[0].h);
            t.ctx.restore();
            t.ctx.save();
            t.ctx.translate(0, t.h / 2);
            t.ctx.rotate(t.z1 * Math.PI / 180);
            t.ctx.translate(0, -t.h / 2);
            t.ctx.fillRect(t.a[1].x, t.a[1].y, t.a[1].w, t.a[1].h);
            t.ctx.restore();
            if (t.f || t.z1 < 90) {
                requestAnimationFrame(function () {
                    t.x25(t);
                });
            } else {
                t.ctx.clearRect(0, 0, t.w, t.h);
                t.d = false;
            }
        },
        x26: function (t) {
            t.q = false;
            t.ctx.globalAlpha = 1;
            t.ctx.fillStyle = t.c;
            t.ctx.clearRect(0, 0, t.w, t.h);
            if (t.f) {
                t.a[0].y -= t.z;
                t.a[0].h += 2 * t.z;
                if (t.a[0].y <= 0) {
                    t.a[0].y = 0;
                }
                if (t.a[0].h >= t.h) {
                    t.a[0].h = t.h;
                }
            } else {
                t.a[0].y += t.z;
                t.a[0].h -= 2 * t.z;
                if (t.a[0].y >= t.h / 2) {
                    t.a[0].y = t.h / 2;
                }
                if (t.a[0].h <= 0) {
                    t.a[0].h = 0;
                }
            }
            t.ctx.fillRect(t.a[0].x, t.a[0].y, t.a[0].w, t.a[0].h);
            if (t.a[0].h > 0) {
                t.q = true;
            }
            for (var i = t.a.length - 1; i > 0; i--) {
                t.a[i].y = t.a[i - 1].y;
                t.a[i].h = t.a[i - 1].h;
                t.ctx.fillRect(t.a[i].x, t.a[i].y, t.a[i].w, t.a[i].h);
                if (t.a[i].h > 0) {
                    t.q = true;
                }
            }
            if (t.f || t.q) {
                requestAnimationFrame(function () {
                    t.x26(t);
                });
            } else {
                t.ctx.clearRect(0, 0, t.w, t.h);
                t.d = false;
            }
        },
        x27: function (t) {
            t.ctx.globalAlpha = 0.3;
            t.ctx.fillStyle = t.bc;
            t.ctx.fillRect(0, 0, t.w, t.h);
            t.ctx.fillStyle = t.c;
            t.a[0] -= t.zx * t.z;
            t.a[1] -= t.zy * t.z;
            t.a[2] += 2 * t.zx * t.z;
            t.a[3] += 2 * t.zy * t.z;
            if (t.a[2] <= 0 || t.a[2] >= t.w) {
                t.z *= -1;
            }
            if (t.f) {
                t.o = 1;
            } else {
                t.o -= 0.02;
            }
            t.ctx.globalAlpha = t.o;
            t.ctx.fillRect(t.a[0], t.a[1], t.a[2], t.a[3]);
            if (t.f || t.o > 0) {
                requestAnimationFrame(function () {
                    t.x27(t);
                });
            } else {
                t.a = [];
                t.ctx.clearRect(0, 0, t.w, t.h);
                t.d = false;
            }
        },
        x28: function (t) {
            t.ctx.globalAlpha = 1;
            t.ctx.fillStyle = t.c;
            t.ctx.clearRect(0, 0, t.w, t.h);
            if (t.a1.length > 0) {
                t.z = Math.floor(Math.random() * t.a1.length);
                t.a[t.a1[t.z]].t = true;
                t.a1.splice(t.z, 1);
            }
            if (t.f) {
                t.o = 1;
            } else {
                t.o -= 0.02;
            }
            t.ctx.globalAlpha = t.o;
            for (var i = 0; i < t.a.length; i++) {
                if (t.a[i].t) {
                    t.a[i].y += t.h / 20;
                    if (t.a[i].y >= 0) {
                        t.a[i].y = 0;
                    }
                }
                t.ctx.fillRect(t.a[i].x, t.a[i].y, t.a[i].w, t.a[i].h);
            }
            if (t.f || t.o > 0) {
                requestAnimationFrame(function () {
                    t.x28(t);
                });
            } else {
                t.a = [];
                t.ctx.clearRect(0, 0, t.w, t.h);
                t.d = false;
            }
        },
        x29: function (t) {
            t.ctx.globalAlpha = 1;
            t.ctx.fillStyle = t.c;
            t.ctx.clearRect(0, 0, t.w, t.h);
            if (t.f) {
                t.z = 1;
            } else {
                t.z = -1;
            }
            for (var i = 0; i < t.a.length; i++) {
                t.a[i].y += t.z * t.h / 20;
                if (t.a[i].y >= 0) {
                    t.a[i].y = 0;
                } else if (t.a[i].y <= -t.h) {
                    t.a[i].y = -t.h;
                }
                t.ctx.fillRect(t.a[i].x, t.a[i].y, t.a[i].w, t.a[i].h);
            }
            for (var j = 0; j < t.a1.length; j++) {
                t.a1[j].x += t.z * t.w / 20;
                if (t.a1[j].x >= 0) {
                    t.a1[j].x = 0;
                } else if (t.a1[j].x <= -t.w) {
                    t.a1[j].x = -t.w;
                }
                t.ctx.fillRect(t.a1[j].x, t.a1[j].y, t.a1[j].w, t.a1[j].h);
            }
            if (t.f || (t.a[0].y > -t.h && t.a1[0].x > -t.w)) {
                requestAnimationFrame(function () {
                    t.x29(t);
                });
            } else {
                t.a = [];
                t.ctx.clearRect(0, 0, t.w, t.h);
                t.d = false;
            }
        },
        x30: function (t) {
            t.ctx.globalAlpha = 1;
            t.ctx.fillStyle = t.c;
            t.ctx.clearRect(0, 0, t.w, t.h);
            if (t.f) {
                t.a[3] += 10;
            } else {
                t.a[3] -= 10;
            };
            if (t.a[3] >= 270) {
                t.a[3] = 270;
            } else if (t.a[3] <= -90) {
                t.a[3] = -90;
            }
            t.ctx.beginPath();
            t.ctx.moveTo(t.a[0], t.a[1]);
            t.ctx.arc(t.a[0], t.a[1], t.a[2], -90 * Math.PI / 180, t.a[3] * Math.PI / 180);
            t.ctx.closePath();
            t.ctx.fill();
            if (t.f || t.a[3] > -90) {
                requestAnimationFrame(function () {
                    t.x30(t);
                });
            } else {
                t.a = [];
                t.ctx.clearRect(0, 0, t.w, t.h);
                t.d = false;
            }
        }
    };
    var y = {
        color: false,
    };
    $.fn.xs999 = function (u, g) {
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

    if (window.screen.width > 600) {

        $(".scroll-wrap").xs999(5);
        $(".footer").xs999(2);
        $("#gotop").xs999(1);
        $(".article-card").xs999(11);
        $(".header-icon").xs999(1);
        var RandomStyle = Math.random();
        if (RandomStyle > 0.5) {
            $(".card-card").xs999(23);
        } else {
            $(".card-card").xs999(17);
        }

        $("#reward").xs999(7);
        $("#wechat").xs999(8);

        if (RandomStyle > 0.5) {
            $(".tabs-bar").xs999(26);
        } else {
            $(".tabs-bar").xs999(20);
        }

        $('#example').bumpyText();
        $('.post-card-title').bumpyText();

        $("#followme").after("<div id='world'></div>");
    }

    elasticText({
        id: 'otext2',
        duration: 100,
        effact: 'easeOut',
        content: '你算哪块小饼干！'
    });

    function get_hitokoto() {
        $.ajax({
            type: 'POST',
            url: 'https://sslapi.hitokoto.cn/',
            dataType: 'json',
            timeout: 4000,
            success: function (data) {
                if (data.hitokoto.length + data.from.length > 20 && window.screen.width < 600) {
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

}());
