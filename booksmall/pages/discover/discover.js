// pages/discover/discover.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    name: '',
    cate: [{
        id: 0,
        pic: "/images/书本01.png",
        name: "哲学"
      },
      {
        id: 1,
        pic: "/images/书本02.png",
        name: "军事"
      },
      {
        id: 2,
        pic: "/images/书本03.png",
        name: "经济"
      },
      {
        id: 3,
        pic: "/images/书本04.png",
        name: "文学"
      },
      {
        id: 4,
        pic: "/images/书本05.png",
        name: "艺术"
      },
      {
        id: 5,
        pic: "/images/书本06.png",
        name: "生物科学"
      },
      {
        id: 6,
        pic: "/images/书本07.png",
        name: "农业科学"
      },
      {
        id: 7,
        pic: "/images/书本08.png",
        name: "工业技术"
      },
      {
        id: 8,
        pic: "/images/书本09.png",
        name: "交通运输"
      },
      {
        id: 9,
        pic: "/images/书本10.png",
        name: "综合性图书"
      },
    ]
  },

  input(e) {
    this.setData({
      name: e.detail.value
    })
  },
  search(e) {
    wx.navigateTo({
      url: '/pages/search/search?name=' + this.data.name,
    })
  },
  togoods(e) {
    wx.navigateTo({
      url: '/pages/goodsDetail/goodsDetail?goodid=' + e.currentTarget.dataset.id,
    })
  },
  cate(e) {
    wx.navigateTo({
      url: '/pages/search/search?cate=' + e.currentTarget.dataset.id,
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
    var that = this
    wx.request({
      url: 'http://119.29.28.23:8888/goodsall',
      success(res) {
        that.setData({
          list: res.data
        })
        that.data.list.forEach(function (item, index) {
          var pic = item.picture;
          pic = pic.split(',')[0];
          var tmp = that.data.list
          tmp[index]['pic'] = pic
          that.setData({
            list: tmp
          })
        })
      }
    })
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