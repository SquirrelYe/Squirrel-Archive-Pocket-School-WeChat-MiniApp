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
    otrder_test: [{
      "types": "1",
      "name": "天上的云……",
      "condition": "1",
      "icon": "../../../photo/wuhuang.jpg",
      "details": "在众创空间买一杯鸳鸯奶茶送到启能斋520宿舍。",
      "time": "2018.08.24 23:14",
      "money": "6.00",
      "sum": "1"
    }]
  },

  choose1: function () {
    this.setData({ color1: '#00cc00', color2: '#4d4d4d', color3: '#4d4d4d', color4: '#4d4d4d', color5: '#4d4d4d' });
    this.setData({ color_item1: '#00cc00', color_item2: '#ffffff', color_item3: '#ffffff', color_item4: '#ffffff', color_item5: '#ffffff' })
  
  },
  choose2: function () {
    this.setData({ color1: '#4d4d4d', color2: '#00cc00', color3: '#4d4d4d', color4: '#4d4d4d', color5: '#4d4d4d' });
    this.setData({ color_item1: '#ffffff', color_item2: '#00cc00', color_item3: '#ffffff', color_item4: '#ffffff', color_item5: '#ffffff' })
  },
  choose3: function () {
    this.setData({ color1: '#4d4d4d', color2: '#4d4d4d', color3: '#00cc00', color4: '#4d4d4d', color5: '#4d4d4d' });
    this.setData({ color_item1: '#ffffff', color_item2: '#ffffff', color_item3: '#00cc00', color_item4: '#ffffff', color_item5: '#ffffff' })
  },
  choose4: function () {
    this.setData({ color1: '#4d4d4d', color2: '#4d4d4d', color3: '#4d4d4d', color4: '#00cc00', color5: '#4d4d4d' });
    this.setData({ color_item1: '#ffffff', color_item2: '#ffffff', color_item3: '#ffffff', color_item4: '#00cc00', color_item5: '#ffffff' })
  },
  choose5: function () {
    this.setData({ color1: '#4d4d4d', color2: '#4d4d4d', color3: '#4d4d4d', color4: '#4d4d4d', color5: '#00cc00' });
    this.setData({ color_item1: '#ffffff', color_item2: '#ffffff', color_item3: '#ffffff', color_item4: '#ffffff', color_item5: '#00cc00' })
  },

  onLoad: function (options) {
    //接收到me界面传来openid信息
    var openid=options.openid;
    this.setData({
      order_openid: openid
    });
    console.log(this.data.order_openid);
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

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})