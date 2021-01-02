// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pic: ''
  },
  update(e){
    wx.setStorageSync('updategoodsid', e.currentTarget.dataset.goodid)
    wx.switchTab({
      url: '/pages/sell/sell',
    })
  },
  goodsup(e){
    wx.request({
      url: 'http://119.29.28.23:8888/goodsstate',
      data:{
        id:e.currentTarget.dataset.goodid,
        state: 0
      }
    })
    this.onLoad()
  },
  delete(e){
    wx.request({
      url: 'http://119.29.28.23:8888/goodsstate',
      data:{
        id:e.currentTarget.dataset.goodid,
        state: 1
      }
    })
    this.onLoad()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://119.29.28.23:8888/goodsuserid',
      data: {
        userid: wx.getStorageSync('openid')
      },
      success(res) {
        console.log(res)
        that.setData({
          list: res.data
        })
        that.data.list.forEach(function (item,index) {
          console.log(item)
          var pic = item.picture;
          var pic = pic.split(',')[0];
          var tmp = that.data.list
          tmp[index]['pic'] = pic
          that.setData({
            list:tmp
          })
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