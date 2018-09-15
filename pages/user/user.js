var e = getApp(), a = require("../../utils/request"), t = null;

Page({
    data: {
        unreadMsg: !1
    },
    onLoad: function() {
        t = this;
    },
    onShow: function() {
        var a = [ "userData", "userInfo", "showAuthorize" ];
        e.onPageActived(this, a), t.unreadMsg();
    },
    handleUserInfo: function(a) {
        e.handleUserInfo(a);
    },
    restartNetwork: function() {
        wx.showLoading({
            title: "加载中"
        });
    },
    onShareAppMessage: function(a) {
        return e.shareMessage();
    },
    unreadMsg: function() {
        var n = {
            token: e.appData.userData.token
        };
        a.unreadMsg(n, function(e) {
            t.setData({
                unreadMsg: e.data.unread
            });
        });
    },
    getUserMatches: function() {
        wx.navigateTo({
            url: "/pages/userMatches/userMatches"
        });
    },
    getMsgs: function() {
        wx.navigateTo({
            url: "/pages/messages/messages"
        });
    },
    getPhoneNumber: function(n) {
        "" + n.detail.iv == "undefined" || wx.login({
            success: function(s) {
                var o = {
                    token: e.appData.userData.token,
                    iv: n.detail.iv,
                    encypData: n.detail.encryptedData,
                    code: s.code
                };
                a.getPhone(o, function(a) {
                    var n = a.data.phone;
                    e.appData.userData.phone = n, t.setData({
                        userData: e.appData.userData
                    });
                }, function(e) {
                    console.log("getPhoneNumber---\x3e", e);
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "授权失败",
                    icon: "loading",
                    duration: 1500
                });
            }
        });
    }
});