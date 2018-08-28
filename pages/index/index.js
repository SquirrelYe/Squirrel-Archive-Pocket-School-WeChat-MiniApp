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
    users:null,
    user:{
      // 相关用户信息
      // 1.用户头像
      user_icons:[
        "../../photo/ling.png",
        "../../photo/discuss.png",
      ],
      // 2.用户昵称
      nick:[
          "风继续吹",
          "皮皮虾，我们走"
      ],
      // 3.性别
      sex:[
          0,1,2
          // 介绍，0表示性别未知，1为男性，2为女性
      ],
      // 4.类别type
      types:[
          1,2,3
          //1为快递，2为普通，3为外卖
      ],
      // 5.内容details
      details:[
        "在众创空间买一杯鸳鸯奶茶送到启能斋520宿舍",
        "启能斋外卖"
      ],
      // 6.conditions状态
      conditions:[
        1,2,3,4
        //1为未接单，2为已接单，3为派送中，4为已完成
      ],
      // 7.money价格 
      money: [
        2.8,6.6
      ],
      // 8. time时间date
      time: [
        1,2,3,4
      ],
      // 9.from起点,to终点
      location_from: [
        "城大众创",
        "启能斋"
      ],
      location_to: [
        "电信楼",
        "计算机学院"
        ]
    }
  },
  onPullDownRefresh: function () {
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 1000),
    wx.showNavigationBarLoading(),
    //添加刷新之后的信息。
    setTimeout(function () {
      wx.hideNavigationBarLoading()
    }, 1000)  
    // console.log("下拉刷新")
    var thispage = this;
    app.users(function (data) {
      thispage.setData({ users: data });
      console.log(thispage.data.users);
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
    this.setData({ color1: '#00cc00', color2: '#4d4d4d', color3: '#4d4d4d', color4: '#4d4d4d', color_item1: '#00cc00' });
    this.setData({ color_item1: '#00cc00', color_item2: '#ffffff', color_item3: '#ffffff', color_item4: '#ffffff'  })
  },

  choose2: function () {
    this.setData({ color1: '#4d4d4d', color2: '#00cc00', color3: '#4d4d4d', color4: '#4d4d4d' });
    this.setData({ color_item1: '#ffffff', color_item2: '#00cc00', color_item3: '#ffffff', color_item4: '#ffffff' })
  },

  choose3: function () {
    this.setData({ color1: '#4d4d4d', color2: '#4d4d4d', color3: '#00cc00', color4: '#4d4d4d' });
    this.setData({ color_item1: '#ffffff', color_item2: '#ffffff', color_item3: '#00cc00', color_item4: '#ffffff' })
  },

  choose4: function () {
    this.setData({ color1: '#4d4d4d', color2: '#4d4d4d', color3: '#4d4d4d', color4: '#00cc00' });
    this.setData({ color_item1: '#ffffff', color_item2: '#ffffff', color_item3: '#ffffff', color_item4: '#00cc00' })      
  },

  setdata: function (res) {
    this.setData({ users: res })
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

  

    //设置为4s之后提交所有user信息，防止出现回调延时，数据为空
    setTimeout(function () {
      
    }, 4000) 
    
   
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
