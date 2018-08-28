// pages/buy/xiadan/xiadan.js
var util = require('../../../utils/util.js');  
const app = getApp()

Page({

  data: {
    title: '快递',
    color:'#000000',

    // 物流信息
    type:null,
    money: 3,
    details: null,
    log_from:null,
    log_to:null,
    time_now:null,
    time_log:null,
    conditions:"1",

    // 用户信息
    icon_url:null,
    nickname:null,
    gander:null,
    location:null,

    // 保密信息
    key_info:null,
    key_name:null,
    key_phone:null,

  },

  d1:function(e){
    this.setData({ key_info: e.detail.value });
  },
  d2: function (e) {
    this.setData({ details: e.detail.value });
  },
  d3: function (e) {
    this.setData({ log_from: e.detail.value });
  },
  d4: function (e) {
    this.setData({ key_name: e.detail.value });
  },
  d5: function (e) {
    this.setData({ key_phone: e.detail.value });
  },
  d6: function (e) {
    this.setData({ log_to: e.detail.value });
  },
  d7: function (e) {
    this.setData({ time_log: e.detail.value });
  },

  buy: function () {
    //console.log(this.data.type)
     //console.log(app.globalData.userInfo);
    // wx.showLoading({
    //   title: '加载中',
    // })

    this.setData({ 
        icon_url: app.globalData.userInfo.avatarUrl,
        nickname: app.globalData.userInfo.nickName,
        gander: app.globalData.userInfo.gender,
        location: app.globalData.userInfo.province,
      });
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
      var time = util.formatTime(new Date());
      // 再通过setData更改Page()里面的data，动态更新页面的数据  
      this.setData({
        time_now: time
      }); 

      // setTimeout(function () {
      //   wx.hideLoading()
      // }, 2000)  

      wx.request({
        url: 'https://www.yexuan.site/Logistics_yx/xiadan', //仅为示例，并非真实的接口地址
        data: {
          
          // 物流信息
          type: this.data.type,
          money: this.data.money,
          details: this.data.details,
          log_from: this.data.log_from,
          log_to: this.data.log_to,
          time: this.data.time_now,
          time_log: this.data.time_log,
          conditions: this.data.conditions,

          // 用户信息
          icon_url: this.data.icon_url,
          nickname: this.data.nickname,
          gander: this.data.gander,
          location: this.data.location,

          // 保密信息
          key_info: this.data.key_info,
          key_name: this.data.key_name,
          key_phone: this.data.key_phone,
        },
        method:"GET",
        header: {
          'content-type': 'application/json;charset=uft-8'  // 默认值
        },
        success: function (res) {
          console.log(res.data);
          wx.showToast({
            title: '下单成功<_>',
            icon: 'success',
            duration: 1500
          }) 
          
          setTimeout(function () {
            wx.switchTab({
              url: '../../index/index',
            })
          }, 1600)
        },
        fail: function (res) {
          console.log("请求失败");
          wx.hideLoading()
        }
      })

  },

  add: function () {
    var i = this.data.money;    
    if (i >= 3) {
      i++;
      this.setData({ money: i,color: '#000000' });
    }
  },

  sub: function () {
    var i = this.data.money;
    if (i > 3) {
      i--;
      this.setData({ color: '#000000' });
      }
    this.setData({ money: i });
    if (i ==3) {
      this.setData({ color: '#a6a6a6' });
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type,
    });
    
    
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