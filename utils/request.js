function e(e, t, n, u, o, r) {
    var a = this;
    wx.request({
        url: e,
        data: t,
        method: n ? "GET" : "POST",
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function(t) {
            var n = t.data.code;
            0 == n || 0 == t.data.retcode ? u && u(t) : 601 == n || 600 == n ? (getApp().login(), 
            o && o(t)) : (o && o(t), console.log("request ERROR ", e));
        },
        fail: function() {
            r = r || 0, r++ < -1 ? a.wxRequest(e, t, n, u, o, r) : o && o();
        }
    });
}

var t = require("./config.js");

module.exports = {
    reqLaunch: function(n) {
        e(t.url.launch, {
            rawData: "",
            pid: n
        }, !1);
    },
    reqLogin: function(n, u) {
        e(t.url.login, n, !1, u);
    },
    pdlLogin: function(n) {
        e(t.url.pdlLogin, n, !0);
    },
    setUserInfo: function(n) {
        e(t.url.setUserInfo, n, !1);
    },
    getUserData: function(n, u) {
        e(t.url.getUserData, {
            token: n
        }, !0, u);
    },
    getBanners: function(n, u, o) {
        e(t.url.getBanners, n, !0, u, o);
    },
    getMatches: function(n, u, o) {
        e(t.url.getMatches, n, !0, u, o);
    },
    getMatchDetail: function(n, u, o) {
        e(t.url.getMatchDetail, n, !0, u, o);
    },
    joinMatch: function(n, u, o) {
        e(t.url.joinMatch, n, !0, u, o);
    },
    getUserMatches: function(n, u, o) {
        e(t.url.getUserMatches, n, !0, u, o);
    },
    unreadMsg: function(n, u) {
        e(t.url.unreadMsg, n, !0, u);
    },
    getMsgs: function(n, u, o) {
        e(t.url.getMsgs, n, !0, u, o);
    },
    haveReaded: function(n, u, o) {
        e(t.url.haveReaded, n, !1, u, o);
    },
    getPhone: function(n, u, o) {
        e(t.url.getPhone, n, !1, u, o);
    }
};