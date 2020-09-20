// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    releaseList: [
    ],
    avatar: '',
    name: ''
  },

  //跳转进入发布页面
  ToRelease() {
    wx.navigateTo({
      url: '../release/release'
    })
  },

  // 带参进入详情界面
  goDetail: function(e) {
    console.log(e)
    wx.navigateTo({
      url: `../detail/detail?_id=${e.currentTarget.dataset._id}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await wx.cloud.callFunction({
      name:'getMyRelease',
      data: {
      }     
    }).then(res => {
      this.setData({
        releaseList: res.result.data
      })
    })
    let that = this
    await wx.getUserInfo({
      success:function(res){
       console.log(res);
       that.setData({
        avatar: res.userInfo.avatarUrl,
        name:res.userInfo.nickName,
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