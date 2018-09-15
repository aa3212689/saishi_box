function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}
123

var t = require("./utils/request"), e = require("./utils/config"), n = require("./utils/wxAPI"), i = null;

App({
    appData: {
        pid: 0,
        inviter: "",
        userData: {
            gold: 0,
            matchTiket: 0,
            openid: "",
            accountId: 0,
            token: "",
            phone: ""
        },
        userInfo: {},
        nowActivityData: {},
        activePage: null,
        showAuthorize: !1,
        isSetUserInfo: !1,
        isFirstGetMatches: !0
    },
    onLaunch: function(a) {
        i = this;
        var e = a.query.hasOwnProperty("pid") ? a.query.pid : 0;
        this.appData.pid = e, this.appData.inviter = a.query.hasOwnProperty("inviter") ? a.query.inviter : "", 
        wx.showShareMenu({
            withShareTicket: !0
        }), 
        t.reqLaunch(this.appData.pid), 
        this.login(),
         this.checkAuthSetting();
    },
    onShow: function() {
        this.appData.isFirstGetMatches = !0;
    },
    shareMessage: function() {
        var a = Math.round(Math.random() * (e.shareData.length - 1)), t = i.appData.userData ? i.appData.userData.openid : "";
        return {
            title: e.shareData[a].shareDesc,
            path: "/pages/index/index?inviter=" + t,
            imageUrl: e.shareData[a].shareImg,
            success: function(a) {
                console.log("转发成功:" + JSON.stringify(a));
            },
            fail: function(a) {
                console.log("转发失败:" + JSON.stringify(a));
            }
        };
    },
    login: function() {
        n.login(function(a) {
            var s = {
                code: a.code,
                pid: i.appData.pid,
                inviter: i.appData.inviter
            };
            t.reqLogin(s, function(a) {
                a.data && (i.appData.userData = a.data, i.updateUserData(a.data), i.appData.isSetUserInfo || n.getUserInfo(i.getUserInfoCallBack), 
                console.log("res.data.share.length--\x3e", a.data.share), a.data.share && a.data.share.length > 0 && (console.log("res.data.share.length--\x3e", a.data.share), 
                e.shareData = a.data.share), i.appData.activePage && (i.appData.activePage.getBanners && i.appData.activePage.getBanners(), 
                i.appData.activePage.getMatches && i.appData.activePage.getMatches(1)));
            });
        });
    },
    checkAuthSetting: function() {
        if (!wx.canIUse("getSetting")) return !1;
        wx.getSetting({
            success: function(a) {
              console.log(a);
                var t = !(!a.authSetting || !a.authSetting["scope.userInfo"]);
              console.log(t);
                i.appData.showAuthorize = !t, i.sendPage([ "showAuthorize" ]), t && i.appData.userData.token && "" != i.appData.userData.token && n.getUserInfo(i.getUserInfoCallBack);
            },
            fail: function() {
                i.appData.showAuthorize = !0, i.sendPage([ "showAuthorize" ]);
            }
        });
    },
    handleUserInfo: function(a) {
        a.detail.userInfo && (this.appData.showAuthorize = !1, this.sendPage([ "showAuthorize" ]), 
        this.appData.userData.token && "" != this.appData.userData.token && n.getUserInfo(i.getUserInfoCallBack));
    },
    getUserInfoCallBack: function(a) {
        if (a.userInfo) {
            this.appData.userInfo = a.userInfo, this.sendPage([ "userInfo" ]);
            var e = {
                rawData: a.rawData,
                signature: a.signature,
                token: this.appData.userData.token
            };
            t.setUserInfo(e);
        }
    },
    checkNewVersion: function() {
        if (wx.canIUse("getUpdateManager")) {
            var a = wx.getUpdateManager();
            a.onCheckForUpdate(function(t) {
                t.hasUpdate && (a.onUpdateReady(function() {
                    wx.showModal({
                        title: "更新提示",
                        content: "新版本已经准备好，是否重启应用？",
                        success: function(t) {
                            t.confirm && a.applyUpdate();
                        }
                    });
                }), a.onUpdateFailed(function() {
                    wx.showModal({
                        title: "已经有新版本了哟~",
                        content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
                    });
                }));
            });
        } else wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    },
    getUserData: function() {
        var a = this.appData.userData.token;
        t.getUserData(a, function(a) {
            console.log("getUserData--\x3e", a), i.updateUserData(a.data);
        });
    },
    updateUserData: function(a) {
        this.appData.userData.gold = a.gold || this.appData.userData.gold, this.appData.userData.matchTiket = a.matchTiket || this.appData.userData.matchTiket, 
        this.sendPage([ "userData" ]);
    },
    sendPage: function(t) {
        if (this.appData.activePage) for (var e = 0; e < t.length; e++) {
            var n = t[e];
            this.appData.activePage.setData(a({}, n, this.appData[n]));
        }
    },
    onPageActived: function(a, t) {
        this.appData.activePage = a, this.checkNewVersion(), this.sendPage(t);
    },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getSystemInfo: function (cb) {
    var that = this
    if (that.globalData.systemInfo) {
      typeof cb == "function" && cb(that.globalData.systemInfo)
    } else {
      wx.getSystemInfo({
        success: function (res) {
          that.globalData.systemInfo = res
          typeof cb == "function" && cb(that.globalData.systemInfo)
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    systemInfo: null
  },
  pagesData: {},
  pagesNeedUpdate: {},
  stockOutCategories: ["借出", "售出", "领用", "出租", "赠送", "报废", "维修"]
});