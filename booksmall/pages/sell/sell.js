// pages/sell/sell.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    srcs: [],
    progress: 0,
    goodsname: '',
    goodtext: '',
    price: '',
    list: '',
    percent: 0,
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['哲学', '军事', '经济', '文学', '艺术', '生物科学', '农业科学', '工业技术', '交通运输', '综合性图书'], //下拉列表的数据
    index: 0, //选择的下拉列 表下标,
  },
  inputgoodsname(e) {
    this.setData({
      goodsname: e.detail.value
    })
  },
  inputgoodtext(e) {
    this.setData({
      goodtext: e.detail.value
    })
  },
  inputprice(e) {
    this.setData({
      price: e.detail.value
    })
  },

  chooseImage(e) {
    var that = this;
    console.log(e)
    wx.chooseImage({
      count: 9,
      success(res) {
        console.log(res.tempFilePaths)
        that.setData({
          srcs: res.tempFilePaths,
          percent:100
        })
        that.upload()
      }
    })
    this.setData({
      sign: true
    })
  },

  upload(e) {
    var that = this;
    that.data.srcs.forEach(function (value) {
        wx.uploadFile({
          url: "http://119.29.28.23:8888/upload",
          filePath: value,
          name: "singleFile",
          header: {
            "Content-Type": "multipart/form-data"
          },
          formData: {
            method: 'POST'
          },
          success: function (res) {
            var lists = that.data.list
            lists = lists + res.data + ','
            var pic = lists;
            pic = pic.split(',');
            // pic.splice(-1, 1)
            that.setData({
              list: pic,
              lists: lists
            })
            wx.showToast({
              title: "图像上传成功！",
              icon: "",
              duration: 1500,
              mask: true
            });
          },
          fail: function (res) {
            wx.showToast({
              title: "上传失败，请检查网络或稍后重试。",
              icon: "none",
              duration: 1500,
              mask: true
            });
          }
        })
      }
    )
  },
  confirmUpdate(e) {
    var that = this
    if (wx.getStorageSync('updategoodsid')) {
      wx.request({
        url: 'http://119.29.28.23:8888/goodsupdate',
        data: {
          id: wx.getStorageSync('updategoodsid'),
          name: that.data.goodsname,
          text: that.data.goodtext,
          price: that.data.price,
          picture: that.data.lists,
          cate: that.data.index,
          state: 0,
          userid: wx.getStorageSync('openid')
        },
        success(res) {
          wx.showToast({
            title: '上传成功',
            icon: 'success'
          })
        }
      })
    } else {
      wx.request({
        url: 'http://119.29.28.23:8888/goodsadd',
        data: {
          name: that.data.goodsname,
          text: that.data.goodtext,
          price: that.data.price,
          picture: that.data.lists,
          cate: that.data.index,
          userid: wx.getStorageSync('openid')
        },
        success(res) {
          console.log(res)
          that.setData({
            goodsname: '',
            goodtext: '',
            price: '',
            list: [],
            lists:'',
            srcs:''
          })
          wx.showToast({
            title: '上传成功',
            icon: 'success'
          })
        }
      })
    }
    wx.removeStorageSync('updategoodsid')
  },
  delete(e) {
    console.log(e)
    var index = e.currentTarget.dataset.id
    var list = this.data.list
    list.splice(index, 1)
    this.setData({
      list: list
    })
    var string = ""
    this.data.list.forEach(function (value, index, item) {
      console.log(item)
      string += value + ','
      console.log(index)
      console.log(value)
    })
    this.setData({
      lists: string
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
  onShow: function (options) {

    var that = this
    if (wx.getStorageSync('updategoodsid') || this.data.sign) {
      wx.request({
        url: 'http://119.29.28.23:8888/goodsid',
        data: {
          id: wx.getStorageSync('updategoodsid')
        },
        success(res) {
          console.log('789')
          console.log(res)
          if (res.data.length != 0) {
            var lists = res.data[0].picture
            // var lists = lists + res.data + ','
            lists = lists.substr(0, lists.length - 1)
            var pic = lists;
            pic = pic.split(',');
            pic.splice(-1, 1)
            that.setData({
              list: pic,
              lists: lists,
              goodsname: res.data[0].name,
              goodtext: res.data[0].text,
              price: res.data[0].price,
            })
          }
        }
      })

    } else {
      that.setData({
        goodsname: '',
        goodtext: '',
        price: '',
        list: [],
      })
    }
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

  },



  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show,
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    console.log(Index)
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },










})