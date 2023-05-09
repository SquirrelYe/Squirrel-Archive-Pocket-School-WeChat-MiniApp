const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    sex1: '../../photo/boy.png',
    sex2: '../../photo/gril.png',
    friends: 0,
    add: 0,
    fan: 0,
    sign: '原来我一直为你停留，甚至忘记了时间。',

    animationData: {},
    animationData1: {},
    open: false,

    zhankai: '../../photo/jiantou.png'
  },

  nv_renzheng: function () {
    wx.navigateTo({
      url: '../me/authenticate/authenticate'
    });
  },
  nv_orders: function () {
    var openid = app.globalData.openid;
    wx.navigateTo({
      url: '../me/orders/orders?openid=' + openid
    });
  },
  nv_cus_orders: function () {
    var openid = app.globalData.openid;
    wx.navigateTo({
      url: '../me/cus_orders/cus_orders?openid=' + openid
    });
  },
  nv_cus_checks: function () {
    var openid = app.globalData.openid;
    wx.navigateTo({
      url: '../me/cus_checks/cus_checks?openid=' + openid
    });
  },
  nv_callback: function () {
    var openid = app.globalData.openid;
    wx.navigateTo({
      url: '../me/callback/callback?openid=' + openid
    });
  },
  onPickHeaderClick: function () {
    if (app.globalData.authenticate.length == 0) {
      wx.showModal({
        title: '认证！认证！认证！',
        content: '同孩，你还没有填写认证信息，点确定成为校园大使。',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: './authenticate/authenticate'
            });
          } else if (res.cancel) {
          }
        }
      });
    } else {
      this.setData({
        //openPicker: !this.data.openPicker,
        needAnimation: true,
        open: !this.data.open
      });

      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease'
      });

      var animation1 = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease'
      });

      (this.animation = animation),
        this.setData({
          animationData: animation.export()
        });
      (this.animation1 = animation1),
        this.setData({
          animationData1: animation1.export()
        });

      if (this.data.open == true) {
        this.setData({
          zhankai: '../../photo/jiantou_1.png'
        });

        this.animation.translate(0, 120).step({ duration: 500 });
        this.animation1.translate(0, 120).step({ duration: 500 });
        this.setData({
          animationData: this.animation.export(),
          animationData1: this.animation1.export()
        });
      } else {
        this.setData({
          zhankai: '../../photo/jiantou.png'
        });
        this.animation.translate(0, -120).step({ duration: 1000 });
        this.animation1.translate(0, 0).step({ duration: 800 });
        this.setData({
          animationData: this.animation.export(),
          animationData1: this.animation1.export()
        });
      }
    }
  },
  school_details: function () {
    wx.showToast({
      title: '小哥哥研发中',
      icon: 'none'
    });
  },
  classmates: function () {
    wx.showToast({
      title: '小哥哥研发中',
      icon: 'none'
    });
  },
  bug: function () {
    wx.showToast({
      title: '小哥哥研发中',
      icon: 'none'
    });
  },
  about: function () {
    wx.showToast({
      title: '小哥哥研发中',
      icon: 'none'
    });
  },

  onLoad: function (options) {
    this.setData({
      user: app.globalData.userInfo
    });
    console.log(this.data.user);
  },

  onReady: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          //动态根据手机分辨率来计算内容的高度（屏幕总高度-顶部筛选栏的高度）
          contentHeight: res.windowHeight - (72 * res.screenWidth) / 750
        });
      }
    });
  },

  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  onUnload: function () {},

  onPullDownRefresh: function () {},

  onReachBottom: function () {},

  onShareAppMessage: function () {}
});
