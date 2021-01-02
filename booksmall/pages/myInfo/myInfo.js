// pages/my/my.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    name: '',
    sex: '',
    city: '',
    phone: '',
    head:''
  },

  inputid: function (e) {
    this.setData({
      id: e.detail.value
    })
  },
  inputname: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  inputsex: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },
  inputbirthday: function (e) {
    this.setData({
      city: e.detail.value
    })
  },
  inputphone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  confirmUpdate(e) {
    var that = this
    wx.request({
      url: 'http://119.29.28.23:8888/userupdate',
      data: {
        id: wx.getStorageSync('openid'),
        name: that.data.name,
        sex: that.data.sex,
        city: that.data.city,
        phone: that.data.phone
      },
      success(res) {
        wx.showToast({
          title: '修改成功',
          icon:'success'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://119.29.28.23:8888/userinfo',
      data: {
        id: wx.getStorageSync('openid')
      },
      success(res) {
        console.log(res)
        that.setData({
          id: res.data[0].id,
          name: res.data[0].name,
          sex: res.data[0].sex,
          city: res.data[0].city,
          phone: res.data[0].phone,
          head:res.data[0].head
        })
      }
    })
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