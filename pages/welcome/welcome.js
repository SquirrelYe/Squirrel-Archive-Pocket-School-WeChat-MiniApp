const app = getApp()

Page({
  data: {
    imgUrls: [
      '../../photo/y1.png',
      '../../photo/y2.png',
      '../../photo/y3.png',
      '../../photo/y4.png'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 1500,
    duration: 1000,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    userInfo: null,
    openid: null,
    unionid: null,
    session_key: null,
    show:false
  },
  l1:function(img){
    console.log("当前swider图片为--->"+img.currentTarget.dataset.index);
    
  },
  l2: function (e) {
    //console.log(e.detail.current);
    var that=this;
    if (e.detail.current == 3) {
      //设置为4s之后提交所有user信息，防止出现回调延时，数据为空
      setTimeout(function () {
        //上传用户openid到服务器
        that.setData({
          show: true, autoplay: false
        })
      }, 1200) 
      
    }else{
      this.setData({
        show: false
      })
    }
  },
  
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },

  bindGetUserInfo: function (e) {
    
    var that = this;
    if (e.detail.userInfo!=null){
      this.setData({
        userInfo: e.detail.userInfo
      })
    }else{
      console.log(e.detail.userInfo);
    }

    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {

          wx.showToast({
            title: '不能拒绝我哦<_>',
            icon: 'none',
            duration: 2000
          }) 
        }else{
          //update 更新app.js里面的数据
          app.getuserinfo(e.detail.userInfo);

          wx.switchTab({
            url: '../index/index',
          })
        }
      }
    })

    
  },

  onLoad:function(){    
    
      wx.showToast({
        title: 'loading.....',
        icon: 'none',
        duration: 1500
      })    
      
      setTimeout(function () {
        console.log("check_first的值------>" + app.globalData.check_first)
        if (app.globalData.check_first == 1) {
          //update 更新app.js里面的数据
          wx.getUserInfo({
            success: function (res) {
              app.getuserinfo(res.userInfo);
            }
          })
          
          wx.switchTab({
            url: '../index/index',
          })
        }
      }, 2000) 
  },

  onShow:function(){


  }

  
  
})