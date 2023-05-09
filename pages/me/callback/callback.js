const app = getApp();
Page({
  data: {
    order_openid: '',
    color1: '#00cc00',
    color2: '#4d4d4d',
    color_item1: '#00cc00',
    color_item2: '#ffffff',
    choice_callback: '0',
    callback: '',
    dis_callback: '0',
    dis_show_callback: '0',
    callback_item: '',
    callback_index: ''
  },

  choose1: function () {
    this.setData({ color1: '#00cc00', color2: '#4d4d4d', choice_callback: '0' });
    this.setData({ color_item1: '#00cc00', color_item2: '#ffffff' });
    this.enter();
  },
  choose2: function () {
    this.setData({ color1: '#4d4d4d', color2: '#00cc00', choice_callback: '1' });
    this.setData({ color_item1: '#ffffff', color_item2: '#00cc00' });
    this.enter();
  },

  bindKeyInput: function (e) {
    this.setData({
      callback: e.detail.value
    });
  },

  callback_show: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var callback_item_1 = this.data.callback_item[index];
    console.log(callback_item_1);
    this.setData({ callback_index: callback_item_1 });

    if (this.data.callback_index.tak_callback != '0') {
      wx.showToast({
        title: '只能评价一次哦',
        icon: 'none',
        duration: 1500
      });
    } else {
      if (this.data.dis_callback == '0') {
        this.setData({
          dis_callback: '1'
        });
      } else {
        this.setData({
          dis_callback: '0'
        });
      }
    }
  },

  send_callback: function () {
    console.log(this.data.callback);

    var that = this;
    wx.request({
      url: `${app.globalData.url}/taker`,
      data: {
        judge: '8',
        number: that.data.callback_index.number,
        tak_callback: that.data.callback,
        openid_tak: app.globalData.openid
      },
      success: function (res) {
        console.log(res.data);
        that.enter();
        wx.showToast({
          title: '回复成功',
          icon: 'success',
          duration: 1500
        });
      },
      fail: function (res) {
        console.log(res.data);
      }
    });

    this.setData({
      dis_show_callback: '1',
      dis_callback: '0'
    });
  },

  cancel: function () {
    if (this.data.dis_callback == '0') {
      this.setData({
        dis_callback: '1'
      });
    } else {
      this.setData({
        dis_callback: '0'
      });
    }
  },

  f1: function () {
    console.log('get');
  },

  f2: function () {
    console.log('lose');
  },

  enter: function () {
    var that = this;
    wx.showLoading({
      title: '加载中'
    });
    wx.request({
      url: `${app.globalData.url}/taker`,
      data: {
        judge: '7',
        openid: that.data.order_openid,
        choice_callback: that.data.choice_callback
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          callback_item: res.data
        });
        wx.hideLoading();
      },
      fail: function (res) {
        console.log(res.data);
        wx.hideLoading();
      }
    });
  },

  onLoad: function (options) {
    //接收到me界面传来openid信息
    var openid = options.openid;
    this.setData({
      order_openid: openid
    });
    console.log(this.data.order_openid);
    this.enter();
  },

  onPullDownRefresh: function () {
    this.enter();
  }
});
