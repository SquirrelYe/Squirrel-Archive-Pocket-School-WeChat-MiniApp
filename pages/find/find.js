const app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function (options) {
    // 查看是否授权
    // wx.getSetting({
    //   success: function (res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log(res.userInfo)
    //         }
    //       })
    //     }
    //   }
    // })
    wx.showToast({
      title: '风继续吹<_> 期待ing……',
      icon: 'none',
      duration: 1000
    });
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo);
  },

  primary: function () {
    //上传用户openid到服务器
    // wx.request({
    //   url: 'https://www.yexuan.site/Logistics_yx/users',
    //   data: {
    //     judge:'3',
    //     openid: app.globalData.openid,
    //     name: app.globalData.userInfo.nickName,
    //      icon_url: app.globalData.userInfo.avatarUrl,
    //      age: '20',
    //      love:'0',
    //      birthday:'1998-06-28',
    //      city: app.globalData.userInfo.province,
    //      sign:'原来我一直为你停留，甚至忘记了时间。'
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   method: 'GET',
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })
    wx.request({
      url: 'https://www.yexuan.site/Logistics_yx/users',
      data: {
        judge: '0',
        openid: app.globalData.openid //'oIWqt4rv8LnPDduNsUJNgStvnysI',
        // name: app.globalData.userInfo.nickName,
        // icon_url: app.globalData.userInfo.avatarUrl,
        // age: '20',
        // love: '0',
        // birthday: '1998-06-28',
        // city: app.globalData.userInfo.province,
        // sign: '原来我一直为你停留，甚至忘记了时间。'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
      }
    });
  }
});
