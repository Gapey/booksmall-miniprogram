// pages/cart/cart.js
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
    allprice:''
 
  },
  del(e) {
    console.log(e)
    var that = this
    wx.request({
      url: 'http://119.29.28.23:8888/cartdel',
      data: {
        goodsid: e.currentTarget.dataset.id,
        userid: wx.getStorageSync('openid')
      },
      success() {
        wx.showToast({
          title: '删除成功',
          icon: 'success'
        })
        that.onLoad()
      }
    })
    this.onShow()
  },
  update(e){
    var that=this
    console.log(e)
    if(e.currentTarget.dataset.id=='-'&&e.currentTarget.dataset.num>1){
      var n = e.currentTarget.dataset.num-1
    }else if(e.currentTarget.dataset.id=='+'){
      var n = e.currentTarget.dataset.num+1
    }else{
      return
    }
    wx.request({
      url: 'http://119.29.28.23:8888/cartupdate',
      data:{
        goodsid:e.currentTarget.dataset.goodsid,
        userid:wx.getStorageSync('openid'),
        number:n
      },
      success(res){
        console.log(res)
        that.onShow()
      }
    })
  },
  finish(e){
    wx.navigateTo({
      url: '/pages/submitOrder/submitOrder',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // var that = this
    // wx.request({
    //   url: 'http://119.29.28.23:8888/cartid',
    //   data: {
    //     userid: wx.getStorageSync('openid')
    //   },
    //   success(res) {
    //     console.log(res)
    //     if (!res.data.length) {
    //       that.setData({
    //         goodslist: ''
    //       })
    //       return
    //     }
    //     that.setData({
    //       goodslist: res.data
    //     })
    //     var m=0
    //     for(var i=0;i<that.data.goodslist.length;i++){
    //       m+=that.data.goodslist[i].number*that.data.goodslist[i].price
    //     }
    //     that.setData({
    //       allprice:m
    //     })
    //     that.data.goodslist.forEach(function (item, index) {
    //       console.log(item)
    //       var pic = item.picture;
    //       var pic = pic.split(',')[0];
    //       var tmp = that.data.goodslist
    //       tmp[index]['pic'] = pic
    //       that.setData({
    //         goodslist: tmp
    //       })
    //     })
    //   }
    // })

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
    this.setData({
      allprice:0
    })
    var that = this
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
        var m=0
        for(var i=0;i<that.data.goodslist.length;i++){
          m+=that.data.goodslist[i].number*that.data.goodslist[i].price
        }
        that.setData({
          allprice:m
        })
        that.data.goodslist.forEach(function (item, index) {
          console.log(item)
          var pic = item.picture;
          var pic = pic.split(',')[0];
          var tmp = that.data.goodslist
          tmp[index]['pic'] = pic
          that.setData({
            goodslist: tmp
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