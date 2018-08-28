//app.js
App({
  
  globalData: {
    userInfo: null,
    openid:null,
    unionid:null,
    session_key:null,

    check_first:0 //取值0，1  0表示未授权userinfo信息，1表示已经授权userinfo信息
  },

  onLaunch: function () {
      
      var that = this;    
      
      //获取openid & unionid(暂无)
      wx.login({
        success: function (res) {          
          if (res.code) {
            console.log("JS_CODE\t------>\t"+res.code);
            //发起网络请求
            wx.request({
              //获取openid接口  
              url: 'https://www.yexuan.site/Logistics_yx/openid_unionid',
              data: {
                appid: 'wx755d37a92190903e',
                secret: 'fe91a08b40b57a9b8bdfdc6485d90b49',
                js_code: res.code,
                grant_type: 'authorization_code'
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              method: 'GET',
              success: function (res) {
                console.log(res.data)
                var OPEN_ID = res.data[0].openid;//获取到的openid  
                var SESSION_KEY = res.data[0].session_key;//获取到session_key  
                var UNION_ID = res.data[0].unionid;

                that.globalData.openid = OPEN_ID;
                that.globalData.unionid = UNION_ID;
                that.globalData.session_key = SESSION_KEY;

                console.log("OPEN_ID\t------>\t"+OPEN_ID);
                console.log("SESSION_KEY\t------>\t"+SESSION_KEY);
                //console.log(OPEN_ID.length)
                //console.log(SESSION_KEY.length)
                
              },
              fail:function(res){
                console.log(res.data);
              }
            })
          }
          else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      }),

      //设置为4s之后提交所有user信息，防止出现回调延时，数据为空
        setTimeout(function () {
          //上传用户openid到服务器
         
        }, 10000)  

      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
            that.globalData.check_first = 0;
          }else{
            that.globalData.check_first = 1;
          }
        }
      })  
 },
  
  getuserinfo:function(res){
    //获取用户信息   
    this.globalData.userInfo = res 

    //上传用户openid到服务器
    wx.request({
      url: 'https://www.yexuan.site/Logistics_yx/users',
      data: {
        judge: '2',
        openid: this.globalData.openid,//app.globalData.openid,
        name: this.globalData.userInfo.nickName,
        icon_url: this.globalData.userInfo.avatarUrl,
        age: '20',
        love: '0',
        birthday: '1998-06-28',
        city: this.globalData.userInfo.province,
        sign: '原来我一直为你停留，甚至忘记了时间。'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
      }
    })
  },

  users: function (cb) {
    wx.request({
      url: 'https://www.yexuan.site/Logistics_yx/yx',
      success: function (res) {
        cb(res.data);
      }
    })
  },
 

})