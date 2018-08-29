// pages/me/orders/orders.js
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
    order:'',
    judge_item:'-1',
    otrder_test: [{
      "types": "1",
      "name": "天上的云……",
      "condition": "1",
      "icon": "../../../photo/wuhuang.jpg",
      "details": "在众创空间买一杯鸳鸯奶茶送到启能斋520宿舍。",
      "time":"2018.08.24 23:14",
      "money": "6.00",
      "sum": "1"
    }]
  },

  choose1: function () {
    this.setData({ color1: '#00cc00', color2: '#4d4d4d', color3: '#4d4d4d', color4: '#4d4d4d', color5: '#4d4d4d' });
    this.setData({ color_item1: '#00cc00', color_item2: '#ffffff', color_item3: '#ffffff', color_item4: '#ffffff', color_item5: '#ffffff', judge_item: '-1' })
    this.enter();
  },
  choose2: function () {
    this.setData({ color1: '#4d4d4d', color2: '#00cc00', color3: '#4d4d4d', color4: '#4d4d4d', color5: '#4d4d4d' });
    this.setData({ color_item1: '#ffffff', color_item2: '#00cc00', color_item3: '#ffffff', color_item4: '#ffffff', color_item5: '#ffffff', judge_item: '1' })
    this.fresh(this.data.judge_item);
  },
  choose3: function () {
    this.setData({ color1: '#4d4d4d', color2: '#4d4d4d', color3: '#00cc00', color4: '#4d4d4d', color5: '#4d4d4d' });
    this.setData({ color_item1: '#ffffff', color_item2: '#ffffff', color_item3: '#00cc00', color_item4: '#ffffff', color_item5: '#ffffff', judge_item: '2' })
    this.fresh(this.data.judge_item);
  },
  choose4: function () {
    this.setData({ color1: '#4d4d4d', color2: '#4d4d4d', color3: '#4d4d4d', color4: '#00cc00', color5: '#4d4d4d' });
    this.setData({ color_item1: '#ffffff', color_item2: '#ffffff', color_item3: '#ffffff', color_item4: '#00cc00', color_item5: '#ffffff', judge_item: '3' })
    this.fresh(this.data.judge_item);
  },
  choose5: function () {
    this.setData({ color1: '#4d4d4d', color2: '#4d4d4d', color3: '#4d4d4d', color4: '#4d4d4d', color5: '#00cc00' });
    this.setData({ color_item1: '#ffffff', color_item2: '#ffffff', color_item3: '#ffffff', color_item4: '#ffffff', color_item5: '#00cc00', judge_item: '4' })
    this.fresh(this.data.judge_item);
  },

  enter: function () {
    var that = this;
    //发起网络请求
    wx.request({
      //获取openid接口  
      url: 'http://localhost:11111/taker',
      data: {
        judge: '0',
        openid_tak: '2'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          order: res.data
        })
      },
      fail: function (res) {
        console.log(res.data);
      }
    })
  },

  fresh: function (judge_item) {
    var that = this;
    //发起网络请求
    wx.request({
      //获取openid接口  
      url: 'http://localhost:11111/taker',
      data: {
        judge: '2',
        openid_tak: '2',
        conditions: judge_item
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          order: res.data
        })
      },
      fail: function (res) {
        console.log(res.data);
      }
    })
  },

  onLoad: function (options) {
    //接收到me界面传来openid信息
    var openid=options.openid;
    this.setData({
      order_openid: openid
    });
    console.log(this.data.order_openid);
    this.enter();
  },

  onReady: function () {
  
  },

  onShow: function () {
  
  },

  onHide: function () {
  
  },

  onUnload: function () {
  
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading(),
      //添加刷新之后的信息。
      setTimeout(function () {
        wx.hideNavigationBarLoading()
      }, 1000) 
    var judge_item = this.data.judge_item;
    if (judge_item == '-1') {
      this.enter();
      console.log(judge_item, '-->', '全部')
    }
    if (judge_item == '1') {
      this.fresh(judge_item);
      console.log(judge_item, '-->', '待接单')
    }
    if (judge_item == '2') {
      this.fresh(judge_item);
      console.log(judge_item, '-->', '待取货')
    }
    if (judge_item == '3') {
      this.fresh(judge_item);
      console.log(judge_item, '-->', '待送达')
    }
    if (judge_item == '4') {
      this.fresh(judge_item);
      console.log(judge_item, '-->', '待评价')
    }
  },

  onReachBottom: function () {
  
  },

  onShareAppMessage: function () {
  
  }
})