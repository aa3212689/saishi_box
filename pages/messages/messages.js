var a = getApp(), e = require("../../utils/request"), s = null;

Page({
    data: {
        userMessages: [],
        isLoad: !1,
        network: !1
    },
    onLoad: function(a) {
        s = this;
    },
    onShow: function() {
        this.onPullDownRefresh();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            refreshData: !0,
            page: 1
        }), this.getMessages();
    },
    onReachBottom: function() {
        if (s.loadFinish && s.data.hasMore) {
            s.loadFinish = !1;
            var a = s.data.page + 1, e = s.data.userMessages;
            s.getMessages(a, e);
        }
    },
    onShareAppMessage: function(e) {
        a.onShareAppMessage();
    },
    restartNetwork: function() {
        wx.showLoading({
            title: "加载中"
        }), this.onPullDownRefresh();
    },
    getMessages: function(t) {
        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
        this.setData({
            isLoad: !0
        }), t = t || 1;
        var n = {
            token: a.appData.userData.token,
            page: t,
            size: 10
        };
        e.getMsgs(n, function(a) {
            var e = !1, n = [];
            if (a.data && a.data.data.rows && (e = a.data.data.hasMore, n = a.data.data.rows), 
            "" == o) s.setData({
                userMessages: n,
                hasMore: e,
                page: t
            }); else {
                for (var r = 0; r < n.length; r++) o.push(n[r]);
                s.setData({
                    userMessages: o,
                    hasMore: e,
                    page: t
                });
            }
            s.loadFinish = !0, s.setData({
                refreshData: !1,
                network: !1,
                isLoad: !1
            }), wx.hideLoading(), wx.stopPullDownRefresh();
        }, function() {
            s.setData({
                refreshData: !1,
                network: !0,
                isLoad: !1
            }), wx.hideLoading(), wx.stopPullDownRefresh();
        });
    },
    readMessage: function(t) {
        var o = t.currentTarget.dataset.id, n = {
            token: a.appData.userData.token,
            ids: o
        };
        e.haveReaded(n, function() {
            s.onPullDownRefresh();
        }, function() {});
    }
});