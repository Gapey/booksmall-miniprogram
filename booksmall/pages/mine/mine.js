// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: "",
    name: "",
    avatarUrl: '',
    state: false
  }, 
  login(e) {
    var that = this;
    wx.login({
      success: function (res) {
        // console.log(res)
        if (!that.data.state) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: 'wxfda1cd189b4bc73f',
              secret: '4f6a62f9d1bf6cac0f125707ba988727',
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            success(res1) {
              // console.log(res1)
              wx.setStorageSync('openid', res1.data.openid)
              wx.getUserInfo({
                success(res) {
                  console.log(res)
                  wx.request({
                    url: 'http://119.29.28.23:8888/login',
                    data: {
                      openid: res1.data.openid,
                      name: res.userInfo.nickName,
                      head: res.userInfo.avatarUrl
                    },
                    success(res) {
                      wx.request({
                        url: 'http://119.29.28.23:8888/userinfo',
                        data: {
                          id: res1.data.openid,
                        },
                        success(res) {
                          console.log(res)
                          that.setData({
                            name: res.data[0].name,
                          })
                        }
                      })
                    }
                  })
                  // console.log(res)
                  that.setData({
                    avatarUrl: res.userInfo.avatarUrl,
                    userid: res1.data.openid,
                    state: true
                  })
                },
              })
            }
          })


        } else {
          console.log('登录失败！')
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.login()
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