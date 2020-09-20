// miniprogram/pages/lost/lost.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    categoryList: [
      '全部',
      '证件',
      '书籍',
      '伞',
      '其他'
    ],
    clickNum: 0,
    selectCategory: []

    
  },

  // 点击展示不同类型的物品
  clickSelected: function (e) {

    //先跳转
    this.setData({
      clickNum: e.target.dataset.num,
    })

    wx.cloud.callFunction({
      name:'getList',
      data: {
        kind: 'lost',
        tag: e.target.dataset.tag,
      }     
    }).then(res => {
      this.setData({
        selectCategory: res.result.reverse()
      })
    })

      
    
   
  },

  //跳转进入发布页面
  ToRelease() {
    wx.navigateTo({
      url: '../release/release'
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
    this.setData({
      clickNum: 0
    })
    //数据更新并缓存
    
      wx.cloud.callFunction({
        name:'getList',
        data: {
          kind: 'lost',
          tag: '全部',
        }     
      }).then(res => {
        this.setData({
          selectCategory: res.result.reverse(),
 
        })
      })
    
    // this.setData({
    //   selectCategory: this.data.selectCategory0
    // })
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      selectCategory: this.data.selectCategory0
    })
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