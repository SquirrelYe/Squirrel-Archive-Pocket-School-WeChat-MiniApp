App({
  globalData: {
    userInfo: null,
    openid: '',
    unionid: null,
    session_key: null,
    access_token: '',

    url: 'https://www.yexuan.site/logistics',
    url1: 'http://localhost:11111', //测试接口

    rz_type: '-1',
    authenticate: '',
    selectSchool: ''
  },

  onLaunch: function () {
    var that = this;
    that.init_userinfo();
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log('JS_CODE\t------>\t' + res.code);
          that.getOpenid(res);
          that.getAccessTaken();
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      }
    });
  },

  getOpenid: function (res) {
    var that = this;
    wx.request({
      //获取openid接口
      url: `${that.globalData.url}/wx_api`,
      data: {
        judge: '0',
        appid: 'wx755d37a92190903e',
        secret: 'fe91a08b40b57a9b8bdfdc6485d90b49',
        js_code: res.code,
        grant_type: 'authorization_code'
      },
      success: function (res) {
        console.log(res.data);
        var OPEN_ID = res.data.openid;
        var SESSION_KEY = res.data.session_key;
        var UNION_ID = '';

        that.globalData.openid = OPEN_ID;
        that.globalData.unionid = UNION_ID;
        that.globalData.session_key = SESSION_KEY;

        console.log('OPEN_ID\t------>\t' + OPEN_ID);
        console.log('SESSION_KEY\t------>\t' + SESSION_KEY);

        that.rz();
        that.selectSchool();
      },
      fail: function (res) {
        console.log(res.data);
      }
    });
  },

  getAccessTaken: function () {
    var that = this;
    wx.request({
      //获取access_taken接口
      url: `${that.globalData.url}/wx_api`,
      data: {
        judge: '1',
        appid: 'wx755d37a92190903e',
        secret: 'fe91a08b40b57a9b8bdfdc6485d90b49'
      },
      success: function (res) {
        console.log(res.data);
        that.globalData.access_token = res.data.access_token;
      },
      fail: function (res) {
        console.log(res.data);
      }
    });
  },

  rz: function () {
    var that = this;
    wx.request({
      url: `${that.globalData.url}/authen`,
      data: {
        judge: 1,
        openid: that.globalData.openid
      },
      success: function (res) {
        console.log('认证信息--->', res.data);
        if (res.data.length == 0) {
          that.globalData.rz_type = -2;
        } else {
          (that.globalData.rz_type = res.data[0].type), (that.globalData.authenticate = res.data);
        }
      },
      fail: function (res) {
        console.error('认证信息', res.data);
      }
    });
  },

  getuserinfo: function (res) {
    //获取用户信息
    var that = this;
    that.globalData.userInfo = res;
    console.log('获得相关信息-->', that.globalData.userInfo.nickName);
  },

  selectSchool: function () {
    var that = this;
    wx.request({
      url: `${that.globalData.url}/users?judge=3`,
      data: {
        openid: that.globalData.openid
      },
      success: function (res) {
        that.globalData.selectSchool = res.data[0].school;
        console.log('school-->', res.data[0].school);
      }
    });
  },

  init_userinfo: function () {
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
        } else {
          wx.getUserInfo({
            success: function (res) {
              that.getuserinfo(res.userInfo);
            }
          });
        }
      }
    });
  }
});
