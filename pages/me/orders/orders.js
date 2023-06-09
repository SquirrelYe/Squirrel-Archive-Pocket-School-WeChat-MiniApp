const app = getApp();
Page({
  data: {
    order_openid: null,

    color1: '#00cc00',
    color2: '#4d4d4d',
    color3: '#4d4d4d',
    color4: '#4d4d4d',
    color5: '#4d4d4d',
    color_item1: '#00cc00',
    color_item2: '#ffffff',
    color_item3: '#ffffff',
    color_item4: '#ffffff',
    color_item5: '#ffffff',
    order: '',
    judge_item: '-1'
  },

  choose1: function () {
    this.setData({ color1: '#00cc00', color2: '#4d4d4d', color3: '#4d4d4d', color4: '#4d4d4d', color5: '#4d4d4d' });
    this.setData({ color_item1: '#00cc00', color_item2: '#ffffff', color_item3: '#ffffff', color_item4: '#ffffff', color_item5: '#ffffff', judge_item: '-1' });
    this.enter();
  },
  choose2: function () {
    this.setData({ color1: '#4d4d4d', color2: '#00cc00', color3: '#4d4d4d', color4: '#4d4d4d', color5: '#4d4d4d' });
    this.setData({ color_item1: '#ffffff', color_item2: '#00cc00', color_item3: '#ffffff', color_item4: '#ffffff', color_item5: '#ffffff', judge_item: '1' });
    this.fresh(this.data.judge_item);
  },
  choose3: function () {
    this.setData({ color1: '#4d4d4d', color2: '#4d4d4d', color3: '#00cc00', color4: '#4d4d4d', color5: '#4d4d4d' });
    this.setData({ color_item1: '#ffffff', color_item2: '#ffffff', color_item3: '#00cc00', color_item4: '#ffffff', color_item5: '#ffffff', judge_item: '2' });
    this.fresh(this.data.judge_item);
  },
  choose4: function () {
    this.setData({ color1: '#4d4d4d', color2: '#4d4d4d', color3: '#4d4d4d', color4: '#00cc00', color5: '#4d4d4d' });
    this.setData({ color_item1: '#ffffff', color_item2: '#ffffff', color_item3: '#ffffff', color_item4: '#00cc00', color_item5: '#ffffff', judge_item: '3' });
    this.fresh(this.data.judge_item);
  },
  choose5: function () {
    this.setData({ color1: '#4d4d4d', color2: '#4d4d4d', color3: '#4d4d4d', color4: '#4d4d4d', color5: '#00cc00' });
    this.setData({ color_item1: '#ffffff', color_item2: '#ffffff', color_item3: '#ffffff', color_item4: '#ffffff', color_item5: '#00cc00', judge_item: '4' });
    this.fresh(this.data.judge_item);
  },

  enter: function () {
    var that = this;
    that.setData({
      order: ''
    });
    wx.showNavigationBarLoading();
    wx.request({
      url: `${app.globalData.url}/taker`,
      data: {
        judge: '0',
        openid_tak: that.data.order_openid
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          order: res.data
        });
        wx.hideNavigationBarLoading();
      },
      fail: function (res) {
        console.log(res.data);
      }
    });
  },

  fresh: function (judge_item) {
    var that = this;
    that.setData({
      order: ''
    });
    wx.showNavigationBarLoading();
    wx.request({
      url: `${app.globalData.url}/taker`,
      data: {
        judge: '2',
        openid_tak: that.data.order_openid,
        conditions: judge_item
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          order: res.data
        });
        wx.hideNavigationBarLoading();
      },
      fail: function (res) {
        console.log(res.data);
      }
    });
  },

  ordAccept: function (e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    var tem = that.data.order[index];
    wx.request({
      url: `${app.globalData.url}/taker`,
      data: {
        judge: '3',
        number: tem.number
      },
      success: function (res) {
        console.log(res.data);
        that.enter();
      },
      fail: function (res) {
        console.log(res.data);
      }
    });
  },

  ordArrive: function (e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    var tem = that.data.order[index];
    wx.request({
      url: `${app.globalData.url}/taker`,
      data: {
        judge: '4',
        number: tem.number
      },
      success: function (res) {
        console.log(res.data);
        that.enter();
      },
      fail: function (res) {
        console.log(res.data);
      }
    });
  },

  contactCustomer: function (e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    var tem = that.data.order[index];
    wx.request({
      url: `${app.globalData.url}/taker`,
      data: {
        judge: '6',
        number: tem.number
      },
      success: function (res) {
        console.log(res.data);
        wx.makePhoneCall({
          phoneNumber: res.data[0].cus_phone
        });
      },
      fail: function (res) {
        console.log(res.data);
      }
    });
  },

  deleteOrderByNumber: function () {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    var tem = that.data.order[index];
    wx.request({
      url: `${app.globalData.url}/taker`,
      data: {
        judge: '1',
        number: tem.number,
        openid_tak: that.data.order_openid
      },
      success: function (res) {
        console.log(res.data);
      },
      fail: function (res) {
        console.log(res.data);
      }
    });
  },

  onLoad: function (options) {
    var openid = options.openid;
    this.setData({
      order_openid: openid
    });
    console.log(this.data.order_openid);
    this.enter();
  },

  onReady: function () {},

  onShow: function () {},

  onHide: function () {},

  onUnload: function () {},

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading(),
      //添加刷新之后的信息。
      setTimeout(function () {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }, 1000);
    var judge_item = this.data.judge_item;
    if (judge_item == '-1') {
      this.enter();
      console.log(judge_item, '-->', '全部');
    }
    if (judge_item == '1') {
      this.fresh(judge_item);
      console.log(judge_item, '-->', '已接单');
    }
    if (judge_item == '2') {
      this.fresh(judge_item);
      console.log(judge_item, '-->', '已取货');
    }
    if (judge_item == '3') {
      this.fresh(judge_item);
      console.log(judge_item, '-->', '已送达');
    }
    if (judge_item == '4') {
      this.fresh(judge_item);
      console.log(judge_item, '-->', '已评价');
    }
  },

  onReachBottom: function () {},

  onShareAppMessage: function () {}
});
