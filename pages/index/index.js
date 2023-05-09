const app = getApp();
const promisify = require('../../utils/promisify.js');

Page({
  data: {
    array: [
      '点击选择学校（暂只支持天津地区）',
      '南开大学',
      '天津大学',
      '中国民航大学',
      '天津城建大学',
      '天津职业技术师范大学',
      '天津工业大学',
      '天津科技大学',
      '天津理工大学',
      '天津医科大学',
      '天津中医药大学',
      '天津师范大学',
      '天津财经大学',
      '天津商业大学',
      '天津天狮学院',
      '天津农学院',
      '天津外国语大学',
      '天津体育学院',
      '天津音乐学院',
      '天津美术学院'
    ],
    school_index: 0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sex1: '../../photo/boy.png',
    sex2: '../../photo/gril.png',
    kind: '../../photo/kind.png',
    xiang: '../../photo/xiang.png',
    color1: '#00cc00',
    color2: '#4d4d4d',
    color3: '#4d4d4d',
    color4: '#4d4d4d',
    color_item1: '#00cc00',
    color_item2: '#ffffff',
    color_item3: '#ffffff',
    color_item4: '#ffffff',
    judge_type: '1',
    attention: '秋千后有景，秋千后有人。景是平凡景，人是心上人。',
    add_text: '＋关注',
    xiang_text: '详',
    imgUrls: [`${app.globalData.url}/www/index_ads/p1.png`, `${app.globalData.url}/www/index_ads/p2.png`, `${app.globalData.url}/www/index_ads/p3.png`],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    offSet: 4,
    globaloffSet: 4,
    selectSchool: '',
    users: null,
    time: '09-21 20:14'
  },

  time: function () {
    return 'lala';
  },
  onPullDownRefresh: function () {
    this.fresh();
  },

  fresh: function () {
    this.setData({
      users: ''
    });
    this.setData({
      color1: '#00cc00',
      color2: '#4d4d4d',
      color3: '#4d4d4d',
      color4: '#4d4d4d',
      judge_type: '0'
    });
    this.setData({
      color_item1: '#00cc00',
      color_item2: '#ffffff',
      color_item3: '#ffffff',
      color_item4: '#ffffff'
    });
    var that = this;
    that.limit();
  },

  Bottom: function () {
    this.setData({
      offSet: (this.data.offSet += 2)
    });
    this.limit();
  },

  limit: function (judge) {
    var that = this;
    let showSum = that.data.users.length;
    wx.showLoading({
      title: 'Loading...'
    });
    wx.request({
      url: `${app.globalData.url}/yx?judge=6`,
      data: {
        from: '0',
        offSet: that.data.offSet,
        type: that.data.judge_type
      },
      success: function (res) {
        //console.log(showSum,res.data.length)
        wx.hideLoading();
        if (showSum == res.data.length) {
          if (judge == 'no') {
          } else {
            wx.showToast({
              title: '我也是有底线的……',
              icon: 'none'
            });
          }
        } else {
          that.setData({
            users: res.data
          });
        }
      }
    });
  },

  selectSchool: function () {
    var that = this;
    var i = setInterval(function () {
      if (app.globalData.selectSchool == '') {
      } else {
        that.setData({
          selectSchool: app.globalData.selectSchool
        });
        clearInterval(i);
      }
    });
  },

  code: function () {
    wx.showLoading({
      title: '加载中'
    });
    setTimeout(function () {
      wx.hideLoading();
    }, 2000),
      this.setData({
        add_text: '已关注'
      });
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      school_index: e.detail.value
    });
  },

  choose1: function () {
    this.setData({
      color1: '#00cc00',
      color2: '#4d4d4d',
      color3: '#4d4d4d',
      color4: '#4d4d4d',
      judge_type: '0',
      offSet: this.data.globaloffSet,
      users: ''
    });
    this.setData({
      color_item1: '#00cc00',
      color_item2: '#ffffff',
      color_item3: '#ffffff',
      color_item4: '#ffffff'
    });
    this.limit();
  },

  choose2: function () {
    this.setData({
      color1: '#4d4d4d',
      color2: '#00cc00',
      color3: '#4d4d4d',
      color4: '#4d4d4d',
      judge_type: '1',
      offSet: this.data.globaloffSet,
      users: ''
    });
    this.setData({
      color_item1: '#ffffff',
      color_item2: '#00cc00',
      color_item3: '#ffffff',
      color_item4: '#ffffff'
    });
    this.limit();
  },

  choose3: function () {
    this.setData({
      color1: '#4d4d4d',
      color2: '#4d4d4d',
      color3: '#00cc00',
      color4: '#4d4d4d',
      judge_type: '2',
      offSet: this.data.globaloffSet,
      users: ''
    });
    this.setData({
      color_item1: '#ffffff',
      color_item2: '#ffffff',
      color_item3: '#00cc00',
      color_item4: '#ffffff'
    });
    this.limit();
  },

  choose4: function () {
    this.setData({
      color1: '#4d4d4d',
      color2: '#4d4d4d',
      color3: '#4d4d4d',
      color4: '#00cc00',
      judge_type: '3',
      offSet: this.data.globaloffSet,
      users: ''
    });
    this.setData({
      color_item1: '#ffffff',
      color_item2: '#ffffff',
      color_item3: '#ffffff',
      color_item4: '#00cc00'
    });
    this.limit();
  },

  onLoad: function (options) {
    var thispage = this;
    wx.getUserInfo({
      success: res => {
        thispage.userInfo = res.userInfo;
      }
    });
    this.fresh();
    this.selectSchool();
  },

  btnClick: function (e) {
    if (app.globalData.rz_type == -2) {
      wx.showModal({
        title: '那不行',
        content: '只有经过认证的校园大使才能查看详细信息，订单本人请前往我的->我的订单',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    } else if (app.globalData.rz_type == -1) {
      wx.showModal({
        title: '那不行',
        content: '只有经过认证的校园大使才能查看详细信息，订单本人请前往 \n我的->我的订单',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    } else {
      var index = parseInt(e.currentTarget.dataset.index);
      var userInfo = JSON.stringify(this.data.users[index]);
      wx.navigateTo({
        url: '../buy/jiedan/jiedan?user=' + userInfo
      });
    }
  },

  buy: function () {
    wx.switchTab({
      url: '../logs/logs'
    });
    console.log('lalala');
  },

  bindViewTap: function () {
    wx.navigateTo({
      url: '../buy_kind/buy_kind'
    });
  },

  onShow: function () {
    this.limit('no');
  }
});
