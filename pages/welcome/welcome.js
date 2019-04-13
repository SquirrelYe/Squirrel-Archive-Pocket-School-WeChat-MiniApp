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
    show: false,
    check_first: 0, //取值0，1  0表示未授权userinfo信息，1表示已经授权userinfo信息
    openid:''
  },
  l1:function(img){
    console.log("当前swider图片为--->"+img.currentTarget.dataset.index);    
  },
  l2: function (e) {
    var that=this;
    if (e.detail.current == 3) {
      setTimeout(function () {
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
      console.log(e);
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
          wx.navigateTo({
            url: './register/register',
          })
        }
      }
    })   
  },

  onLoad:function(){    
    var that=this;
    wx.showToast({
      title: 'loading.....',
      icon: 'loading',
      duration: 15000
    }),

    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          that.setData({
            check_first:0
          })
        } else {
          that.setData({
            check_first: 1
          })
          console.log("check_first的值------>" + that.data.check_first)
          if (that.data.check_first == 1) {
            wx.getUserInfo({
              success: function (res) {
                app.getuserinfo(res.userInfo);
              }
            })
            that.switchPage();       
          }
        }
      }
    }) 
  
  },
  switchPage:function(){
    var that=this;
    if (app.globalData.openid == '') {
      var i =setInterval(function () {
        var openid = app.globalData.openid;
        console.log('haha', openid)
        if (openid != '') {
          clearInterval(i);
          that.setData({
            openid: app.globalData.openid
          })
          wx.request({
            url: `${app.globalData.url}/users?judge=3`,
            data: {
              openid: app.globalData.openid
            },
            method: "GET",
            success: function (res) {
              console.log(res)
              if (res.data.length == 1) {
                wx.switchTab({
                  url: '../index/index',
                })
              } else {
                wx.navigateTo({
                  url: './register/register',
                })
              }
            }
          })
        }
      }, 2000)
      
    } else {
      wx.request({
        url: `${app.globalData.url}/users?judge=3`,
        data: {
          openid: app.globalData.openid
        },
        method: "GET",
        success: function (res) {
          console.log(res)
          if (res.data.length == 1) {
            wx.switchTab({
              url: '../index/index',
            })
          } else {
            wx.navigateTo({
              url: './register/register',
            })
          }
        }
      })
      
    } 
  },

  onShow:function(){


  }  
  
})