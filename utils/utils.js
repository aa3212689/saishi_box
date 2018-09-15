var t =
  "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          "function" == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? "symbol"
          : typeof t;
      };

module.exports = {
  timestemp: function() {
    return Date.parse(new Date()) / 1e3;
  },
  isNull: function(t) {
    return (
      "[object Undefined]" === Object.prototype.toString.call(t) ||
      ("[object String]" === Object.prototype.toString.call(t)
        ? 0 == t.length || "null" == t || "undefined" == t
        : "[object Array]" === Object.prototype.toString.call(t)
          ? 0 == t.length
          : "[object Object]" !== Object.prototype.toString.call(t) ||
            "{}" == JSON.stringify(t))
    );
  },
  urlEncode: function n(e, o, r) {
    if (null == e) return "";
    var i = "",
      u = void 0 === e ? "undefined" : t(e);
    if ("string" == u || "number" == u || "boolean" == u)
      i += o + "=" + (null == r || r ? encodeURIComponent(e) : e) + "&";
    else
      for (var c in e) {
        var l =
          null == o ? c : o + (e instanceof Array ? "[" + c + "]" : "." + c);
        i += n(e[c], l, r);
      }
    return i;
  },
  urlDecode: function(t, n) {
    var e,
      o,
      r = {},
      i = t.split("&"),
      u = decodeURIComponent;
    for (var c in i) (e = u((c = c.split("="))[0])), (o = u(c[1])), (r[e] = o);
    return r;
  },
  objKeySort: function(t) {
    for (var n = Object.keys(t).sort(), e = {}, o = 0; o < n.length; o++)
      e[n[o]] = t[n[o]];
    return e;
  },
  showToast: function(t, n, e, o) {
    wx.showToast({
      title: t || "提示",
      icon: e || "none",
      duration: n || 3e3,
      mask: !0,
      complete: function() {
        "function" == typeof o &&
          setTimeout(function() {
            o();
          }, n || 3e3);
      }
    });
  },
  promiseHandler: function(t, n) {
    return (
      (n = n || {}),
      new Promise(function(e, o) {
        "function" != typeof t && o(), (n.success = e), (n.fail = o), t(n);
      })
    );
  },
  cutString: function(t, n) {
    if ((n || (n = 10), t.replace(/[^\u0000-\u00ff]/g, "aa").length <= n))
      return t;
    for (var e = 0, o = "", r = 0; r <= n - 2; e++) {
      var i = t[e].replace(/[^\u0000-\u00ff]/g, "aa").length;
      if (r + i > n - 2) return o + "...";
      (o += t[e]), (r += i);
    }
  },
  countdown: function(t) {
    var n = Math.floor(t / 3600 / 24),
      e = n.toString(),
      o = Math.floor((t - 3600 * n * 24) / 3600),
      r = o.toString();
    1 == r.length && (r = "0" + r);
    var i = Math.floor((t - 3600 * n * 24 - 3600 * o) / 60),
      u = i.toString();
    1 == u.length && (u = "0" + u);
    var c = Math.floor(t - 3600 * n * 24 - 3600 * o - 60 * i).toString();
    return (
      1 == c.length && (c = "0" + c),
      {
        countDownDay: e,
        countDownHour: r,
        countDownMinute: u,
        countDownSecond: c
      }
    );
  },
  dateToString: function(t) {
    var n = "",
      e = t.getHours().toString();
    1 == e.length && (e = "0" + e);
    var o = t.getMinutes().toString();
    1 == o.length && (o = "0" + o);
    var r = t.getSeconds().toString();
    return (
      1 == r.length && (r = "0" + r),
      (n += t.getFullYear() + "/"),
      (n += t.getMonth() + 1 + "/"),
      (n += t.getDate() + "  "),
      (n += e + ":"),
      (n += o + ":"),
      (n += r)
    );
  },
  timeToString: function(t) {
    var n = new Date(t),
      e = new Date(),
      o = n.getTime() - e.getTime();
    return o <= 0
      ? "比赛已经开始"
      : o < 864e5 && n.getDate() == e.getDate()
        ? "今日" + n.getHours() + "点开赛"
        : n.getMonth() + 1 + "月" + n.getDate() + "日开赛";
  }
};
