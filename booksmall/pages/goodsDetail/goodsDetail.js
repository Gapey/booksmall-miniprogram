// pages/songList/songList.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodid: '',
    name: "",
    text: "",
    price: '',
    cate: '',
    state: "",
    picture: '',
    userid: "",
    username:'',
    head:''
  },

  addcart(e){
    var that =this
    wx.request({
      url: 'http://119.29.28.23:8888/cartadd',
      data:{
        userid:wx.getStorageSync('openid'),
        goodsid:that.data.goodid
      },
      success(res){
        wx.showToast({
          title: '添加成功',
          icon:'success'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    this.setData({
      goodid: options.goodid
    })
    wx.request({
      url: 'http://119.29.28.23:8888/goodsid',
      data: {
        id: options.goodid
      },
      success(res) {
        console.log(res)
        that.setData({
          name: res.data[0].name,
          text: res.data[0].text,
          price: res.data[0].price,
          cate: res.data[0].cate,
          state: res.data[0].state,
          picture: res.data[0].picture,
          userid: res.data[0].userid
        })
        var temp = res.data[0].picture;
        var pic = temp;
        var pic = pic.split(',');
        that.setData({
          list:pic
        })
        wx.request({
          url: 'http://119.29.28.23:8888/userinfo',
          data:{
            id : res.data[0].userid
          },
          success(res){
            console.log(res)
            that.setData({
              username: res.data[0].name,
              head: res.data[0].head
            })
          }
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