// pages/discover/discover.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   list:[],
   name:''
  },
  rankTodetail(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/goodsDetail/goodsDetail?goodid='+e.currentTarget.dataset.goodid,
    })
  },

  input(e){
    this.setData({
      name : e.detail.value
    })
  },
  search(e){
    wx.navigateTo({
      url: '/pages/search/search?name='+this.data.name,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    if(options.cate){
    wx.request({
      url: 'http://119.29.28.23:8888/goodscate',
      data:{
        cate : options.cate
      },
      success(res){
        console.log(res)
        that.setData({
          list : res.data
        })
        that.data.list.forEach(function (item, index) {
          console.log(item)
          var pic = item.picture;
          var pic = pic.split(',')[0];
          var tmp = that.data.list
          tmp[index]['pic'] = pic
          that.setData({
            list: tmp
          })
        })
      }      
    })
    return
  }else{
    wx.request({
      url: 'http://119.29.28.23:8888/goods',
      data:{
        name : options.name
      }, 
      success(res){
        console.log(res)
        that.setData({
          list : res.data
        })
        that.data.list.forEach(function (item, index) {
          console.log(item)
          var pic = item.picture;
          var pic = pic.split(',')[0];
          var tmp = that.data.list
          tmp[index]['pic'] = pic
          that.setData({
            list: tmp
          })
        })
      }    
    })
  }
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