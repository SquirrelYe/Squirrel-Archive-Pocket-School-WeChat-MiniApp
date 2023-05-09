const app = getApp();
var util = require('../../../utils/util.js');
Page({
  data: {
    money: 3,
    color: '#000000',
    id: null,
    user: null,
    number1: null,
    item_info: '',
    sex1: '../../../photo/boy.png',
    sex2: '../../../photo/gril.png',
    kind: '../../../photo/kind.png',
    xiang: '../../../photo/xiang.png',
    xiang_text: '详',

    judge: 0, //判断是否下单成功，更新前端显示，0表示未下单，1表示已下单
    formId: '',
    msg: '',
    time: '2018-11-18 14:28:08' //2018-11-18 14:28:08
  },

  formSubmit: function (e) {
    // 保存formId
    this.setData({
      formId: e.detail.formId
    });
    var time = util.formatTime_simple(new Date());
    var msg = {
      touser: app.globalData.openid,
      template_id: 'vsRRgwd-Dle56I-z-PK0BsYpGQiKKNr9h69OSTFTQx0',
      page: 'pages/index/index',
      form_id: this.data.formId,
      data: {
        keyword1: {
          value: `${time}` + ' ' + `${this.data.item_info.number}`
        },
        keyword2: {
          value: `${this.data.item_info.sum}`
        },
        keyword3: {
          value: `${this.data.item_info.nickname}`
        },
        keyword4: {
          value: `${this.data.item_info.money}`
        },
        keyword5: {
          value: `${this.data.item_info.key_phone}`
        },
        keyword6: {
          value: `${this.data.item_info.conditions}`
        },
        keyword7: {
          value: `${this.data.item_info.log_to}`
        },
        keyword8: {
          value: `${this.data.item_info.log_from}`
        },
        keyword9: {
          value: `${this.data.item_info.time_log}`
        },
        keyword10: {
          value: `${this.data.item_info.details}`
        }
      },
      emphasis_keyword: 'keyword1.DATA'
    };

    // 保存msg
    this.setData({
      msg: msg
    });
    //this.sendTemplateMsg(msg);
  },

  sendTemplateMsg: function () {
    var that = this;
    wx.request({
      //获取access_taken接口
      url: `${app.globalData.url}/wx_api`,
      data: {
        judge: '3',
        access_token: app.globalData.access_token,
        data: that.data.msg
      },
      success: function (res) {
        console.log(res.data),
          wx.showLoading({
            title: '领取成功',
            duration: 2000
          });
        that.setData({ judge: 1 });
      },
      fail: function (res) {
        console.log(res.data);
      }
    });
  },

  add: function () {
    var i = this.data.money;
    if (i >= 3) {
      i++;
      this.setData({ money: i, color: '#000000' });
    }
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
    var that = this;
    console.log(this.data.number1);
    wx.showLoading({
      title: '加载中'
    });
    if (that.data.user != null && app.globalData.openid != null) {
      wx.request({
        url: `${app.globalData.url}/jiedan`, //接单接口
        data: {
          judge: '0',
          number: this.data.number1,
          types: that.data.user.type,
          openid_tak: app.globalData.openid,
          tak_name: app.globalData.userInfo.nickName,
          conditions: '1',
          tak_phone: '17695796264'
        },
        success: function (res) {
          console.log(res.data);
          //发送模板消息
          that.sendTemplateMsg();
          wx.hideLoading();
        },
        fail: function (res) {
          console.log('请求失败');
          wx.hideLoading();
        }
      });
    } else {
      wx.hideLoading(),
        wx.showLoading({
          title: '下单失败',
          duration: 2000
        });
    }
  },

  get_jiedan: function () {
    wx.showToast({
      title: '已经被他人领取啦^_^',
      icon: 'none',
      duration: 2000
    });
  },

  onLoad: function (options) {
    // 把接收到的字符串转换成json对象
    var userInfo = JSON.parse(options.user);
    this.setData({
      user: userInfo,
      id: userInfo.type,
      number1: userInfo.number,
      item_info: userInfo,
      time: String(userInfo.time)
    });
    console.log(options.user);
    if (userInfo.conditions == 1) {
      this.setData({
        judge: 0
      });
    } else {
      this.setData({
        judge: 1
      });
    }
  },

  onPullDownRefresh: function () {},

  onReachBottom: function () {}
});
