// pages/me/callback/callback.js
Page({

  data: {
  
    color1: '#00cc00',
    color2: '#4d4d4d',
    color_item1: '#00cc00',
    color_item2: '#ffffff',
    callback:'',
    dis_callback:'0',
    dis_show_callback:'0',
    callback_txt:'送货很及时，很棒……'
  },

  choose1: function () {
    this.setData({ color1: '#00cc00', color2: '#4d4d4d' });
    this.setData({ color_item1: '#00cc00', color_item2: '#ffffff'})
  },
  choose2: function () {
    this.setData({ color1: '#4d4d4d', color2: '#00cc00'});
    this.setData({ color_item1: '#ffffff', color_item2: '#00cc00'})
  },
  bindKeyInput:function(e){
    this.setData({
      callback: e.detail.value
    })
  },
  callback_show:function(){
    if (this.data.dis_callback == '0') {
      this.setData({
        dis_callback: '1'
      });
    }else{
      this.setData({
        dis_callback: '0'
      });
    }    
  },
  send_callback:function(){
    console.log(this.data.callback);
    this.setData({
      callback_txt: this.data.callback,
      dis_show_callback: '1',
      dis_callback:'0'
    });
  },
  onLoad: function (options) {
   //接收到me界面传来openid信息
    var openid=options.openid;
    this.setData({
      order_openid: openid
    });
    console.log(this.data.order_openid);
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})