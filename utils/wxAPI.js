module.exports = {
    login: function(n, o) {
        var e = this;
        o || (o = 0), wx.login({
            success: function(o) {
                n && n(o);
            },
            fail: function() {
                o++ < 3 && e.login(n, o);
            }
        });
    },
    getUserInfo: function(n) {
        wx.getUserInfo({
            withCredentials: !0,
            success: function(o) {
                console.log("wxGetUserInfo---\x3e", o), n && n(o);
            },
            fail: function(n) {
                console.log("wx.getUserInfo.fail---\x3e", n);
            }
        });
    }
};