// miniprogram/pages/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageNum: true,
    isLeft: true,
    showNew: true,
    showOld: false,
    oldTime: [
      {
        img: '../../images/sort-c.png',
        time: '2020-9-10',
        place: '东华路靠近北区篮球场',
        logo: '../../images/info-logo2.png'
      },
      {
        img: '../../images/sort-b.png',
        time: '2020-9-10',
        place: '东华路靠近北区篮球场',
        logo: '../../images/info-logo1.png'
      },
      {
        img: '../../images/sort-u.png',
        time: '2020-9-10',
        place: '东华路靠近北区篮球场',
        logo: '../../images/info-logo2.png'
      },
      {
        img: '../../images/sort-bag.png',
        time: '2020-9-10',
        place: '东华路靠近北区篮球场',
        logo: '../../images/info-logo1.png'
      }
    ],
    newTime: [
      // {
      //   test: '金龙啊，我在上次吃饭的地方捡到了你的伞，就在浏阳蒸菜馆里面捡到的，看到了联系我来拿哦，我的联系QQ是：1871516072',
      //   logo: '../../images/info-logo1.png',
      //   author: 'Little丶元',
      //   authorTime: '2020-09-14',
      //   images: [
      //     {
      //       img: '../../images/sort-u.png'
      //     }
      //   ]
      // },
      {
        test: '金龙啊，我在上次吃饭的地方捡到了你的伞，就在浏阳蒸菜馆里面捡到的，看到了联系我来拿哦，我的联系QQ是：1871516072',
        logo: '../../images/info-logo2.png',
        author: 'Little丶元',
        authorTime: '2020-09-14',
        images: [
          {
            img: '../../images/sort-c.png'
          },
          {
            img: '../../images/sort-b.png'
          },
          {
            img: '../../images/sort-u.png'
          }
        ]
      },
      {
        test: '金龙啊，我在上次吃饭的地方捡到了你的伞，就在浏阳蒸菜馆里面捡到的，看到了联系我来拿哦，我的联系QQ是：1871516072',
        logo: '../../images/info-logo2.png',
        author: 'Little丶元',
        authorTime: '2020-09-14',
        images: [
          {
            img: '../../images/sort-c.png'
          },
          {
            img: '../../images/sort-b.png'
          },
          {
            img: '../../images/sort-u.png'
          }
        ]
      },
      {
        test: '金龙啊，我在上次吃饭的地方捡到了你的伞，就在浏阳蒸菜馆里面捡到的，看到了联系我来拿哦，我的联系QQ是：1871516072',
        logo: '../../images/info-logo2.png',
        author: 'Little丶元',
        authorTime: '2020-09-14',
        images: [
          {
            img: '../../images/sort-c.png'
          },
          {
            img: '../../images/sort-b.png'
          },
          {
            img: '../../images/sort-u.png'
          }
        ]
      },
      // {
      //   test: '金龙啊，我在上次吃饭的地方捡到了你的伞，就在浏阳蒸菜馆里面捡到的，看到了联系我来拿哦，我的联系QQ是：1871516072',
      //   logo: '../../images/info-logo1.png',
      //   author: 'Little丶元',
      //   authorTime: '2020-09-14',
      //   images: [
      //     {
      //       img: '../../images/sort-b.png'
      //     }
      //   ]
      // },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showLoading({
    //   title: '加载中',
      
    // },);

  },

  tabChangeNew(){
    this.setData({
      isLeft: true,
      showNew: true,
      showOld: false
    })
  },

  tabChangeOld(){
    this.setData({
      isLeft: false,
      showNew: false,
      showOld: true
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