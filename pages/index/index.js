var api = require('../../utils/api.js');
var app = getApp();
var a = getApp(),
  t = require("../../utils/request"),
  e = require("../../utils/globalData"),
  s = require("../../utils/utils"),
  n = null;

Page({
  data: {
    imgsrc: e.imgsrc,
    banners: null,
    matches: {},
    userData: {},
    showAuthorize: !0,
    isLoad: !1,
    network: !1,
    refreshData: !1,
    loadFinish: !1,
    page: 1,
    status: 1,

    //cmf数据
       systemInfo: {},
    _api: {},
    list: [],
    banner: [],
    total: 0,
    loadingMore: false,
    noMoreData: false,
    searchInputShowed: false,
    searchInputVal: "",
    searchingResult: false,
    searchKeyword: "",
    autoplay: true,
    interval: 5000,
  },
  onLoad: function(a) {
   api.login();
    n = this;
   
  },
  onShow: function() {
    this.pullUpLoad();
    console.log(
      "index.show---\x3e",
      this.data.matches,
      a.appData.isFirstGetMatches
    );
    var t = ["userData", "userInfo", "showAuthorize"];
    a.onPageActived(this, t),
      a.appData.isFirstGetMatches &&
        "" != a.appData.userData.token &&
        (this.getMatches(1), this.getBanners());
  },

  handleUserInfo: function(t) {
    a.handleUserInfo(t);
  },
  /**
 * 上拉刷新
 */
  pullUpLoad() {
    console.log('ok');
    if (this.data.loadingMore || this.data.noMoreData) return;
    this.setData({
      loadingMore: true
    });
    wx.showNavigationBarLoading();

    api.get({
      url: 'portal/articles',
      data: {
        page: this.currentPageNumber,
        
        order: '-published_time'
      },
      success: data => {
        let newItems = api.updatePageList('id', data.data.list, this.formatListItem);
        console.log(newItems);
        console.log(Date.parse(new Date()))
        var timestamp = parseInt(new Date().getTime() / 1000);

        //遍历数组
        for (var i = 0; i < newItems.length; i++) {

          // console.log("第一种遍历方式\t" + newItems[i]['status']);
          // newItems[i]['status']=3;
          // let start_time = newItems[i]['start_time'].getTime()
          // console.log(start_time);
          var end_time = newItems[i]['two_time'];
          var start_time = newItems[i]['one_time'];
          //结束的
          if (timestamp > end_time) {
            newItems[i]['status'] = 1;
          }
          //还没参加的
          if (timestamp < start_time) {
            newItems[i]['status'] = 1

          }
          if (timestamp > start_time && timestamp < end_time) {
            newItems[i]['status'] = 2

          }

        }
        //时间的改变





        this.setData({
          list: newItems
        });
        if (data.data.list.length > 0) {
          this.currentPageNumber++;
        } else {
          this.setData({
            noMoreData: true
          });

          // 没有数据
          // this.setData({
          //     noMoreData: true,
          //     noData: true
          // });
        }
      },
      complete: () => {
        this.setData({
          loadingMore: false
        });
        wx.hideNavigationBarLoading();
      }
    });
    // console
  },
  restartNetwork: function() {
    wx.showLoading({
      title: "加载中"
    }),
      this.onPullDownRefresh();
  },
  onPullDownRefresh: function() {
    this.setData({
      refreshData: !0,
      page: 1
    }),
      this.getMatches(1),
      this.getBanners();
  },
  onReachBottom: function() {
    if (n.loadFinish && n.data.hasMore) {
      n.loadFinish = !1;
      var a = n.data.page + 1,
        t = n.data.matches;
      n.getMatches(a, t);
    }
  },
  onShareAppMessage: function(t) {
    return a.shareMessage();
  },
  getBanners: function() {
    var e = {
      token: a.appData.userData.token
    };
    t.getBanners(
      e,
      function(a) {
        a.data &&
          a.data.banner &&
          n.setData({
            banners: a.data.banner
          });
      },
      function() {}
    );
  },
  getMatches: function(e) {
    var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    this.setData({
      isLoad: !0
    });
    var i = {
      page: (e = e || 1),
      size: 5,
      token: a.appData.userData.token,
      channel: a.appData.pid,
      match_type: 1
    };
    t.getMatches(
      i,
      function(t) {
        var i = !1,
          r = [];
        if (t.data && t.data.data.rows) {
          (i = t.data.data.hasMore), (r = t.data.data.rows);
          for (var h = 0; h < r.length; h++)
            (r[h].name = s.cutString(r[h].name, 12)),
              (r[h].timeStr = s.timeToString(
                r[h].match_start_time
                  .replace(/-/g, "/")
                  .replace(/T/g, " ")
                  .slice(0, 19)
              ));
          a.appData.isFirstGetMatches = !1;
        }
        if ("" == o)
          n.setData({
            matches: r,
            hasMore: i,
            page: e
          });
        else {
          for (var c = 0; c < r.length; c++) o.push(r[c]);
          n.setData({
            matches: o,
            hasMore: i,
            page: e
          });
        }
        (n.loadFinish = !0),
          n.setData({
            refreshData: !1,
            network: !1,
            isLoad: !1
          }),
          wx.hideLoading(),
          wx.stopPullDownRefresh();
      },
      function() {
        n.setData({
          refreshData: !1,
          network: !0,
          isLoad: !1
        }),
          wx.hideLoading(),
          wx.stopPullDownRefresh();
      }
    );
  },
  onMatchDetails: function(a) {
    var t = a.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/matchDetails/matchDetails?id=" + t
    });
  },
  onJoinMatch: function(e) {
    var s = e.currentTarget.dataset.id,
      n = {
        id: s,
        token: a.appData.userData.token
      };
    t.joinMatch(
      n,
      function(t) {
        console.log("onJoinMatch---\x3e", t),
          (a.appData.isFirstGetMatches = !0),
          a.updateUserData(t.data.data),
          wx.navigateTo({
            url: "/pages/matchDetails/matchDetails?id=" + s
          });
      },
      function(a) {
        console.log("onJoinMatch---\x3efail"),
          wx.showToast({
            title: a.data.msg,
            icon: "none"
          });
      }
    );
  },
  onGetMatchRecord: function(a) {
    console.log("onGetMatchRecord");
    var t = a.currentTarget.dataset.urls;
    t && t.length > 0
      ? wx.previewImage({
          urls: t
        })
      : wx.showToast({
          title: "暂无记录",
          icon: "none"
        });
  }
});
