// pages/me/cus_checks/cus_checks.js
Page({

  data: {
    filter: '../../../photo/tangle_down.png',judge_filter:'1',
    dis:'no',
    dis_search:'no',judge_search:'1',
    putong_color: '#f8f8f8', kuaidi_color: '#f8f8f8', waimai_color:'#f8f8f8',
    judge_putong:'1',judge_kuaidi:'1',judge_waimai:'1',
    low_price:'0',high_price:'0',
    reset_txt:''
  },

  onLoad: function (options) {
   //接收到me界面传来openid信息
    var openid=options.openid;
    this.setData({
      order_openid: openid
    });
    console.log(this.data.order_openid);
  },
  nv_filter:function(){
      if(this.data.judge_filter=='1'){
        this.setData({
            judge_filter: '2',
            filter: '../../../photo/tangle_up.png',
            dis:'none'
        });
      }else{
        this.setData({
          judge_filter: '1',
          filter: '../../../photo/tangle_down.png',
          dis:'no'
        });
      }
  },
  nv_search: function () {
    if (this.data.judge_search == '1') {
      this.setData({
        dis_search: 'none',
        judge_search:'2'
      });
    } else {
      this.setData({
        dis_search: 'no',
        judge_search: '1'
      });
    }
  },
  filter_putong:function(){
    if (this.data.judge_putong == '1') {
      this.setData({
        putong_color: '#ffb366',
        judge_putong: '2'
      });
    } else {
      this.setData({
        putong_color:'#f8f8f8',
        judge_putong: '1'
      });
    }
  },
  filter_kuaidi: function () {
    if (this.data.judge_kuaidi == '1') {
      this.setData({
        kuaidi_color: '#ffb366',
        judge_kuaidi: '2'
      });
    } else {
      this.setData({
        kuaidi_color: '#f8f8f8',
        judge_kuaidi: '1'
      });
    }
  },
  filter_waimai: function () {
    if (this.data.judge_waimai == '1') {
      this.setData({
        waimai_color: '#ffb366',
        judge_waimai: '2'
      });
    } else {
      this.setData({
        waimai_color: '#f8f8f8',
        judge_waimai: '1'
      });
    }
  },
  filter_submit:function(){
    console.log(
      this.data.judge_putong,
      this.data.judge_kuaidi,
      this.data.judge_waimai,
      '-->',
      this.data.low_price,
      this.data.high_price
    )
  },
  filter_reset:function(){
    this.setData({
      putong_color: '#f8f8f8', kuaidi_color: '#f8f8f8', waimai_color: '#f8f8f8',
      judge_putong: '1', judge_kuaidi: '1', judge_waimai: '1',
    });
    this.setData({
      txt: '', 
      low_price: '0', high_price: '0',
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  search_submit:function(){
    console.log(this.data.inputValue)
  },
  low_price:function(e){
    this.setData({
      low_price: e.detail.value
    })
  },
  high_price: function (e) {
    this.setData({
      high_price: e.detail.value
    })
  },
  onReady: function () {
  
  },

  onShow: function () {
  
  },

  onHide: function () {
  
  },

  onUnload: function () {
  
  },

  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
  
  },

  onShareAppMessage: function () {
  
  }
})