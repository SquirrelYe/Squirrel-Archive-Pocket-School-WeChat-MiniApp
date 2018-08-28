// pages/buy_kind.js
Page({

  data: {
    dis_part:'0'
  },
  quit:function(){
    
    wx.switchTab({
      url: '../index/index',
    })
  },
  putong: function () {
    wx.navigateTo({
      url: '../buy/xiadan/xiadan?type=1'
    })
  },
  kuaidi: function () {
    wx.navigateTo({
      url: '../buy/xiadan/xiadan?type=2'
    })
  },
  waimai: function () {
    wx.navigateTo({
      url: '../buy/xiadan/xiadan?type=3'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ dis_part: '1' });
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
    this.setData({ dis_part: '1' });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ dis_part: '0' });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({ dis_part: '0' });
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