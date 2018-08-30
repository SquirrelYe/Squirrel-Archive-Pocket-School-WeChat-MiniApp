const app = getApp()

Page({

  data: {
    id: 1,
    //相关信息组成
    renzheng: "未认证",
    name: '',
    xuehao: '',
    phone: '',
    judge_card:0,
    school_card:'../../../photo/school_card.png',
    school_card1: '',
    school_txt:'请上传你的学生证照片',
    img2:''
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
  renzheng: function () {
    console.log(
      app.globalData.openid,
      this.data.name ,
      this.data.xuehao ,
      this.data.phone );

      wx.request({
        url: `${app.globalData.url}/authenticate`,
        data: {

          // 物流信息
          judge:0,
          openid: app.globalData.openid,
          name: this.data.name,
          xuehao: this.data.xuehao,
          phone: this.data.school,
          rz_image:this.data.school_card1

        },
        method: "GET",
        header: {
          'content-type': 'application/json;charset=uft-8'  // 默认值
        },
        success: function (res) {
          console.log(res.data);
        },
        fail: function (res) {
          console.log("认证失败，请联系客服处理。");
        }
      })

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
              school_card1: `${app.globalData.url}/${JSON.parse(data).path}`,
              school_txt: '点击更换照片'
            });
            wx.showToast({
              title: '图片上传成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },

  onLoad: function (options) {

  },


})