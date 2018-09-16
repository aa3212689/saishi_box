var api = require('../../utils/api.js');

var t = getApp(),


  a = require("../../utils/request"),
  e = require("../../utils/utils"),
  n = null,
  o = null;

Page({
  data: {
    status: 1,
    matchDetail: {},
    network: !1,
    id: 0,
    countdown: {
      countDownDay: "0",
      countDownHour: "00",
      countDownMinute: "00",
      countDownSecond: "00"
    },
    consume_type_string: ["", "金币", "比赛券"]
  },
  onLoad: function(t) {
    (n = this), (this.id = t.id), this.getMatchDetail();
    console.log(this.id)
    console.log(123)
    api.get({
      url: 'portal/articles/' + this.id,
      data: {},
      success: data => {
        console.log(data)
      }})

  //   api.get({
      


  //     url: 'portal/articles/' + this.id,
  //     data: {},
  //     success: data => {
  //       console.log(data)
        
  //     }
  // }
  },
  onShow: function() {
    var a = ["userData", "userInfo", "showAuthorize"];
    t.onPageActived(this, a);
  },
  onPullDownRefresh: function() {
    this.getMatchDetail();
  },
  onShareAppMessage: function(a) {
    return t.shareMessage();
  },
  handleUserInfo: function(a) {
    t.handleUserInfo(a);
  },
  restartNetwork: function() {
    wx.showLoading({
      title: "加载中"
    }),
      this.onPullDownRefresh();
  },
  onReachBottom: function() {},
  getMatchDetail: function() {
    var i = {
      token: t.appData.userData.token,
      id: this.id
    };
    a.getMatchDetail(
      i,
      function(t) {
        if (
          (wx.hideLoading(),
          wx.stopPullDownRefresh(),
          clearInterval(o),
          t.data && t.data.data)
        ) {
          var a = new Date(),
            i = t.data.data.matchInfo.status;
          1 == i
            ? (a = new Date(
                t.data.data.matchInfo.match_start_time
                  .replace(/-/g, "/")
                  .replace(/T/g, " ")
                  .slice(0, 19)
              ))
            : 2 == i &&
              (a = new Date(
                t.data.data.matchInfo.match_end_time
                  .replace(/-/g, "/")
                  .replace(/T/g, " ")
                  .slice(0, 19)
              )),
            (t.data.data.matchInfo.name = e.cutString(
              t.data.data.matchInfo.name,
              12
            )),
            n.setData({
              matchDetail: t.data.data,
              network: !1
            });
            //定时器
          var c = new Date().getTime();
          (c = Math.floor((a.getTime() - c) / 1e3)),
            (o = setInterval(
              function() {
                if (c < 0)
                  clearInterval(o),
                    n.setData({
                      countdown: {
                        countDownDay: "0",
                        countDownHour: "00",
                        countDownMinute: "00",
                        countDownSecond: "00"
                      }
                    });
                else {
                  var t = e.countdown(c);
                  n.setData({
                    countdown: t
                  }),
                    c--;
                }
              }.bind(n),
              1e3
            ));
        }
      },
      function() {
        wx.hideLoading(),
          wx.stopPullDownRefresh(),
          n.setData({
            network: !0
          });
      }
    );
  },
  onJoinMatch: function() {
    var e = {
      id: this.id,
      token: t.appData.userData.token
    };
    a.joinMatch(
      e,
      function(a) {
        console.log("onJoinMatch---\x3e", a),
          t.updateUserData(a.data.data),
          n.getMatchDetail();
      },
      function(t) {
        console.log("onJoinMatch---\x3efail"),
          wx.showToast({
            title: t.data.msg,
            icon: "none"
          });
      }
    );
  },
  onGetMatchRecord: function(t) {
    console.log("onGetMatchRecord");
    var a = t.currentTarget.dataset.urls;
    a && a.length > 0
      ? wx.previewImage({
          urls: a
        })
      : wx.showToast({
          title: "暂无记录",
          icon: "none"
        });
  },
  downloadGame: function() {
    wx.showToast({
      title: "请手动下载",
      icon: "none"
    });
  }
});
