(function (w, d) {
    const body = d.body,
        $ = d.querySelector.bind(d),
        $$ = d.querySelectorAll.bind(d),
        root = $("html"),
        gotop = $("#gotop"),
        menu = $("#menu"),
        main = $("#main"),
        header = $("#header"),
        mask = $("#mask"),
        menuToggle = $("#menu-toggle"),
        menuOff = $("#menu-off"),
        title = $(".header-title"),
        loading = $("#loading"),
        isPost = location.href.indexOf("post") !== -1,
        animate = w.requestAnimationFrame,
        scrollSpeed = 200 / (1000 / 60),
        forEach = Array.prototype.forEach,
        isWX = (/micromessenger/i).test(navigator.userAgent),
        noop = function () {},
        offset = function (el) {
            let x = el.offsetLeft,
                y = el.offsetTop;
            if (el.offsetParent) {
                const pOfs = arguments.callee(el.offsetParent);
                x += pOfs.x;
                y += pOfs.y;
            }
            return {
                x: x,
                y: y
            };
        };
    let even = "ontouchstart" in w && (/Mobile|Android|iOS|iPhone|iPad|iPod|Windows Phone|KFAPWI/i).test(navigator.userAgent) ? "touchstart" : "click";
    let docEl = d.documentElement;
    if (w.innerWidth > 600) {
        if ((window.navigator.userAgent.indexOf("WOW") > -1 || window.navigator.userAgent.indexOf("Edge") > -1 || window.navigator.userAgent.indexOf("MSIE") > -1) && window.navigator.userAgent.indexOf("Trident") === -1) {
            docEl = body;
        }
    } else {
        if (window.navigator.userAgent.indexOf("Android") > -1) {
            if (window.navigator.userAgent.indexOf("Browser") > -1) {
                docEl = body;
            }
        }
    }
    const Blog = {
        goTop: function (end) {
            const top = docEl.scrollTop;
            const interval = arguments.length > 2 ? arguments[1] : Math.abs(top - end) / scrollSpeed;
            if (top && top > end) {
                docEl.scrollTop = Math.max(top - interval, 0);
                animate(arguments.callee.bind(this, end, interval));
            } else if (end && top < end) {
                docEl.scrollTop = Math.min(top + interval, end);
                animate(arguments.callee.bind(this, end, interval));
            } else {
                this.toc.actived(end);
            }
        },
        toggleGotop: function (top) {
            if (top > w.innerHeight / 2) {
                gotop.classList.add("in");
            } else {
                gotop.classList.remove("in");
            }
        },
        toggleMenu: function (flag) {
            if (flag) {
                menu.classList.remove("hide");
                if (!isPost) {
                    main.classList.remove("menuoff");
                    jQuery(title).animate({
                        marginRight: "-20%"
                    });
                }
                if (w.innerWidth < 1241) {
                    mask.classList.add("in");
                    menu.classList.add("show");

                    if (isWX) {
                        const top = docEl.scrollTop;
                        main.classList.add("lock");
                        main.scrollTop = top;
                    } else {
                        root.classList.add("lock");
                    }
                }
            } else {
                mask.classList.remove("in");
                menu.classList.remove("show");

                if (isWX) {
                    const top = main.scrollTop;
                    main.classList.remove("lock");
                    docEl.scrollTop = top;
                } else {
                    root.classList.remove("lock");
                }
            }
        },
        fixedHeader: function (top) {
            if (top > header.clientHeight) {
                header.classList.add("fixed");
            } else {
                header.classList.remove("fixed");
            }
        },
        toc: (function () {
            const toc = $("#post-toc");
            if (!toc || !toc.children.length) {
                if (isPost) {
                    main.classList.add("show");
                }

                return {
                    fixed: noop,
                    actived: noop
                };
            }
            const bannerH = $(".post-header").clientHeight,
                headerH = header.clientHeight,
                titles = $("#post-content").querySelectorAll("h1, h2, h3, h4, h5, h6");
            toc.querySelector(`a[href="#${ titles[0].id }"]`).parentNode.classList.add("active");

            main.classList.add("tocshow");

            title.classList.add("toc");
            $(".footer").classList.add("toc");

            return {
                fixed: function (top) {
                    if (top >= bannerH - headerH) {
                        toc.classList.add("fixed");
                    } else {
                        toc.classList.remove("fixed");
                    }
                },
                actived: function (top) {
                    for (let i = 0, len = titles.length; i < len; i++) {
                        if (top > offset(titles[i]).y - headerH - 5) {
                            toc.querySelector("li.active").classList.remove("active");
                            const active = toc.querySelector(`a[href="#${ titles[i].id }"]`).parentNode;
                            active.classList.add("active");
                        }
                    }
                    if (top < offset(titles[0]).y) {
                        toc.querySelector("li.active").classList.remove("active");
                        toc.querySelector(`a[href="#${ titles[0].id }"]`).parentNode.classList.add("active");
                    }
                }
            };
        }()),
        hideOnMask: [],
        modal: function (target) {
            this.$modal = $(target);
            this.$off = this.$modal.querySelector(".close");
            const mythis = this;
            this.show = function () {
                mask.classList.add("in");
                if (w.innerWidth > 800) {
                    main.classList.add("Mask");
                    menu.classList.add("Mask");
                }
                mythis.$modal.classList.add("ready");
                setTimeout(function () {
                    mythis.$modal.classList.add("in");
                }, 0);
            };
            this.onHide = noop;
            this.hide = function () {
                mythis.onHide();
                mask.classList.remove("in");
                if (w.innerWidth > 800) {
                    main.classList.remove("Mask");
                    menu.classList.remove("Mask");
                    const myimg = d.querySelector(".imgShow");
                    if (myimg) {
                        document.body.removeChild(myimg);
                    }
                }

                mythis.$modal.classList.remove("in");
                setTimeout(function () {
                    mythis.$modal.classList.remove("ready");
                }, 300);
            };
            this.toggle = function () {
                return mythis.$modal.classList.contains("in") ? mythis.hide() : mythis.show();
            };
            Blog.hideOnMask.push(this.hide);
            if (this.$off) {
                this.$off.addEventListener(even, this.hide);
            }
        },
        share: function () {
            const pageShare = $("#pageShare"),
                fab = $("#shareFab"),
                shareModal = new this.modal("#globalShare");
            if (fab) {
                fab.addEventListener(even, function () {
                    pageShare.classList.toggle("in");
                }, false);
                d.addEventListener(even, function (e) {
                    if (!fab.contains(e.target)) {
                        pageShare.classList.remove("in");
                    }
                }, false);
            }
            const wxModal = new this.modal("#wxShare");
            wxModal.onHide = shareModal.hide;
            forEach.call($$(".wxFab"), function (el) {
                el.addEventListener(even, wxModal.toggle);
            });
        },
        reward: function () {
            const modal = new this.modal("#reward");
            const $rewardCode = $("#rewardCode");
            const $rewardToggle = $("#rewardToggle");
            let tipFirstt = false,tipPosition = -1;
            const wechatPay = $(".wechatPay");
            const alipayPay = $(".alipayPay");
            const caret = $(".icon-caret-up");
            $("#rewardBtn").addEventListener(even, function () {
                if (tipPosition === -1){
                    $rewardCode.src = $rewardCode.dataset.img;
                } else if (tipPosition === 1){
                    $rewardCode.src = $rewardToggle.dataset.alipay;
                } else if (tipPosition === 0){
                    $rewardCode.src = $rewardToggle.dataset.wechat;
                }
                modal.toggle();
            });

            wechatPay.addEventListener("click", function () {
                tipFirstt = true;
            });
            if ($rewardToggle) {
                $rewardToggle.addEventListener("change", function () {
                    if (!this.checked) {
                        $rewardCode.src = this.dataset.alipay;
                        alipayPay.classList.add("show");
                        wechatPay.classList.remove("show");
                        caret.style = "margin-left:20%;";
                        tipPosition = 1;
                    } else if (!tipFirstt) {
                        $rewardCode.src = this.dataset.alipay;
                        alipayPay.classList.add("show");
                        wechatPay.classList.remove("show");
                        caret.style = "margin-left:20%;";
                        this.checked = false;
                        tipPosition = 1;
                    } else {
                        $rewardCode.src = this.dataset.wechat;
                        alipayPay.classList.remove("show");
                        wechatPay.classList.add("show");
                        caret.style = "margin-left:-20%;";
                        tipPosition = 0;
                    }
                });
            }
        },
        tabBar: function (el) {
            el.parentNode.parentNode.classList.toggle("expand");
        },
        page: (function () {
            const $elements = $$(".fade, .fade-scale");
            let visible = false;
            return {
                loaded: function () {
                    forEach.call($elements, function (el) {
                        el.classList.add("in");
                    });
                    visible = true;
                },
                unload: function () {
                    forEach.call($elements, function (el) {
                        el.classList.remove("in");
                    });
                    visible = false;
                },
                visible: visible
            };
        }()),
        lightbox: (function () {
            function LightBox(element) {
                this.$img = element.querySelector("img");
                this.$overlay = element.querySelector("overlay");
                this.margin = 40;
                this.title = this.$img.title || this.$img.alt || "";
                this.isZoom = false;
                let naturalW, naturalH, imgRect, docW, docH;
                this.calcRect = function () {
                    docW = body.clientWidth;
                    docH = body.clientHeight;
                    const inH = docH - this.margin * 2;
                    let ww = naturalW;
                    let h = naturalH;
                    const t = this.margin;
                    const l = 0;
                    const sw = ww > docW ? docW / ww : 1;
                    const sh = h > inH ? inH / h : 1;
                    const s = Math.min(sw, sh);
                    ww = ww * s;
                    h = h * s;
                    return {
                        w: ww,
                        h: h,
                        t: (docH - h) / 2 - imgRect.top,
                        l: (docW - ww) / 2 - imgRect.left + this.$img.offsetLeft
                    };
                };
                this.setImgRect = function (rect) {
                    this.$img.style.cssText = `width: ${ rect.w }px; max-width: ${ rect.w }px; height:${ rect.h }px; top: ${ rect.t }px; left: ${ rect.l }px`;
                };
                this.setFrom = function () {
                    this.setImgRect({
                        w: imgRect.width,
                        h: imgRect.height,
                        t: 0,
                        l: (element.offsetWidth - imgRect.width) / 2
                    });
                };
                this.setTo = function () {
                    this.setImgRect(this.calcRect());
                };
                this.addTitle = function () {
                    if (!this.title) {
                        return;
                    }
                    this.$caption = d.createElement("div");
                    this.$caption.innerHTML = this.title;
                    this.$caption.className = "overlay-title";
                    element.appendChild(this.$caption);
                };
                this.removeTitle = function () {
                    if (this.$caption) {
                        element.removeChild(this.$caption);
                    }
                };
                const mythis = this;
                this.zoomIn = function () {
                    naturalW = this.$img.naturalWidth || this.$img.width;
                    naturalH = this.$img.naturalHeight || this.$img.height;
                    imgRect = this.$img.getBoundingClientRect();
                    element.style.height = `${imgRect.height }px`;
                    element.classList.add("ready");
                    this.setFrom();
                    this.addTitle();
                    this.$img.classList.add("zoom-in");
                    setTimeout(function () {
                        element.classList.add("active");
                        mythis.setTo();
                        mythis.isZoom = true;
                    }, 0);
                };
                this.zoomOut = function () {
                    this.isZoom = false;
                    element.classList.remove("active");
                    this.$img.classList.add("zoom-in");
                    this.setFrom();
                    setTimeout(function () {
                        mythis.$img.classList.remove("zoom-in");
                        mythis.$img.style.cssText = "";
                        mythis.removeTitle();
                        element.classList.remove("ready");
                        element.removeAttribute("style");
                    }, 300);
                };
                element.addEventListener("click", function (e) {
                    if (mythis.isZoom) {
                        mythis.zoomOut();
                    } else if (e.target.tagName === "IMG") {
                        mythis.zoomIn();
                    }
                });
                d.addEventListener("scroll", function () {
                    if (mythis.isZoom) {
                        mythis.zoomOut();
                    }
                });
                w.addEventListener("resize", function () {
                    if (mythis.isZoom) {
                        mythis.zoomOut();
                    }
                });
            }
            forEach.call($$(".img-lightbox"), function (el) {
                new LightBox(el);
            });
        }()),
        loadScript: function (scripts) {
            scripts.forEach(function (src) {
                const s = d.createElement("script");
                s.src = src;
                s.async = true;
                body.appendChild(s);
            });
        }
    };
    /* 页面加载第二个执行的事件 */
    w.addEventListener("load", function () {
        loading.classList.remove("active");
        Blog.page.loaded();
        if (w.lazyScripts && w.lazyScripts.length) {
            Blog.loadScript(w.lazyScripts);
        }
    });
    /* 页面加载第一个执行的事件 */
    w.addEventListener("DOMContentLoaded", function () {
        const top = docEl.scrollTop;
        Blog.toc.fixed(top);
        Blog.toc.actived(top);
        Blog.page.loaded();
    });
    /* 打开邮箱时，不触发关闭页面事件 */
    let ignoreUnload = false;
    const $mailTarget = $("a[href^=\"mailto\"]");
    if ($mailTarget) {
        $mailTarget.addEventListener(even, function () {
            ignoreUnload = true;
        });
    }
    /* 页面关闭 刷新事件 */
    w.addEventListener("beforeunload", function () {
        if (!ignoreUnload) {
            Blog.page.unload();
        } else {
            ignoreUnload = false;
        }
    });
    /* 页面加载第三个执行的事件 */
    w.addEventListener("pageshow", function () {
        if (!Blog.page.visible) {
            Blog.page.loaded();
        }
    });
    /* 调整窗口大小时，自动 */
    w.addEventListener("resize", function () {
        even = "ontouchstart" in w ? "touchstart" : "click";
        w.BLOG.even = even;
        Blog.toggleMenu();
    });
    gotop.addEventListener(even, function () {
        animate(Blog.goTop.bind(Blog, 0));
    }, false);
    menuToggle.addEventListener(even, function (e) {
        Blog.toggleMenu(true);
        e.preventDefault();
    }, false);
    menuOff.addEventListener(even, function () {
        menu.classList.add("hide");
        if (!isPost) {
            main.classList.add("menuoff");
            jQuery(title).animate({
                marginRight: "-3%"
            });
        }
    }, false);
    mask.addEventListener(even, function (e) {
        Blog.toggleMenu();
        Blog.hideOnMask.forEach(function (hide) {
            hide();
        });
        e.preventDefault();
    }, false);
    d.addEventListener("scroll", function () {
        const top = docEl.scrollTop;
        Blog.toggleGotop(top);
        Blog.fixedHeader(top);
        Blog.toc.fixed(top);
        Blog.toc.actived(top);
    }, false);
    if (w.BLOG.SHARE && isPost) {
        Blog.share();
    }
    if (w.BLOG.REWARD) {
        Blog.reward();
    }
    Blog.noop = noop;
    Blog.even = even;
    Blog.$ = $;
    Blog.$$ = $$;
    Object.keys(Blog).reduce(function (g, e) {
        g[e] = Blog[e];
        return g;
    }, w.BLOG);

    if (w.Waves) {
        Waves.init();
        Waves.attach(".global-share li", ["waves-block"]);
        Waves.attach(".article-tag-list-link, #page-nav a, #page-nav span", ["waves-button"]);
    } else {
        console.error("Waves loading failed.");
    }

}(window, document));

/*search*/
(function () {

    const G = window || this,
        even = G.BLOG.even,
        $ = G.BLOG.$,
        searchIco = $("#search"),
        searchWrap = $("#search-wrap"),
        keyInput = $("#key"),
        back = $("#back"),
        searchPanel = $("#search-panel"),
        searchResult = $("#search-result"),
        searchTpl = $("#search-tpl").innerHTML,
        JSON_DATA = `${G.BLOG.ROOT }/content.json`.replace(/\/{2}/g, "/");
    let searchData;

    function loadData(success) {

        if (!searchData) {
            const xhr = new XMLHttpRequest();

            xhr.open("GET", JSON_DATA, true);

            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {


                    const res = JSON.parse(this.response);


                    searchData = res instanceof Array ? res : res.posts;


                    success(searchData);
                } else {
                    console.error(this.statusText);
                }
            };

            xhr.onerror = function () {
                console.error(this.statusText);
            };

            xhr.send();

        } else {
            success(searchData);
        }
    }

    function tpl(html, data) {
        return html.replace(/\{\w+\}/g, function (str) {
            const prop = str.replace(/\{|\}/g, "");
            return data[prop] || "";
        });
    }

    const root = $("html");

    const Control = {
        show: function () {
            if (G.innerWidth < 760) {
                root.classList.add("lock-size");
            }
            searchPanel.classList.add("in");
        },
        hide: function () {
            if (G.innerWidth < 760) {
                root.classList.remove("lock-size");
            }
            searchPanel.classList.remove("in");
        }
    };

    function render(data) {
        let html = "";
        if (data.length) {

            html = data.map(function (post) {

                return tpl(searchTpl, {
                    title: post.title,
                    path: `${G.BLOG.ROOT }/${ post.path}`.replace(/\/{2,}/g, "/"),
                    date: new Date(post.date).toLocaleDateString(),
                    tags: post.tags.map(function (tag) {
                        return `<span>#${ tag.name }</span>`;
                    }).join("")
                });

            }).join("");

        } else {
            html = "<li class=\"tips\"><i class=\"icon icon-coffee icon-3x\"></i><p>Results not found!</p></li>";
        }

        searchResult.innerHTML = html;
    }

    function regtest(raw, regExp) {
        regExp.lastIndex = 0;
        return regExp.test(raw);
    }

    function matcher(post, regExp) {
        return regtest(post.title, regExp) || post.tags.some(function (tag) {
            return regtest(tag.name, regExp);
        }) || regtest(post.text, regExp);
    }

    function search(e) {
        const key = this.value.trim();
        if (!key) {
            return;
        }

        const regExp = new RegExp(key.replace(/[ ]/g, "|"), "gmi");

        loadData(function (data) {
            const result = data.filter(function (post) {
                return matcher(post, regExp);
            });

            render(result);
            Control.show();
        });

        e.preventDefault();
    }


    searchIco.addEventListener(even, function () {
        searchWrap.classList.toggle("in");
        keyInput.value = "";
        if (searchWrap.classList.contains("in")) {
            keyInput.focus();
        } else {
            keyInput.blur();
        }
    });

    back.addEventListener(even, function () {
        searchWrap.classList.remove("in");
        Control.hide();
    });

    document.addEventListener(even, function (e) {
        if (e.target.id !== "key" && even === "click") {
            Control.hide();
        }
    });

    keyInput.addEventListener("input", search);
    keyInput.addEventListener(even, search);

}).call(this);
