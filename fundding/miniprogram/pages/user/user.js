// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    releaseList: [
      {
        title: '寻找遗失的雨伞',
        intro: '今天下午两代年左右弄丢了这把黑色雨伞,有好心人捡到能通知我一声',
        date: '2020/9/9'
      },
      {
        title: '寻找遗失的雨伞',
        intro: '今天下午两代年左右弄丢了这把黑色雨伞,有好心人捡到能通知我一声',
        date: '2020/9/9'
      },
      {
        title: '寻找遗失的雨伞',
        intro: '今天下午两代年左右弄丢了这把黑色雨伞,有好心人捡到能通知我一声',
        date: '2020/9/9'
      },
      {
        title: '寻找遗失的雨伞',
        intro: '今天下午两代年左右弄',
        date: '2020/9/9'
      }
    ]
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