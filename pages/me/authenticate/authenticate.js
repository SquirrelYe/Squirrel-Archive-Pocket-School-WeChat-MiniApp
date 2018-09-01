const app = getApp()

Page({

  data: {
    rz_type: '',
    authenticateInit:'',
    authenticateInitIcon:'',
    
    name: '',
    school:'',
    xuehao:'',
    phone: '',
    e_mail:'',
    code:'',
    code_finished:'',
    check_code:'',
    judge_card:0,
    school_card:'../../../photo/school_card.png',
    school_card1: '',
    school_txt:'请上传你的学生证照片',
    img2:'',
    check_mail:'0',
    isArrive:'false',
    array: ['点击选择学校（暂只支持天津地区）','南开大学', '天津大学', '中国民航大学', '天津城建大学', '天津职业技术师范大学',
      '天津工业大学', '天津科技大学', '天津理工大学', '天津医科大学', '天津中医药大学', '天津师范大学',
      '天津财经大学', '天津商业大学', '天津天狮学院', '天津农学院', '天津外国语大学', '天津体育学院',
      '天津音乐学院', '天津美术学院'],
    school_index: 0
  },

  d1: function (e) {
    this.setData({ name: e.detail.value });
  },
  d2: function (e) {
    this.setData({ xuehao: e.detail.value });
  },
  d3: function (e) {
    this.setData({ phone: e.detail.value });
  },
  d4: function (e) {
    this.setData({ e_mail: e.detail.value });
    if(this.data.e_mail.length!=0){
      this.setData({ check_mail: '1' });
    }else{
      this.setData({ check_mail: '0' });
    }
  },
  d5: function (e) {
    this.setData({ check_code: e.detail.value });
    if (this.data.check_code== this.data.code) {
      wx.showToast({
        title: '验证成功！',
        icon:'success'
      })
      this.setData({ check_mail: '0', code_finished:'1' });
    } else {

    }
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', `${e.detail.value}`)
    this.setData({
      school_index: e.detail.value,
      school: `${e.detail.value}`
    })
  },
  renzheng: function () {
    console.log('认证信息--->',
      app.globalData.openid,
      this.data.name ,
      this.data.school,
      this.data.xuehao ,
      this.data.phone,
      this.data.e_mail
      );
    if (this.data.school_card1==''){
      wx.showModal({
        title: '惹……图片嘞',
        content: '快点。上传认证图片！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    else if (this.data.code_finished == '') {
      wx.showModal({
        title: '惹……赶紧认证邮箱',
        content: '快点。赶紧认证邮箱！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    else{
      wx.request({
        url: `${app.globalData.url}/authenticate`,
        data: {
          judge: 0,
          type: '0',
          openid: app.globalData.openid,
          name: this.data.name,
          school: this.data.school,
          xuehao: this.data.xuehao,
          phone: this.data.phone,
          e_mail: this.data.e_mail,
          rz_icon: this.data.img2
        },
        method: "GET",
        header: {
          'content-type': 'application/json;charset=uft-8'  // 默认值
        },
        success: function (res) {
          console.log(res.data);
          wx.showModal({
            title: '等待认证ing...',
            content: '认证信息正在发往后台小哥哥，小哥哥会将结果通过邮箱发送给你。',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        },
        fail: function (res) {
          console.log("认证失败，请联系客服处理。");
        }
      })
    }     

  },

  choose_img: function () {
    if (this.data.judge_card == 0) {
      this.img();
    }else{
      this.img1();
    }
  },
  img: function () {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log(res);
        wx.uploadFile({
          url: `${app.globalData.url}/authenticate?judge=6&openid=${app.globalData.openid}`,
          //图片上传，重命名为openid，保证唯一性。
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            console.log(JSON.parse(data))
            that.setData({
              judge_card: 1,
              school_card1: `${app.globalData.url}/${JSON.parse(data).path}`,
              img2: `${JSON.parse(data).path}`,
              school_txt: '点击更换照片'
            });
            wx.showToast({
              title: '图片上传成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '惹……失败了',
          content: '咳咳，联系管理员同学处理...',
          success: function (res) {
            if (res.confirm) {
              console.log('-->联系管理员')
            } else if (res.cancel) {
              console.log('-->不联系')
            }
          }
        })
      }
    })
  },
  img1: function () {
    var that = this;
    console.log(this.data.school_card1)
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log(res);
        wx.uploadFile({
          url: `${app.globalData.url}/authenticate?judge=7&openid=${app.globalData.openid}&old_path=${that.data.img2}`,
          //图片上传，重命名为openid，保证唯一性。
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            console.log(JSON.parse(data))
            that.setData({
              judge_card: 1,
              school_card1: `${app.globalData.url}/${JSON.parse(data).path}?${Math.random()}`,
              img2: `${JSON.parse(data).path}`,
              school_txt: '点击更换照片'
            });
            wx.showToast({
              title: '图片上传成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (res) {
            wx.showModal({
              title: '惹……失败了',
              content: '咳咳，联系管理员同学处理...',
              success: function (res) {
                if (res.confirm) {
                  console.log('-->联系管理员')
                } else if (res.cancel) {
                  console.log('-->不联系')
                }
              }
            })
          }
        })
      }
    })
  },
  yz:function(){
    var that=this;
    wx.showLoading({
      title: 'e-Mail sending...',
    })
    wx.request({
      url: `${app.globalData.url}/mail`,
      data: {
        judge: 0,
        mail_address: that.data.e_mail,
        name:'lala',
        code:that.data.code
      },
      method: "GET",
      header: {
        'content-type': 'application/json;charset=uft-8' 
      },
      success: function (res) {
        console.log(res.data);
        wx.hideLoading();
        if (res.data.success=='true'){
          wx.showToast({
            title: '邮件发送成功',
            icon:'success'
          })
        }
      },
      fail: function (res) {
        console.log(res.data);        
      }
    })
  },
  renzheng1:function(){
      wx.showToast({
        title: '认真点...',
        icon:'loading'
      })
  },
  onLoad: function (options) {
    var code='';
    for(var i=0;i<=5;i++){
      code+=Math.floor(Math.random()*10);
    }
    this.setData({ code: code });
    console.log(code);

    this.setData({ rz_type: app.globalData.rz_type });
    console.log(app.globalData.rz_type)
    console.log(app.globalData.authenticate[0])
    if (app.globalData.rz_type!='-2'){
      this.setData({ 
        authenticateInit: app.globalData.authenticate[0] ,
        authenticateInitIcon: `${app.globalData.url}/${app.globalData.authenticate[0].rz_icon}`
      });
    }
    console.log(this.data.authenticateInitIcon)
  },

})