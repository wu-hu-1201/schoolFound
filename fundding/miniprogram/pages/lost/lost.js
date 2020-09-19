// miniprogram/pages/lost/lost.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    LostList: [
      {
        _id: '0',
        img: '../../images/sort-u.png',
        kind: 'lost',
        title: '寻找遗失的雨伞',
        categoryTag: '其他',
        intro:'今天下午两代年左右弄丢了这把黑色雨伞,有好心人捡到能通知我一声',
        upName: '金龙',
        date: '2020/9/9',
        avat: '../../images/sort-u.png',
      },
      {
        _id: '1',
        img: '../../images/sort-u.png',
        kind: 'lost',
        title: '寻找遗失的雨伞asdasdasdaaaaaa',
        categoryTag: '其他',
        intro:'今天下午两代年左右弄丢了这把黑色雨伞,有好心人捡到能通知我一声',
        upName: '金龙',
        date: '2020/9/9',
        avat: '../../images/sort-u.png',
      },
      {
        _id: '2',
        img: '../../images/sort-c.png',
        kind: 'lost',
        title: '寻找遗失的雨伞',
        categoryTag: '证件',
        intro:'今天下午两代年左右弄丢了这把黑色雨伞,有好心人捡到能通知我一声',
        upName: '金龙',
        date: '2020/9/9',
        avat: '../../images/sort-u.png',
      },
      {
        _id: '3',
        img: '../../images/sort-bag.png',
        kind: 'lost',
        title: '寻找遗失的雨伞',
        categoryTag: '贵重物品',
        intro:'今天下午两代年左右弄丢了这把黑色雨伞,有好心人捡到能通知我一声',
        upName: '金龙',
        date: '2020/9/9',
        avat: '../../images/sort-u.png',
      },
      {
        _id: '4',
        img: '../../images/sort-b.png',
        kind: 'book',
        title: '寻找遗失的雨伞',
        categoryTag: '书籍',
        intro:'今天下午两代年左右弄丢了这把黑色雨伞,有好心人捡到能通知我一声',
        upName: '金龙',
        date: '2020/9/9',
        avat: '../../images/sort-u.png',
      }
    ],
    categoryList: [
      '全部',
      '证件',
      '书籍',
      '贵重物品',
      '其他'
    ],
    clickNum: 0,
    selectCategory: []
    
  },

  // 点击展示不同类型的物品
  clickSelected: function (e) {
    if( !this.data.LostList) {
      return
    }
    let array = []
    this.data.LostList.forEach((item) => {
      if(e.target.dataset.num != 0){
        if(item.categoryTag == this.data.categoryList[e.target.dataset.num] ) {
          array.push(item)
          console.log('11')
        } 
      // }else if ( this.data.categoryList[e.target.dataset.num] == '其他' || item.categoryTag === '其他' || item.categoryTag !== '证件' || item.categoryTag !== '书籍'|| item.categoryTag !== '贵重物品') {
      //     array.push(item)
      //   }
      } else {
        array.push(item)
        console.log('111')
      }
    })
    this.setData({
      clickNum: e.target.dataset.num,
      selectCategory: array
    })
  },

  //跳转进入发布页面
  ToRelease() {
    wx.navigateTo({
      url: '../release/release'
    })
    
    wx.hideTabBar()
  },
  change(){
    wx.setNavigationBarColor({
      backgroundColor: '#7AB9E2',
      frontColor: '#ffffff'
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
      selectCategory: this.data.LostList
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