// miniprogram/pages/sort/sort.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: null,
    searchKey: [],
    isShow: true,
    showClean: true,
    showSuggest: true,
    showHistory: true,
    showView: true,
    history: [],
    searchSuggest: [],
    thing: [
      {
        img: '../../images/sort-card.png',
        text: '证件'
      },
      {
        img: '../../images/sort-book.png',
        text: '图书'
      },
      {
        img: '../../images/sort-thing.png',
        text: '物品'
      },
      {
        img: '../../images/sort-ubr.png',
        text: '雨伞'
      },
      {
        img: '../../images/sort-all.png',
        text: '分类'
      }

    ],
    allThing: [
      {
        title: '证件',
        des: [
          {
            name: '护照',
            pic: '../../images/sort-c.png',
            place: '南区食堂一楼',
            time: '2020-9-10'
          },
          {
            name: '图书',
            pic: '../../images/sort-b.png',
            place: '南区食堂一楼',
            time: '2020-9-10'
          },
          {
            name: '雨伞',
            pic: '../../images/sort-u.png',
            place: '南区食堂一楼',
            time: '2020-9-10'
          },
          {
            name: '书包',
            pic: '../../images/sort-bag.png',
            place: '南区食堂一楼',
            time: '2020-9-10'
          }
        ]
      },
      {
        title: '图书',
        des: [
          {
            name: '书',
            pic: '../../images/sort-b.png',
            place: '南区食堂一楼',
            time: '2020-9-10'
          },
          {
            name: '身份证',
            pic: '../../images/sort-c.png',
            place: '南区食堂一楼',
            time: '2020-9-10'
          },
          {
            name: '挎包',
            pic: '../../images/sort-bag.png',
            place: '南区食堂一楼',
            time: '2020-9-10'
          },
          {
            name: '太阳伞',
            pic: '../../images/sort-u.png',
            place: '南区食堂一楼',
            time: '2020-9-10'
          }
        ]
      },
      {
        title: '私人物品',
        des: [
          {
            name: '双肩包',
            pic: '../../images/sort-bag.png',
            place: '南区食堂一楼',
            time: '2020-9-10'
          },
          {
            name: '课本',
            pic: '../../images/sort-b.png',
            place: '南区食堂一楼',
            time: '2020-9-10'
          },
          {
            name: '一卡通',
            pic: '../../images/sort-c.png',
            place: '南区食堂一楼',
            time: '2020-9-10'
          },
          {
            name: '遮阳伞',
            pic: '../../images/sort-u.png',
            place: '南区食堂一楼',
            time: '2020-9-10'
          }
        ]
      },
      {
        title: '雨伞',
        des: [
          {
            name: '伞',
            pic: '../../images/sort-u.png',
            place: '南区食堂一楼',
            time: '2020-9-10'
          },
          {
            name: '画本',
            pic: '../../images/sort-b.png',
            place: '南区食堂一楼',
            time: '2020-9-10'
          },
          {
            name: '包',
            pic: '../../images/sort-bag.png',
            place: '南区食堂一楼',
            time: '2020-9-10'
          },
          {
            name: '水卡',
            pic: '../../images/sort-c.png',
            place: '南区食堂一楼',
            time: '2020-9-10'
          }
        ]
      },
    ]
  },

  show: function(){
    this.setData({
      isShow: false,
      showView: false,
      showHistory: false,
      showClean: false
    })
  },
  // 点x将输入框的内容清空
  clearInput: function (e) {
    // console.log('a')
    this.setData({
      inputValue: '',
      showSongResult: false
    })
  },
  cancel: function(){
    this.setData({
      isShow: true,
      showView: true,
      showHistory:true,
      showClean: true
    })
  },

  //获取input文本并且实时搜索
  getSearchKey: function (e) {
    console.log(e)
    // if(e.detail.cursor === 0){
    //   this.setData({
    //     showSongResult: false
    //   })
    //   return
    // }
    // console.log(e.detail) //打印出输入框的值
    // if (e.detail.cursor != this.data.cursor) { //实时获取输入框的值
    //   this.setData({
    //     showSongResult: true,
    //     searchKey: e.detail.value
    //   })
    //   this.searchSuggest();
    // }
    // if (e.detail.value) { // 当input框有值时，才显示清除按钮'x'
    //   this.setData({
    //     showClean: false  // 出现清除按钮
    //   })
    // }
  },

  // searchSuggest: function(e) {
  //   console.log(e)
  //   if(e.detail === allThing.des.name) {
  //     this.setData({

  //     })
  //   }
  // },

  // input失去焦点函数
  routeSearchResPage: function (e) {
    // console.log(e.detail.value)
    // console.log(this.data.searchKey)
    // console.log(this.data.searchKey.length)  
    if (this.data.searchKey.length > 0) {  // 当搜索框有值的情况下才把搜索值存放到历史中，避免将空值存入历史记录
      let history = wx.getStorageSync("history") || [];
      // console.log(history);
      history = history.filter(item => item !== this.data.searchKey)  // 历史去重
      history.unshift(this.data.searchKey)
      wx.setStorageSync("history", history);
    } 
  },

  // 搜索完成后(点击搜索建议的某一条即出搜索结果，搜索完成)
  searchOver: function () {
    this.setData({
      showSuggest: false  // 搜索建议这块容器消失
    })
    this.searchResult();  // 执行搜索结果
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