// pages/login/login.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputSno: "",
    inputSpw: "",
    sno: app.globalData.sno,
    spw: app.globalData.spw,
    sname: app.globalData.sname,
    ssex: app.globalData.ssex,
    sage: app.globalData.sage,
    smajor: app.globalData.smajor,
    sphone: app.globalData.sphone,
    sphoto: app.globalData.sphoto,
  },

  inputSno: function (e) {
    this.setData({
      sno: e.detail.value,
    })
    console.log(e.detail.value)
  },

  inputSpw: function (e) {
    this.setData({
      spw: e.detail.value,
    })
    console.log(e.detail.value)
  },



  login: function (e) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/CMusic-0.0.1-SNAPSHOT/login',
      data: {
        // submitflag:login,
        sno: this.data.sno,
        spw: this.data.spw,
      },
      success: function (data) {
        console.log("跳转data", data)
        // wx.navigateTo({
        //   url: '/pages/mine/mine',
        // })
        // wx.switchTab()
        wx.request({
          url: 'http://localhost:8080/CMusic-0.0.1-SNAPSHOT/showinfo',
          data: {
            sno: that.data.sno,
            spw: that.data.spw,
          },
          success: (res) => {
            app.globalData.sno = res.data[0].sno
            app.globalData.spw = res.data[0].spw
            app.globalData.sname = res.data[0].sname
            app.globalData.ssex = res.data[0].ssex
            app.globalData.sage = res.data[0].sage
            app.globalData.smajor=res.data[0].smajor
            app.globalData.sphone = res.data[0].sphone
            app.globalData.sphoto = res.data[0].sphoto
            console.log("登录后全局变量", app.globalData.sno)
            console.log("登录后全局变量", app.globalData.sname)
            console.log("登录后全局变量", app.globalData.ssex)
          }
        })
        wx.switchTab({
          url: '/pages/mine/mine',
          success: (res) => {},
          fail: (res) => {},
          complete: (res) => {},
        })
      }
    })


  },

  regist: function (e) {
    wx.request({
      url: 'http://localhost:8080/CMusic-0.0.1-SNAPSHOT/regist',
      data: {
        // submitflag:login,
        sno: this.data.sno,
        spw: this.data.spw,
      },
      success: function (data) {
        console.log("跳转data", data)
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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