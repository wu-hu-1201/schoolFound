// miniprogram/pages/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag:'',
    result: [
      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    console.log(options)
    await wx.cloud.callFunction({
      name:'getList',
      data: {
        kind: 'found',
        tag: options.tag,
      }     
    }).then(res => {
      console.log(res.result)
      this.setData({
        result: res.result.reverse()
      })
    })
  },


  back: function() {
    wx.navigateBack({
      delta: 0
    });
  },

  goDetail: function(e) {
    console.log(e)
    wx.navigateTo({
      url: `../detail/detail?_id=${e.currentTarget.dataset.id}`
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