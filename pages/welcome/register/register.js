const app = getApp()
Page({
  data: {
    e_mail:'',
    check_mail:'0',
    code:'',
    code_finished:'0',
    array: ['点击选择学校（暂只支持天津地区）', '南开大学', '天津大学', '中国民航大学', '天津城建大学', '天津职业技术师范大学',
      '天津工业大学', '天津科技大学', '天津理工大学', '天津医科大学', '天津中医药大学', '天津师范大学',
      '天津财经大学', '天津商业大学', '天津天狮学院', '天津农学院', '天津外国语大学', '天津体育学院',
      '天津音乐学院', '天津美术学院'],
    school:'',
    school_index: 0,
    gander:'',
    name:''
  },

  c_boy:function(){
    this.setData({ gander:'1' });
  },
  c_gril: function () {
    this.setData({ gander: '2' });
  },
  d1: function (e) {
    this.setData({ name: e.detail.value });
  },
  
  d3:function(e){
    this.setData({ e_mail: e.detail.value });
    if (this.data.e_mail.length != 0) {
      this.setData({ check_mail: '1' });
    } else {
      this.setData({ check_mail: '0' });
    }
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', `${e.detail.value}`)
    this.setData({
      school_index: e.detail.value,
      school: `${e.detail.value}`
    })
  },
  check_mail:function(e){
    if (this.data.code == e.detail.value) {
      wx.showToast({
        title: '验证成功！',
        icon: 'success'
      })
      this.setData({ check_mail: '0', code_finished: '1' });
    } else {

    }
  },
  register:function(){
    if (this.data.code_finished=='0'){
      wx.showToast({
        title: '没有输入邮箱哦',
        icon:'none'
      })
    }else if(this.data.name==''||this.data.school==''||this.data.gander==''){
      wx.showToast({
        title: '不能不选择或者输入为空。',
        icon: 'none'
      })
    }
    else{
      console.log(
        this.data.gander,
        this.data.name,
        this.data.school_index,
        this.data.e_mail,
      )
      wx.showLoading({
        title: '正在挤进大家庭中ing……',
      })
      wx.request({
        url: `${app.globalData.url}/users`,
        data: {
          judge: '2',
          openid: app.globalData.openid,
          name: app.globalData.userInfo.nickName,
          real_name:this.data.name,
          gander:this.data.gander,
          school: this.data.school,
          grade:'1',
          e_mail:this.data.e_mail,
          create_time:'dont',
          icon_url: app.globalData.userInfo.avatarUrl,
          age: '20',
          love: '0',
          birthday: '1998-06-28',
          city: app.globalData.userInfo.province,
          sign: '原来我一直为你停留，甚至忘记了时间。'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'GET',
        success: function (res) {
          console.log(res)
          if (res.data.affectedRows==1){
            wx.hideLoading();
            wx.showToast({
              title: '加入成功！',
              icon:'success'
            })
            wx.switchTab({
              url: '../../index/index',
            })
          }
        },
        fail: function (res) {
          console.log(res.data);
        }
      })
    }
  },
  yz: function () {
    var that = this;
    wx.showLoading({
      title: 'e-Mail sending...',
    })
    wx.request({
      url: `${app.globalData.url}/mail`,
      data: {
        judge: 0,
        mail_address: that.data.e_mail,
        name: 'lala',
        code: that.data.code
      },
      method: "GET",
      header: {
        'content-type': 'application/json;charset=uft-8'
      },
      success: function (res) {
        console.log(res.data);
        wx.hideLoading();
        if (res.data.success == 'true') {
          wx.showToast({
            title: '邮件发送成功',
            icon: 'success'
          })
        }
      },
      fail: function (res) {
        console.log(res.data);
      }
    })
  },
  onLoad: function (options) {
    var code = '';
    for (var i = 0; i <= 5; i++) {
      code += Math.floor(Math.random() * 10);
    }
    this.setData({ code: code });
    console.log(code);
  }
})