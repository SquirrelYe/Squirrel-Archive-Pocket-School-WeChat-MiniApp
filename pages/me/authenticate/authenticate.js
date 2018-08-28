const app = getApp()

Page({

  data: {
    id: 1,
    //相关信息组成
    renzheng: "未认证",
    name: '',
    xuehao: '',
    phone: '',
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

      // wx.request({
      //   url: 'https://www.yexuan.site/Logistics_yx/authenticate', //认证接口
      //   data: {

      //     // 物流信息
      //     judge:1,
      //     openid: app.globalData.openid,
      //     name: this.data.name,
      //     xuehao: this.data.xuehao,
      //     phone: this.data.school

      //   },
      //   method: "GET",
      //   header: {
      //     'content-type': 'application/json;charset=uft-8'  // 默认值
      //   },
      //   success: function (res) {
      //     console.log(res.data);
      //   },
      //   fail: function (res) {
      //     console.log("认证失败，请联系客服处理。");
      //   }
      // })

  },

  choose_img: function () {
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log(res);
        wx.uploadFile({
          url: 'https://www.yexuan.site/Logistics_yx/UploadServlet?id=' + app.globalData.openid, 
          //图片上传，重命名为openid，保证唯一性。
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            //do something
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