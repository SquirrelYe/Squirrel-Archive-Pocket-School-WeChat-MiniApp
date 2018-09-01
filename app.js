App({
  
  globalData: {
    userInfo: null,
    openid:null,
    unionid:null,
    session_key:null,

    check_first:0, //取值0，1  0表示未授权userinfo信息，1表示已经授权userinfo信息
    url1:'https://www.yexuan.site',
    url:'http://localhost:11111',
    
    rz_type:'-1',
    authenticate:''
  },

  onLaunch: function () {
    var that = this;     
    wx.login({
      success: function (res) {          
        if (res.code) {
          console.log("JS_CODE\t------>\t"+res.code);
          wx.request({
            //获取openid接口  
            url: `${that.globalData.url}/openid_unionid`,
            data: {
              judge:'0',
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
              var OPEN_ID = res.data.openid;//获取到的openid  
              var SESSION_KEY = res.data.session_key;//获取到session_key  
              var UNION_ID = ''

              that.globalData.openid = OPEN_ID;
              that.globalData.unionid = UNION_ID;
              that.globalData.session_key = SESSION_KEY;

              console.log("OPEN_ID\t------>\t"+OPEN_ID);
              console.log("SESSION_KEY\t------>\t"+SESSION_KEY);

              wx.request({
                url: `${that.globalData.url}/authenticate`,
                data: {
                  judge: 1,
                  openid: that.globalData.openid
                },
                method: "GET",
                header: {
                  'content-type': 'application/json;charset=uft-8'
                },
                success: function (res) {
                  console.log(res.data);
                  if (res.data.length==0){
                    that.globalData.rz_type=-2;
                  }else{
                    that.globalData.rz_type = res.data[0].type,
                    that.globalData.authenticate=res.data
                  }
                },
                fail: function (res) {
                  console.log(res.data);
                }
              }) 
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
    var that = this;
    that.globalData.userInfo = res 
    console.log('获得相关信息-->',that.globalData.userInfo.nickName)
  },

  users: function (cb) {
    var that=this;
    wx.request({
      url: `${that.globalData.url}/yx?judge=2`,
      success: function (res) {
        cb(res.data);
      }
    })
  },
 

})