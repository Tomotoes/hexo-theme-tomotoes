function elasticText() {
  var args = arguments;
  var EventUtil = {
    e: "",
    gEve: function(event) {
      this.e = event ? event : window.event;
      return this;
    },
    getEvent: function(event) {
      return event ? event : window.event;
    },
    ce: function(e, callback) {
      if(e) {
        return callback(e);
      } else {
        return callback(this.e);
      }
    },
    addHandler: function(ele, type, handler) {
      if(ele.addEventListener) {
        ele.addEventListener(type, handler, false);
      } else if(ele.attachEvent) {
        ele.attachEvent('on' + type, handler);
      } else {
        ele["on" + type] = handler;
      }
    },
    removeHandler: function(ele, type, handler) {
      if(ele.removeEventListener) {
        ele.removeEventListener(type, handler, false);
      } else if(ele.detachEvent) {
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
    if(ac instanceof Array && ac.length > 0) {
      posarr = ac.concat([]);
    }
    if(n.y < m.y) {
      z = 1;
    } else {
      z = -1;
    }
    arr.map(function(item, index, arr) {
      var l = arr.length - 1;
      var hw = l * fs;
      var lw = index * fs + fs / 2;
      var rw = (l - index) * fs + fs / 2;
      if(lw < n.x && n.x > fs / 2) {
        ip = z * (lw / n.x * (n.y - m.y) * z).toFixed(2);
      }
      if(lw > n.x && n.x < hw + fs / 2) {
        ip = z * (rw / (fs * l - n.x + fs / 2) * (n.y - m.y) * z).toFixed(2);
      }
      if(ip != 0 && ip) {
        posarr[index] = ip;
      }
      item.style = "display:inline-block;transform:translateY(" + ip + "px)";
    })
    return posarr;
  }
  var ef = {
    easeOut: function(t, b, c, d, a, p) {
      var s;
      if(t == 0) return b;
      if((t /= d) == 1) return b + c;
      if(typeof p == "undefined") p = d * .3;
      if(!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return -a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + b;
    },
    jump: function(t, b, c, d) {
      c = Math.abs(c);
      if(t & 1) {
        var z = 1;
      } else {
        var z = -1;
      }
      return z * (c - t * (1 / d) * c);
    }
  }

  function back(ac, arr, _this, fs, effact, du) {
    if(ac.length === 0) {
      return
    }
    cancelAnimationFrame(_this.Ani);
    var t = 0;

    function def() {
      if(t == du) {
        cancelAnimationFrame(_this.Ani);
        rolBack(arr);
        return false;
      }
      arr.forEach(function(item, index, arr) {
        var np = ef[effact](t, 0, ac[index], du);
        item.style = "display:inline-block;transform:translateY(" + np + "px)";
      })
      t++;
      _this.Ani = requestAnimationFrame(def);
    }
    def();
  }

  function rolBack(arr) {
    arr.forEach(function(item) {
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
    if(typeof fs !== 'string') {
      fs = fs.toString();
    }
    fs = fs.match(/^\d{2}/)[0];
    var textBox = document.createElement('div');
    textBox.setAttribute('class', 'eBox');

    var frg = document.createDocumentFragment();
    var arr = ct.split('');
    var textarr = [];
    arr.forEach(function(item, val) {
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
    Array.prototype.forEach.call(textBox.children, function(item) {
      item.onselectstart = function() {
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
      if(!mark) {
        return;
      }
      if(Math.abs(m.y - n.y) > h) {
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
      setTimeout(function() {
        EventUtil.addHandler(textBox, 'mouseenter', enter);
        EventUtil.addHandler(textBox, 'mouseleave', leave);
        EventUtil.addHandler(textBox, 'mousemove', move);
      }, 100);
      if(Math.abs(m.y - n.y) < .5 * h && m.y != n.y) {
        rolBack(textarr);
        return false;
      }
      if(!gb) {
        back(ac, textarr, _this, fs, effact, du);
        EventUtil.removeHandler(textBox, 'mousemove', move);
        return false;
      }
      gb = false;
      mark = false;
    }
  }
  Array.prototype.forEach.call(args, function(item) {
    new mFn(item);
  })
}
