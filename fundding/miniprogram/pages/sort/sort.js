// miniprogram/pages/sort/sort.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSort: true,
    showDetail: true,
    showBack: true,
    inputValue: null,
    searchKey: [],
    isShow: true,
    showClean: true,
    showSuggest: false,
    showHistory: true,
    showSearchResult: true,
    showView: true,
    history: [],
    searchSuggest: [],
    result: [],
    allThing: [
      {
        tag: '证件',
        des: []
      },
      {
        tag: '书籍',
        des: []
      },
      {
        tag: '背包',
        des: []
      },
      {
        tag: '伞',
        des: []
      },
      {
        tag: '化妆品',
        des: []
      },
      {
        tag: '电子产品',
        des: []
      },
      {
        tag: '钥匙',
        des: []
      },
      {
        tag: '其他',
        des: []
      },
    ],
  },


  // 点x将输入框的内容清空
  clearInput: function (e) {
    // console.log('a')
    this.setData({
      inputValue: '',
      showSuggest: false,
      showClean: true
    })
  },

  cancel: function () {
    this.setData({
      isShow: true,
      showView: true,
      showHistory: true,
      showClean: true,
      showSuggest: false,
      inputValue: '',
      showSearchResult: true
    })
  },

  //获取input文本并且实时搜索
  getSearchKey: function (e) {
    // console.log(e)
    if (e.detail.cursor === 0) {
      this.setData({
        showSuggest: false
      })
      return
    }
    console.log(e.detail.value) //打印出输入框的值
    if (e.detail.value) { // 当input框有值时，才显示清除按钮'x'
      this.setData({
        showClean: false,  // 出现清除按钮
        showSuggest: true,
        showView: false,
        isShow: false,
        inputValue: e.detail.value,
        // searchKey: e.detail.value
      })
      // console.log(this.data.searchKey)
      const self = this
      wx.cloud.callFunction({  // 调用云函数
        name: 'getSearchSuggest',
        data: {
          inputValue: self.data.inputValue,  // 把输入框的数据传递给数据库的信息
          kind: 'lost'
        },
        success(res) {
          console.log(res)
          self.setData({   // 将返回的数据给搜索建议数组
            searchSuggest: res.result
          })
        },
        fail(error) {
          console.log(error)
        }
      })
    }
  },




  // input失去焦点函数
  routeSearchResPage: function (e) {
    console.log(e.detail.value)
    console.log(this.data.searchKey.length)  
    if (this.data.inputValue) {  // 当搜索框有值的情况下才把搜索值存放到历史中，避免将空值存入历史记录
    let history = wx.getStorageSync("history") || [];
    history = history.filter(item => item !== this.data.inputValue)  // 历史去重
    history.unshift(this.data.inputValue)
    console.log(history)
    wx.setStorageSync("history", history);
    } else {
      return
    }
  },


  fill_value: async function (e) {
    console.log(e.currentTarget.dataset.value)
    this.setData({
      inputValue: e.currentTarget.dataset.value.trim(),//在输入框显示内容
      showSuggest: false, //给false值，隐藏搜索建议页面
      showClean: false, // 显示 清除按钮
      showHistory: true,
      showSearchResult: false,
      isShow: false,
      showView: false,
      showHistory: false,
      searchKey: e.currentTarget.dataset.value
    })
    console.log(this.data.inputValue)
    // this.getSearchKey()
    // 把此时点击的数值传给云函数，查找数据库中带有这个数值每条数据，并将数据返回给到数组searchResult
    let inputValue = this.data.inputValue;

    await wx.cloud.callFunction({  // 调用云函数
      name: 'getSearchSuggest',
      data: {
        inputValue: inputValue,
        kind: 'lost'
      },
    }).then(res => {
      console.log(res)
      this.setData({
        searchResult: res.result
      })
    })
  },


  // 清空page对象data的history数组 重置缓存为[]（空）
  clearHistory: function () {
    const that = this;
    wx.showModal({
      content: '确认清空全部历史记录',
      cancelColor: '#DE655C',
      confirmColor: '#DE655C',
      success(res) {
        if (res.confirm) {
          that.setData({
            history: []
          })
          wx.setStorageSync("history", []) //把空数组给history,即清空历史记录
        } else if (res.cancel) {
        }
      }
    })
  },



  lookInfo: function (e) {
    console.log(e)
    wx.navigateTo({
      url: `../information/information?tag=${e.currentTarget.dataset.tag}`
    })
  },

  goDetail: function (e) {
    console.log(e)
    wx.navigateTo({
      url: `../detail/detail?_id=${e.currentTarget.dataset._id}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  OnReady: function (options) {

  },

  /**
   * 生命周期函数--监听页面加载
   * 
   */
  onLoad: async function () {
    await wx.cloud.callFunction({
      name:'getList',
      data: {
        kind: 'found',
        tag: '全部',
      }     
    }).then(res => {
      console.log(res.result)
      this.setData({
        result: res.result.reverse()
      })
    })
    let list = this.data.allThing
    let resultList = this.data.result.reverse()
 
    list.forEach(item => {
      for(let one of resultList) {
       
        if (item.tag == one.tag){
          // console.log(item)
          // console.log(one)
          item.des.unshift(one)
        }
      } 
    });
    this.setData({
      allThing: list
    })
    console.log(this.data.allThing)
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      history: wx.getStorageSync("history") || []
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