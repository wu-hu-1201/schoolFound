// miniprogram/pages/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag:'',
    kind: [
      {
        _id: '0',
        img: '../../images/sort-b.png',
        title: '遗失的书',
        test: '我在上次吃饭的地方捡到了你的伞，就在浏阳蒸菜馆里面捡到的，看到了联系我来拿哦，我的联系QQ是：1871516072'
      },
      {
        _id: '1',
        img: '../../images/sort-b.png',
        title: '遗失的书',
        test: '金龙啊，我在上次吃饭的地方捡到了你的伞，就在浏阳蒸菜馆里面捡到的，看到了联系我来拿哦，我的联系QQ是：1871516072'
      },
      {
        _id: '2',
        img: '../../images/sort-u.png',
        title: '遗失的书',
        test: '金龙啊，我在上次吃饭的地方捡到了你的伞，就在浏阳蒸菜馆里面捡到的，看到了联系我来拿哦，我的联系QQ是：1871516072'
      },
      {
        _id: '3',
        img: '../../images/sort-bag.png',
        title: '遗失的书',
        test: '金龙啊，我在上次吃饭的地方捡到了你的伞，就在浏阳蒸菜馆里面捡到的，看到了联系我来拿哦，我的联系QQ是：1871516072'
      },
      {
        _id: '4',
        img: '../../images/sort-c.png',
        title: '遗失的书',
        test: '金龙啊，我在上次吃饭的地方捡到了你的伞，就在浏阳蒸菜馆里面捡到的，看到了联系我来拿哦，我的联系QQ是：1871516072'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },


  back: function() {
    wx.navigateBack({
      delta: 0
    });
  },

  goDetail: function(e) {
    console.log(e)
    wx.navigateTo({
      url: `../detail/detail?_id=${e.currentTarget.dataset._id}`
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