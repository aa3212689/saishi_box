var e = "https://microgame.legaogame.com", t = {
    base: e,
    launch: e + "/tracking/launch",
    login: e + "/auth/login",
    setUserInfo: e + "/account/setWechatUserInfo",
    getUserData: e + "/account/getUserInfo",
    getBanners: e + "/match/getBanners",
    getMatches: e + "/match/getMatches",
    getMatchDetail: e + "/match/getMatcheDetail",
    joinMatch: e + "/match/joinMatch",
    getUserMatches: e + "/match/getUserMatches",
    unreadMsg: e + "/match/unreadMsg",
    getMsgs: e + "/match/getMsgs",
    haveReaded: e + "/match/haveReaded",
    getPhone: e + "/account/getPhone"
}, a = [ {
    id: 0,
    shareDesc: "想赚点零花钱？来掌上微赛事报名参加比赛吧!",
    shareImg: ""
} ];

module.exports = {
    url: t,
    shareData: a
};