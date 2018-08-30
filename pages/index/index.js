//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    array: ['南开大学', '天津大学', '中国民航大学', '天津城建大学','天津职业技术师范大学',
    '天津工业大学','天津科技大学','天津理工大学','天津医科大学','天津中医药大学','天津师范大学',
    '天津财经大学','天津商业大学','天津天狮学院','天津农学院','天津外国语大学','天津体育学院',
    '天津音乐学院','天津美术学院'],
    school_index: 0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sex1:"../../photo/boy.png",
    sex2: "../../photo/gril.png",
    kind:"../../photo/kind.png",
    xiang:"../../photo/xiang.png",
    color1: '#00cc00',
    color2: '#4d4d4d',
    color3: '#4d4d4d',
    color4: '#4d4d4d',
    color_item1:'#00cc00',
    color_item2: '#ffffff',
    color_item3: '#ffffff',
    color_item4: '#ffffff',
    judge_type:'1',
    attention:'秋千后有景，秋千后有人。景是平凡景，人是心上人。',
    add_text: '＋关注',
    xiang_text:'详',
    imgUrls: [
      'https://www.yexuan.site/photo/p1.png',
      'https://www.yexuan.site/photo/p2.png',
      'https://www.yexuan.site/photo/p3.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    sum:2,
    users:null
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    //添加刷新之后的信息。
    var thispage = this;
    this.setData({ color1: '#00cc00', color2: '#4d4d4d', color3: '#4d4d4d', color4: '#4d4d4d', judge_type: '0' });
    this.setData({ color_item1: '#00cc00', color_item2: '#ffffff', color_item3: '#ffffff', color_item4: '#ffffff' });
    this.setData({
      users: ''
    })
    var that = this;
    app.users(function (data) {
      thispage.setData({ users: data });
      console.log(thispage.data.users);
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    })
  },

  onReachBottom: function () {
    // Do something when page reach bottom.
    console.log('circle 下一页');
  },  
  fresh:function(){
    var i = this.data.sum;
    this.setData({ sum:i });
    console.log(i);
  },
  code:function(){
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000),    
    this.setData({ add_text: '已关注' });
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      school_index: e.detail.value
    })
  },
  choose1:function(){
    this.setData({ color1: '#00cc00', color2: '#4d4d4d', color3: '#4d4d4d', color4: '#4d4d4d', judge_type: '0'  });
    this.setData({ color_item1: '#00cc00', color_item2: '#ffffff', color_item3: '#ffffff', color_item4: '#ffffff' }); 
    this.setData({
      users: ''
    })
    var that=this;
    app.users(function (data) {
      that.setData({ users: data });
      console.log(that.data.users);
    })
  },

  choose2: function () {
    this.setData({ color1: '#4d4d4d', color2: '#00cc00', color3: '#4d4d4d', color4: '#4d4d4d', judge_type: '1'  });
    this.setData({ color_item1: '#ffffff', color_item2: '#00cc00', color_item3: '#ffffff', color_item4: '#ffffff' })
    this.choice(this.data.judge_type)
  },

  choose3: function () {
    this.setData({ color1: '#4d4d4d', color2: '#4d4d4d', color3: '#00cc00', color4: '#4d4d4d', judge_type: '2'  });
    this.setData({ color_item1: '#ffffff', color_item2: '#ffffff', color_item3: '#00cc00', color_item4: '#ffffff' })
    this.choice(this.data.judge_type)
  },

  choose4: function () {
    this.setData({ color1: '#4d4d4d', color2: '#4d4d4d', color3: '#4d4d4d', color4: '#00cc00', judge_type: '3' });
    this.setData({ color_item1: '#ffffff', color_item2: '#ffffff', color_item3: '#ffffff', color_item4: '#00cc00' })
    this.choice(this.data.judge_type)     
  },

  setdata: function (res) {
    this.setData({ users: res })
  },

  choice: function (judge_type) {
    var that = this;
    that.setData({
      users: ''
    })
    wx.showNavigationBarLoading()
    //发起网络请求
    wx.request({
      //获取openid接口  
      url: `${app.globalData.url}/yx`,
      data: {
        'judge': '0',
        'type': judge_type
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          users: res.data
        })
        wx.hideNavigationBarLoading()
      },
      fail: function (res) {
        console.log(res.data);
        wx.hideNavigationBarLoading()
      }
    })
  },
  onLoad: function (options) {
    var thispage = this;

    wx.getUserInfo({
      success: res => {
        thispage.userInfo = res.userInfo
      }
    }) 

    app.users(function (data) {
      thispage.setData({ users: data });
      console.log(thispage.data.users);
    })
    
   
  },
  
  btnClick: function (e) {
    console.log(e);
    var index=parseInt(e.currentTarget.dataset.index);
    //console.log(this.data.users[index]);
    // 把要传递的json对象转换成字符串
    var userInfo = JSON.stringify(this.data.users[index]);
    wx.navigateTo({
      url: '../buy/jiedan/jiedan?user=' + userInfo
    })
  },
  buy:function(){
    wx.switchTab({
      url: '../logs/logs',
    })
    console.log("lalala");
  },
  bindViewTap:function(){
    wx.navigateTo({
      url: '../buy_kind/buy_kind',
    })
  },

  onShow: function () {
    // console.log("切换前台显示")
    var thispage = this;
    app.users(function (data) {
      thispage.setData({ users: data });
      console.log(thispage.data.users);
    })
  },

})
