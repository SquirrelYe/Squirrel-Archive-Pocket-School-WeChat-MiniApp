// pages/buy/xiadan/xiadan.js
var util = require('../../../utils/util.js');
const app = getApp();

Page({
  data: {
    title: '快递',
    color: '#000000',

    // 物流信息
    type: null,
    money: 3,
    details: null,
    log_from: null,
    log_to: null,
    time_now: null,
    time_log: null,
    conditions: '1',

    // 用户信息
    icon_url: null,
    nickname: null,
    gander: null,
    location: null,

    // 保密信息
    key_info: null,
    key_name: null,
    key_phone: null
  },

  d1: function (e) {
    this.setData({
      key_info: e.detail.value
    });
  },
  d2: function (e) {
    this.setData({
      details: e.detail.value
    });
  },
  d3: function (e) {
    this.setData({
      log_from: e.detail.value
    });
  },
  d4: function (e) {
    this.setData({
      key_name: e.detail.value
    });
  },
  d5: function (e) {
    this.setData({
      key_phone: e.detail.value
    });
  },
  d6: function (e) {
    this.setData({
      log_to: e.detail.value
    });
  },
  d7: function (e) {
    this.setData({
      time_log: e.detail.value
    });
  },

  buy: function () {
    this.setData({
      icon_url: app.globalData.userInfo.avatarUrl,
      nickname: app.globalData.userInfo.nickName,
      gander: app.globalData.userInfo.gender,
      location: app.globalData.userInfo.province
    });
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    this.setData({
      time_now: time
    });
    if (
      this.data.key_info == null ||
      this.data.details == null ||
      this.data.log_from == null ||
      this.data.key_name == null ||
      this.data.key_phone == null ||
      this.data.log_to == null ||
      this.data.time_log == null
    ) {
      wx.showToast({
        title: '不能输入为空喔……',
        icon: 'none'
      });
    } else {
      this.buy_to();
    }
  },

  buy_to: function () {
    wx.request({
      url: `${app.globalData.url}/xiadan`,
      data: {
        judge: '0',

        // 物流信息
        type: this.data.type,
        money: this.data.money,
        details: this.data.details,
        log_from: this.data.log_from,
        log_to: this.data.log_to,
        time: this.data.time_now,
        time_log: this.data.time_log,
        conditions: this.data.conditions,
        sum: '1',

        // 用户信息
        icon_url: this.data.icon_url,
        nickname: this.data.nickname,
        gander: this.data.gander,
        location: this.data.location,
        openid: app.globalData.openid,

        // 保密信息
        key_info: this.data.key_info,
        key_name: this.data.key_name,
        key_phone: this.data.key_phone
      },
      success: function (res) {
        console.log(res.data);
        wx.showToast({
          title: '下单成功<_>',
          icon: 'success',
          duration: 1500
        });

        setTimeout(function () {
          wx.switchTab({
            url: '../../index/index'
          });
        }, 1600);
      },
      fail: function (res) {
        console.log('请求失败');
        wx.hideLoading();
      }
    });
  },

  add: function () {
    var i = this.data.money;
    if (i >= 3) {
      i++;
      this.setData({
        money: i,
        color: '#000000'
      });
    }
  },

  sub: function () {
    var i = this.data.money;
    if (i > 3) {
      i--;
      this.setData({
        color: '#000000'
      });
    }
    this.setData({
      money: i
    });
    if (i == 3) {
      this.setData({
        color: '#a6a6a6'
      });
    }
  },

  onLoad: function (options) {
    this.setData({
      type: options.type
    });
    console.log(this.data.type);
  }
});
