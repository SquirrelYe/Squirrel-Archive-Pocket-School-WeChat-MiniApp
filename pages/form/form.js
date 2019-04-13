const app = getApp()

Page({
  data: {
    formId:''
  },

  

  formSubmit: function (e) {
    // 显示当前formId
    this.setData({
      formId: e.detail.formId
    });
    console.log(this.data.formId)

    var msg = {
      "touser": app.globalData.openid,
      "template_id": "vsRRgwd-Dle56I-z-PK0BsYpGQiKKNr9h69OSTFTQx0",
      "page": "pages/index/index",
          "form_id": this.data.formId,
          "data": {
        "keyword1": {
          "value": "339208499"
        },
        "keyword2": {
          "value": "2015年01月05日 12:30"
        },
        "keyword3": {
          "value": "粤海喜来登酒店"
        },
        "keyword4": {
          "value": "广州市天河区天河路208号"
        },
        "keyword5": {
          "value": "339208499"
        },
        "keyword6": {
          "value": "2015年01月05日 12:30"
        },
        "keyword7": {
          "value": "粤海喜来登酒店"
        },
        "keyword8": {
          "value": "广州市天河区天河路208号"
        },
        "keyword9": {
          "value": "粤海喜来登酒店"
        },
        "keyword10": {
          "value": "广州市天河区天河路208号广州市天河区天河路208号广州市天河区天河路208号广州市天河区天河路208号广州市天河区天河路208号广州市天河区天河路208号广州市天河区天河路208号广州市天河区天河路208号广州市天河区天河路208号广州市天河区天河路208号广州市天河区天河路208号广州市天河区天河路208号广州市天河区天河路208号广州市天河区天河路208号广州市天河区天河路208号广州市天河区天河路208号广州市天河区天河路208号"
        }
      },
      "emphasis_keyword": "keyword1.DATA"
    }
    console.log(msg);
    this.sendTemplateMsg(msg);
    
  },

  sendTemplateMsg: function (msg) {
    var that = this;
    wx.request({
      //获取access_taken接口  
      url: `${app.globalData.url}/wx_api`,
      data: {
        judge: '3',
        access_token:app.globalData.access_token,
        data:msg
      },
      success: function (res) {
        console.log(res.data)
      },
      fail: function (res) {
        console.log(res.data);
      }
    })
  },

  onLoad: function () {
    console.log(app.globalData)
  },

  onShow: function () {

  },

  onPullDownRefresh: function () {
    console.log(app.globalData)
  },

  onReachBottom: function () {

  }

})