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
      '伞',
      '其他'
    ],
    clickNum: 0,
    selectCategory: [],
    selectCategory0: [],
    selectCategory1: [],
    selectCategory2: [],
    selectCategory3: [],
    selectCategory4: []
    
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
        selectCategory: res.result
      })
      //把数据从后台缓存下来
      if (e.target.dataset.tag =='全部') {
        this.setData({
          selectCategory0: this.data.selectCategory
        })
      }
      if (e.target.dataset.tag == '证件') {
        this.setData({
          selectCategory1: this.data.selectCategory
        })
      }
      if (e.target.dataset.tag == '书籍') {
        this.setData({
          selectCategory2: this.data.selectCategory
        })
      }
      if (e.target.dataset.tag == '伞') {
        this.setData({
          selectCategory3: this.data.selectCategory
        })
      }
      if (e.target.dataset.tag == '其他') {
        this.setData({
          selectCategory4: this.data.selectCategory
        })
      }
      
    })
   
  },

  //跳转进入发布页面
  ToRelease() {
    wx.navigateTo({
      url: '../release/release'
    })

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
    //数据更新并缓存
    if(!this.data.selectCategory0.length) {
      wx.cloud.callFunction({
        name:'getList',
        data: {
          kind: 'lost',
          tag: '全部',
        }     
      }).then(res => {
        this.setData({
          selectCategory: res.result,
          selectCategory0: res.result
        })
      })
    }
    if(!this.data.selectCategory1.length) {
      wx.cloud.callFunction({
        name:'getList',
        data: {
          kind: 'lost',
          tag: '证件',
        }     
      }).then(res => {
        this.setData({
          selectCategory: res.result,
          selectCategory1: res.result
        })
      })
    }
    if(!this.data.selectCategory2.length) {
      wx.cloud.callFunction({
        name:'getList',
        data: {
          kind: 'lost',
          tag: '书籍',
        }     
      }).then(res => {
        this.setData({
          selectCategory: res.result,
          selectCategory2: res.result
        })
      })
    }
    if(!this.data.selectCategory3.length) {
      wx.cloud.callFunction({
        name:'getList',
        data: {
          kind: 'lost',
          tag: '伞',
        }     
      }).then(res => {
        this.setData({
          selectCategory: res.result,
          selectCategory3: res.result
        })
      })
    }
    if(!this.data.selectCategory4.length) {
      wx.cloud.callFunction({
        name:'getList',
        data: {
          kind: 'lost',
          tag: '其他',
        }     
      }).then(res => {
        this.setData({
          selectCategory: res.result,
          selectCategory4: res.result
        })
      })
    }

  
    this.setData({
      selectCategory: this.data.selectCategory0
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