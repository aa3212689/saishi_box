var a = getApp(), e = require("../../utils/request"), t = require("../../utils/utils"), s = null;

Page({
    data: {
        userMatches: [],
        isLoad: !1,
        network: !1,
        page: 1
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
        }), this.getUserMatches();
    },
    onReachBottom: function() {
        if (s.loadFinish && s.data.hasMore) {
            s.loadFinish = !1;
            var a = s.data.page + 1, e = s.data.userMatches;
            s.getUserMatches(a, e);
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
    getUserMatches: function(o) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
        this.setData({
            isLoad: !0
        });
        var r = {
            size: 5,
            page: o = o || 1,
            token: a.appData.userData.token
        };
        e.getUserMatches(r, function(a) {
            var e = !1, r = [];
            if (a.data && a.data.data.rows) {
                e = a.data.data.hasMore, r = a.data.data.rows;
                for (var i = 0; i < r.length; i++) r[i].name = t.cutString(r[i].name, 12);
            }
            if ("" == n) s.setData({
                userMatches: r,
                hasMore: e,
                page: o
            }); else {
                for (var h = 0; h < r.length; h++) n.push(r[h]);
                s.setData({
                    userMatches: n,
                    hasMore: e,
                    page: o
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
    onMatchDetails: function(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/matchDetails/matchDetails?id=" + e
        });
    },
    onGetMatchRecord: function(a) {
        console.log("onGetMatchRecord");
        var e = a.currentTarget.dataset.urls;
        e && e.length > 0 ? wx.previewImage({
            urls: e
        }) : wx.showToast({
            title: "暂无记录",
            icon: "none"
        });
    }
});