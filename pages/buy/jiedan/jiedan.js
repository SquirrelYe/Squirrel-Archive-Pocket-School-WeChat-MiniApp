const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: 3,
    color: '#000000',
    id: null,
    user: null, 
    number1:null,
    sex1: "../../../photo/boy.png",
    sex2: "../../../photo/gril.png",
    kind: "../../../photo/kind.png",
    xiang: "../../../photo/xiang.png",
    xiang_text: '详',

    judge:0  //判断是否下单成功，更新前端显示，0表示未下单，1表示已下单
  },

  add: function () {
    var i = this.data.money;
    if (i >= 3) {
      i++;
      this.setData({ money: i, color: '#000000' });
    }
    //console.log(i);
  },

  sub: function () {
    var i = this.data.money;
    if (i > 3) {
      i--;
      this.setData({ color: '#000000' });
    }
    this.setData({ money: i });

    if (i == 3) {
      this.setData({ color: '#a6a6a6' });
    }

  },

  get: function () {  
    var that=this;  
    console.log(this.data.number1);
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `${app.globalData.url}/jiedan`, //接单接口
      data: {
        judge:'0',
        openid: app.globalData.openid,
        number: this.data.number1
      },
      method: "GET",
      header: {
        'content-type': 'application/json;charset=uft-8'  // 默认值
      },
      success: function (res) {
        console.log(res.data);      
        wx.hideLoading(),
          wx.showLoading({
            title: '下单成功',
            duration: 2000
          }) 
        that.setData({ judge: 1});          
      },
      fail: function (res) {
        console.log("请求失败");
        wx.hideLoading()
      }
    })
  },
  get_jiedan:function(){
    wx.showToast({
      title: '不行哦^_^',
      icon: 'loading',
      image:'../../../photo/loading.png',
      duration: 2000
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 把接收到的字符串转换成json对象
    var userInfo = JSON.parse(options.user);
    this.setData({
      user: userInfo, id: userInfo.type, number1: userInfo.number
    });
    console.log(options.user);
    if (userInfo.conditions==1){
      this.setData({
        judge:0
      });
    }else{
      this.setData({
        judge: 1
      });
    }
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