const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nick: 'yexuan',
    justnow: 'hello',
    time: '04-21 12:12',
    sum: 3,
    ceshi: '',
    message: [
      {
        openid: 'oIWqt4iGk5GNc_H_JKf3REtjDmMs',
        nick: 'yexuan',
        time: '04-21 12:12',
        justnow: 'hello',
        noread: 3,
        icon: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJLvDauOxz0icWPgpFju1mFwqZ3Rf0X1gicanO0syyx3Zw0YyRPk2BPaIHmtPOhJ8sByapD38vHibDcA/0'
      },
      { openid: 'oIWqt4rv8LnPDduNsUJNgStvnysI', nick: 'jiayiwen', time: '04-21 12:12', justnow: 'world', noread: 6, icon: 'http://n1.itc.cn/img8/wb/recom/2016/07/30/146987357197765301.JPEG' }
    ],
    openid_me: '',
    me: ''
  },

  send: function (res) {
    //console.log(res)
    var index = parseInt(res.currentTarget.dataset.index);
    var openid = this.data.message[index].openid;
    console.log('重定向于---->' + openid);
    wx.navigateTo({
      url: '../message/message?openid=' + openid
    });
  },

  message: function () {
    wx.navigateTo({
      url: '../message/message'
    });
  },

  ceshi: function (e) {
    console.log(e);
    this.setData({ ceshi: e.detail.value });
  },

  ceshi1: function () {
    wx.navigateTo({
      url: '../message/message?openid=' + this.data.ceshi
    });
  },

  onLoad: function () {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //为了防止多开socket线程，此处先行关闭。
    // wx.closeSocket({
    // })
    var that = this;
    console.log('websocket-主体-前台开启中……');
    //链接主体websocket，刷新列表
    this.setData({
      openid_me: app.globalData.openid,
      me: app.globalData.userInfo
    });
    var userno = this.data.openid_me + '_1';

    wx.connectSocket({
      url: 'wss://www.yexuan.site/WebSocket2/websocket/' + userno
    });
    wx.onSocketOpen(function (res) {
      console.log('WebSocket-主体-连接已在前台开启，处在监听状态！');
    });
    wx.onSocketError(function (res) {
      console.log('WebSocket-主体-连接打开失败，请检查！');
    });
    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：' + res.data);
      var message_1 = res.data.split('|');
      //追加到数组
      var newarray = [
        {
          openid: message_1[1],
          nick: message_1[2],
          time: message_1[3],
          justnow: message_1[4],
          noread: message_1[5],
          icon: message_1[6]
        }
      ];
      //数据绑定
      that.setData({
        message: that.data.message.concat(newarray)
      });
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //为了防止多开socket线程，此处先行关闭。
    wx.closeSocket({});
    console.log('websocket-主体-已关闭');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});
