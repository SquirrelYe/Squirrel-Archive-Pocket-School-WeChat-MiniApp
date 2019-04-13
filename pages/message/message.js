// pages/message/ message.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  data: {    
    //三则通讯信息 
    time: [],
    openid: [],
    message: [],
    logs:[],
    all: [{ openid: 'yexuan', message: '------初始化------', time:'------'}],
    //自己的openid
    openid_me:'',
    openid_you:'',
    send: '#e6e6e6',
    tem:'',
    //各自信息
    me:null,
    you:null

  },

  send :function(){
    var time_now = util.formatTime(new Date());
    var newarray = [{
      openid: this.data.openid_me,
      message: this.data.tem,
      time: time_now
    }];
    //添加进缓存
    var log = wx.getStorageSync('time') || []
    log.unshift(time_now)
    wx.setStorageSync('time', log)
    var log = wx.getStorageSync('openid') || []
    log.unshift(this.data.openid_me)
    wx.setStorageSync('openid', log)
    var log = wx.getStorageSync('message') || []
    log.unshift(this.data.tem)
    wx.setStorageSync('message', log)
    //数据绑定
    this.setData({
      'all': this.data.all.concat(newarray)
    });
    console.log('---<发送的信息>---' + this.data.openid_me + '<--->' + this.data.tem + '<--->' +time_now)
    //发送到服务器
    var socketOpen = false
    var socketMsgQueue = []
    var userno = app.globalData.openid
    //为了防止多开socket线程，此处先行关闭。
    wx.closeSocket({      
    })
    //开启socket进程
    wx.connectSocket({
      url: 'wss://www.yexuan.site/WebSocket2/websocket/' + userno,
    })
    var that=this
    wx.onSocketOpen(function (res) {
      socketOpen = true
      for (var i = 0; i < socketMsgQueue.length; i++) {
        sendSocketMessage(socketMsgQueue[i])
      }
      socketMsgQueue = []      
      var msg_text = that.data.tem + '|' + that.data.openid_you
      console.log(msg_text)
      if (socketOpen) {
        wx.sendSocketMessage({
          data: msg_text
        })
        console.log('成功发送' + msg_text)
      } else {
        console.log('发送失败')
      }

    })
   
    
   
  },
  send_text: function (e) {
    this.setData({ tem: e.detail.value });
  },  
  send_color:function(e){
    this.setData({ send: 'green' });
  },
  send_color_1: function (e) {
    this.setData({ send: '#e6e6e6' });
  },
  /*
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) {
    var that = this;
    var sendopenid=options.openid    
    console.log("获取到上一个页面穿来的openid" + "<--->" + sendopenid) 
    this.setData({
      openid_me: app.globalData.openid,
      openid_you: sendopenid,
      me: app.globalData.userInfo
    }) 

    
    //获取到传来对方openid相关信息
    wx.request({
      url: 'https://www.yexuan.site/Logistics_yx/users',
      data: {
        judge: '0',
        openid: options.openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data[0])
        that.setData({
          you: res.data[0]
        })
      }
    })
    // 读取本地聊天信息
    var temp_openid = (wx.getStorageSync('openid') || []).map(log => {
      return log
    });
    var temp_message = (wx.getStorageSync('message') || []).map(log => {
      return log
    });
    var temp_time = (wx.getStorageSync('time') || []).map(log => {
      return log
    });
    
    for (var i = 0; i <= temp_openid.length;i++){      
      //要增加的数组
      if (temp_openid[i] == this.data.openid_me || temp_openid[i] == this.data.openid_you){
        var newarray = [{
          openid: temp_openid[i],
          message: temp_message[i],
          time: temp_time[i]
        }];
        //数据绑定
        this.setData({
          'all': this.data.all.concat(newarray)
        });
        
        console.log('---<增加的缓存信息>---' + this.data.all[i].openid.toString() + '<--->' + this.data.all[i].message.toString() + '<--->' + this.data.all[i].time.toString())

      }
      
    }
      //更换数组顺序
    this.setData({
      'all': this.data.all.reverse()
    });

    //链接websocket
    var userno = app.globalData.openid
    
    wx.connectSocket({
      url: 'wss://www.yexuan.site/WebSocket2/websocket/' + userno,
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接-聊天端-已打开！')
    })
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    })
    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：' + res.data)
      var message_1 = res.data.split("|");
      var time_1 = message_1[0];
      var openid_1 = message_1[1];
      var text =message_1[2];
      //添加进缓存
      var log = wx.getStorageSync('time') || []
      log.unshift(time_1)
      wx.setStorageSync('time', log)
      var log = wx.getStorageSync('openid') || []
      log.unshift(openid_1)
      wx.setStorageSync('openid', log)
      var log = wx.getStorageSync('message') || []
      log.unshift(text)
      wx.setStorageSync('message', log)

      //追加到数组
      var newarray = [{
        openid: message_1[1],
        message: message_1[2],
        time: message_1[0]
      }];
      //数据绑定
      that.setData({
        'all': that.data.all.concat(newarray)
      });
      console.log('---<来自服务器的信息>---' + message_1[0] + '<--->' + message_1[1] + '<--->' + message_1[2])
      //查看缓存信息
      // wx.getStorageInfo({
      //   success: function (res) {
      //     console.log(res)
      //   }
      // })
          
    })
    //监听websocket关闭并重启
    // wx.onSocketClose(function (res) {
    //   console.log('WebSocket 已关闭！'),
    //     wx.connectSocket({
    //       url: 'wss://www.yexuan.site/WebSocket2/websocket/' + userno,
    //     })
    //   console.log('WebSocket 已重启！')
    // })
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
    wx.closeSocket({
    })
    console.log('WebSocket 已关闭！')
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