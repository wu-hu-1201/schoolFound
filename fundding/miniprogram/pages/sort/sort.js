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
        tag: '证件',
        des: [
          {
            _id: '0',
            name: '护照',
            pic: '../../images/sort-c.png',
            title: '遗失的物品',
            time: '2020-9-10'
          },
          {
            _id: '1',
            name: '图书',
            pic: '../../images/sort-b.png',
            title: '遗失的物品',
            time: '2020-9-10'
          },
          {
            _id: '2',
            name: '雨伞',
            pic: '../../images/sort-u.png',
            title: '遗失的物品',
            time: '2020-9-10'
          },
          {
            _id: '3',
            name: '书包',
            pic: '../../images/sort-bag.png',
            title: '遗失的物品',
            time: '2020-9-10'
          }
        ]
      },
      {
        tag: '图书',
        des: [
          {
            name: '书',
            pic: '../../images/sort-b.png',
            title: '遗失的物品',
            time: '2020-9-10'
          },
          {
            name: '身份证',
            pic: '../../images/sort-c.png',
            title: '遗失的物品',
            time: '2020-9-10'
          },
          {
            name: '挎包',
            pic: '../../images/sort-bag.png',
            title: '遗失的物品',
            time: '2020-9-10'
          },
          {
            name: '太阳伞',
            pic: '../../images/sort-u.png',
            title: '遗失的物品',
            time: '2020-9-10'
          }
        ]
      },
      {
        tag: '私人物品',
        des: [
          {
            name: '双肩包',
            pic: '../../images/sort-bag.png',
            title: '遗失的物品',
            time: '2020-9-10'
          },
          {
            name: '课本',
            pic: '../../images/sort-b.png',
            title: '遗失的物品',
            time: '2020-9-10'
          },
          {
            name: '一卡通',
            pic: '../../images/sort-c.png',
            title: '遗失的物品',
            time: '2020-9-10'
          },
          {
            name: '遮阳伞',
            pic: '../../images/sort-u.png',
            title: '遗失的物品',
            time: '2020-9-10'
          }
        ]
      },
      {
        tag: '雨伞',
        des: [
          {
            name: '伞',
            pic: '../../images/sort-u.png',
            title: '遗失的物品',
            time: '2020-9-10'
          },
          {
            name: '画本',
            pic: '../../images/sort-b.png',
            title: '遗失的物品',
            time: '2020-9-10'
          },
          {
            name: '包',
            pic: '../../images/sort-bag.png',
            title: '遗失的物品',
            time: '2020-9-10'
          },
          {
            name: '水卡',
            pic: '../../images/sort-c.png',
            title: '遗失的物品',
            time: '2020-9-10'
          }
        ]
      },
    ],
    detail: [
      {
        photo: '../../images/info-logo1.png',
        test: '金龙啊，我在上次吃饭的地方捡到了你的伞，就在浏阳蒸菜馆里面捡到的，看到了联系我来拿哦，我的联系QQ是：1871516072',
        // images: [
        //   {img: '../../images/sort-u.png'}
        // ],
        time: '2020-09-15 13:14',
        images: [
          {img: '../../images/sort-u.png'},
          {img: '../../images/sort-b.png'},
          {img: '../../images/sort-c.png'}
        ]
      }
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
      showSongResult: false,
      showClean:true
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
    // console.log(e)
    if(e.detail.cursor === 0){
      this.setData({
        showSongResult: false
      })
      return
    }
    console.log(e.detail.value) //打印出输入框的值
    if (e.detail.value) { // 当input框有值时，才显示清除按钮'x'
      this.setData({
        showClean: false,  // 出现清除按钮
        showSongResult: true,
        inputValue: e.detail.value
      })

      // // 链接数据库
      // const db = wx.cloud.database()
      // var that = this
      // db.collection('groupList').where({
      //   // 使用正则查询，实现对搜索的模糊查询
      //   title: db.RegExp({
      //     // 搜索栏中的输入值作为规则进行匹配
      //     regexp: e.detail.value,
      //     options: 'i',
      //   }),
      // }).limit(8).get({
      //   success: res => {
      //     console.log(res)
      //     that.setData({
      //       searchSuggest: res.data
      //     })
      //   }
      // })


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

  fill_value: function (e) {
    console.log(e)
    this.setData({
      inputValue: e.currentTarget.dataset.value,//在输入框显示内容
      showSongResult: false, //给false值，隐藏搜索建议页面
      showClean: false, // 显示 清除按钮
    })
    console.log(this.data.inputValue)
    // this.getSearchKey()
    // 把此时点击的数值传给云函数，查找数据库中带有这个数值每条数据，并将数据返回给到数组searchResult
    let inputValue = this.data.inputValue 

    wx.cloud.callFunction({  // 调用云函数
      name: 'getSearchSuggest',
      data: {
        inputValue: inputValue,
        kind: 'lost'
      },
      // success(res) {
      //   console.log(res)
      //   this.setData({
      //     searchResult: res.result
      //   })
      // },
    }).then(res => {
      console.log(res)
        this.setData({
          searchResult: res.result
        })
    })
  },


  // input失去焦点函数
  routeSearchResPage: function (e) {
    // console.log(e.detail.value)
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

  lookInfo: function (e) {
    console.log(e)
    wx.navigateTo({
      url: `../information/information?tag=${e.currentTarget.dataset.tag}`
    })
  },

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