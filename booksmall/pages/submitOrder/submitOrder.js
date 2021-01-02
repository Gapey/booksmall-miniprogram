// pages/submitOrder/submitOrder.js
var time = require('../../utils/time.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsname: '',
    price: '',
    number: '',
    goodsid: '',
    goodslist: [],
    allprice: '',
    name: '',
    head:'',
    phone: '',
    address: '',
    remark: ''
  },
  inputphone(e){
    this.setData({
      phone : e.detail.value
    })
  },
  inputaddress(e) {
    this.setData({
      address: e.detail.value
    })
  },
  inputremark(e) {
    this.setData({
      remark: e.detail.value
    })
  },
  finish(e) {
    var that = this
    that.data.goodslist.forEach(function(item,value,index){
    console.log(item)
    wx.request({
      url: 'http://119.29.28.23:8888/orderadd',
      data: {
        goodsid: item.goodsid,
        buyid: wx.getStorageSync('openid'),
        sellid: item.userid,
        datetime: time.formatTime(Date.parse(new Date()), 'Y/M/D h:m:s'),
        state: '0',
        address: that.data.address,
        phone : that.data.phone,
        remark: that.data.remark
      },
      success(res){
        wx.showToast({
          title: '提交成功',
          icon:'success'
        })
      }
    })
    wx.request({
      url: 'http://119.29.28.23:8888/cartdel',
      data: {
        goodsid: item.goodsid,
        userid: wx.getStorageSync('openid')
      },
    })
    wx.request({
      url: 'http://119.29.28.23:8888/goodsstate',
      data:{
        id: item.goodsid,
        state:2
      }
    })
  })
  wx.switchTab({
    url: '/pages/cart/cart',
  })
  },
  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://119.29.28.23:8888/userinfo',
      data:{
        id : wx.getStorageSync('openid')
      },
      success(res){
        that.setData({
          head:res.data[0].head
        })
      }
    })
    wx.request({
      url: 'http://119.29.28.23:8888/cartid',
      data: {
        userid: wx.getStorageSync('openid')
      },
      success(res) {
        console.log(res)
        if (!res.data.length) {
          that.setData({
            goodslist: ''
          })
          return
        }
        that.setData({
          goodslist: res.data
        })
        var m = 0
        for (var i = 0; i < that.data.goodslist.length; i++) {
          m += that.data.goodslist[i].number * that.data.goodslist[i].price
        }
        that.data.goodslist.forEach(function (item, index) {
          var pic = item.picture;
          pic = pic.split(',')[0];
          var tmp = that.data.goodslist
          tmp[index]['pic'] = pic
          that.setData({
            goodslist: tmp
          })
        })
        that.setData({
          allprice: m
        })
      }
    })
    wx.request({
      url: 'http://119.29.28.23:8888/userinfo',
      data: {
        id: wx.getStorageSync('openid')
      },
      success(res) {
        that.setData({
          name: res.data[0].name,
          phone: res.data[0].phone
        })
      }
    })
    var timestamp = Date.parse(new Date()); 
    var sjc = 1488481383;
    console.log(time.formatTime(Date.parse(new Date()), 'Y/M/D h:m:s'));
    // console.log(time.formatTime(sjc, 'h:m'));
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