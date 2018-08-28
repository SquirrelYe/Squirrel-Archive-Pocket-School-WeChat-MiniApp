const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    sex1: "../../photo/boy.png",
    sex2: "../../photo/gril.png",
    friends:0,
    add:0,
    fan:0,
    sign:"原来我一直为你停留，甚至忘记了时间。",

    animationData: {},
    animationData1: {},
    open:false,

    zhankai:'../../photo/jiantou.png',
  },

  nv_renzheng: function () {
    wx.navigateTo({
      url: '../me/authenticate/authenticate',
    })
  },
  nv_orders:function(){
    var openid=app.globalData.openid;
    wx.navigateTo({
      url: '../me/orders/orders?openid='+openid,
    })
  },
  nv_cus_orders: function () {
    var openid = app.globalData.openid;
    wx.navigateTo({
      url: '../me/cus_orders/cus_orders?openid=' + openid,
    })
  },
  nv_cus_checks: function () {
    var openid = app.globalData.openid;
    wx.navigateTo({
      url: '../me/cus_checks/cus_checks?openid=' + openid,
    })
  },
  nv_callback: function () {
    var openid = app.globalData.openid;
    wx.navigateTo({
      url: '../me/callback/callback?openid=' + openid,
    })
  },
  onPickHeaderClick: function () {
    this.setData({
      //openPicker: !this.data.openPicker,
      needAnimation: true,
      open:!this.data.open
    })
   
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    var animation1 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation,
      this.setData({
        animationData: animation.export()
      })
      this.animation1 = animation1,
      this.setData({
        animationData1: animation1.export()
      })

      if(this.data.open==true){
        this.setData({
          zhankai: '../../photo/jiantou_1.png'
        })
       
        this.animation.translate(0, 120).step({ duration: 500 })
        this.animation1.translate(0, 120).step({ duration: 500 })
        this.setData({
          animationData: this.animation.export(),
          animationData1: this.animation1.export()

        })
      }else{
        this.setData({
          zhankai: '../../photo/jiantou.png'
        })
        this.animation.translate(0, -120).step({ duration: 1000 })
        this.animation1.translate(0, 0).step({ duration: 800 })
        this.setData({
          animationData: this.animation.export(),
          animationData1: this.animation1.export()
      })        
    }
  },
  school_details:function(){
    wx.showLoading({
      title: '加载中',
      duration: 1500
    })
  },
  classmates:function(){
    wx.showLoading({
      title: '加载中',
      duration: 1500
    })
  },
  bug:function(){
    wx.showLoading({
      title: '加载中',
      duration: 1500
    })
  },
  about:function(){
    wx.showLoading({
      title: '加载中',
      duration: 1500
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user: app.globalData.userInfo
    });
    console.log(this.data.user);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          //动态根据手机分辨率来计算内容的高度（屏幕总高度-顶部筛选栏的高度）
          contentHeight: (res.windowHeight - 72 * res.screenWidth / 750)
        });
      }
    })
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