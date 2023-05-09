const app = getApp();
Page({
  data: {
    order_openid: '',
    filter: '../../../photo/tangle_down.png',
    judge_filter: '1',
    kind: '../../../photo/tangle_down.png',
    judge_kind: '1',
    in_color: '',
    out_color: '#07d811',
    submit_kind: '1',
    dis: 'no',
    dis_kind: 'no',
    display: '0',
    dis_search: 'no',
    judge_search: '1',
    putong_color: '#f8f8f8',
    kuaidi_color: '#f8f8f8',
    waimai_color: '#f8f8f8',
    judge_quick: '1',
    empty_price: '0',
    low_price: '0',
    high_price: '0',
    reset_txt: '',
    checks: '',
    totalOutputMoney: '',
    totalInputMoney: '',
    search: '0'
  },

  onLoad: function (options) {
    //接收到me界面传来openid信息
    var openid = options.openid;
    this.setData({
      order_openid: openid
    });
    console.log(this.data.order_openid);
    this.fresh(0);
    this.sumMoney(1);
    this.sumMoney(2);
  },

  fresh: function (e) {
    var that = this;
    wx.request({
      url: `${app.globalData.url}/check`,
      data: {
        judge: e,
        openid: that.data.order_openid
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          checks: res.data
        });
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      },
      fail: function (res) {
        console.log(res.data);
      }
    });
  },

  sumMoney: function (e) {
    var that = this;
    wx.request({
      url: `${app.globalData.url}/check`,
      data: {
        judge: e,
        openid: that.data.order_openid
      },
      success: function (res) {
        console.log(res.data);
        if (e == 1) {
          that.setData({
            totalOutputMoney: res.data[0].totalOutputMoney
          });
        } else {
          that.setData({
            totalInputMoney: res.data[0].totalInputMoney
          });
        }
      },
      fail: function (res) {
        console.log(res.data);
      }
    });
  },

  nv_filter: function () {
    if (this.data.judge_filter == '1') {
      this.setData({
        judge_filter: '2',
        filter: '../../../photo/tangle_up.png',
        dis: 'none',
        low_price: '0',
        high_price: '0'
      });
    } else {
      this.setData({
        judge_filter: '1',
        filter: '../../../photo/tangle_down.png',
        dis: 'no'
      });
    }
  },

  nv_kind: function () {
    if (this.data.judge_kind == '1') {
      this.setData({
        judge_kind: '2',
        kind: '../../../photo/tangle_up.png',
        dis_kind: 'none'
      });
    } else {
      this.setData({
        judge_kind: '1',
        kind: '../../../photo/tangle_down.png',
        dis_kind: 'no'
      });
    }
  },

  nv_search: function () {
    if (this.data.judge_search == '1') {
      this.setData({
        dis_search: 'none',
        judge_search: '2'
      });
    } else {
      this.setData({
        dis_search: 'no',
        judge_search: '1'
      });
    }
  },

  filter_putong: function () {
    this.setData({
      putong_color: '#ffb366',
      kuaidi_color: '',
      waimai_color: '',
      judge_quick: '1'
    });
  },

  filter_kuaidi: function () {
    this.setData({
      putong_color: '',
      kuaidi_color: '#ffb366',
      waimai_color: '',
      judge_quick: '2'
    });
  },

  filter_waimai: function () {
    this.setData({
      putong_color: '',
      kuaidi_color: '',
      waimai_color: '#ffb366',
      judge_quick: '3'
    });
  },

  filter_submit: function () {
    console.log(this.data.judge_quick, '-->', this.data.low_price, this.data.high_price);
    this.setData({
      judge_filter: '1',
      filter: '../../../photo/tangle_down.png',
      dis: 'no'
    });
    if (this.data.low_price == '0' && this.data.high_price == '0') {
      this.setData({
        empty_price: '1'
      });
    } else {
      this.setData({
        empty_price: '0'
      });
    }
    var that = this;
    //快速筛选
    wx.request({
      url: `${app.globalData.url}/check`,
      data: {
        judge: 5,
        judge_select: that.data.submit_kind,
        openid: that.data.order_openid,
        judge_quick: that.data.judge_quick,
        low_price: that.data.low_price,
        high_price: that.data.high_price,
        empty_price: that.data.empty_price
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          checks: res.data
        });
      },
      fail: function (res) {
        console.log(res.data);
      }
    });
  },

  filter_reset: function () {
    this.setData({
      putong_color: '#ffb366',
      kuaidi_color: '#f8f8f8',
      waimai_color: '#f8f8f8',
      judge_quick: '1'
    });
    this.setData({
      txt: '',
      low_price: '0',
      high_price: '0'
    });
  },

  bindKeyInput: function (e) {
    this.setData({
      search: e.detail.value
    });
  },

  search_submit: function () {
    this.setData({
      dis_search: 'no',
      judge_search: '1'
    });
    if (this.data.search == '0') {
      wx.showToast({
        title: '不能输入为空哦',
        icon: 'none'
      });
    } else {
      var that = this;
      //模糊查询
      wx.request({
        url: `${app.globalData.url}/check`,
        data: {
          judge: 4,
          judge_select: that.data.submit_kind,
          openid: that.data.order_openid,
          like: that.data.search
        },
        success: function (res) {
          console.log(res.data);
          that.setData({
            checks: res.data
          });
        },
        fail: function (res) {
          console.log(res.data);
        }
      });
    }
  },

  low_price: function (e) {
    this.setData({
      low_price: e.detail.value
    });
  },

  kind_out: function () {
    this.setData({
      in_color: '',
      out_color: '#07d811',
      submit_kind: '1'
    });
    this.setData({
      judge_kind: '1',
      kind: '../../../photo/tangle_down.png',
      dis_kind: 'no'
    });
    this.fresh(0);
  },

  kind_in: function () {
    this.setData({
      in_color: '#07d811',
      out_color: '',
      submit_kind: '2'
    });
    this.setData({
      judge_kind: '1',
      kind: '../../../photo/tangle_down.png',
      dis_kind: 'no'
    });
    this.fresh(3);
  },

  high_price: function (e) {
    this.setData({
      high_price: e.detail.value
    });
  },

  onReady: function () {},

  onShow: function () {},

  onHide: function () {},

  onUnload: function () {},

  onPullDownRefresh: function () {
    if (this.data.submit_kind == '1') {
      this.fresh(0);
    } else {
      this.fresh(3);
    }
    this.sumMoney(1);
    this.sumMoney(2);
  },

  onReachBottom: function () {},

  onShareAppMessage: function () {}
});
