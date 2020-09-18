// miniprogram/pages/release/release.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    show: false,
    isSelect: 0,
    placeholder: '详细的描述能让你更好的找回物品呢',
    actions: [
      {
        name: '证件'
      },
      {
        name: '书籍',
      },
      {
        name: '背包',
      },
      {
        name: '伞',
      },
      {
        name: '电子产品',
      },
      {
        name: '钥匙',
      },
      {
        name: '化妆品',
      },
      {
        name: '其他',
      }
    ],
    selectCon: '点击选择发布物品的类别',
    kind: '',
    titleValue: '',
    introValue: ''

  },
  titleInput:function(e){
    console.log(e.detail.value)
    this.setData({
      titleValue: e.detail.value
    })
  },
  introInput:function(e){
    console.log(e.detail.value)

    this.setData({
      introValue: e.detail.value
    })
  },
  switchSelect:function(event){
    console.log(event.currentTarget.dataset.id)
    if(event.currentTarget.dataset.id == 0) {
      this.setData({
        isSelect: event.currentTarget.dataset.id,
        placeholder: '详细的描述能让你更好的找回物品呢',
        kind: 'lost'
      })
    } else {
      this.setData({
        isSelect: event.currentTarget.dataset.id,
        placeholder: '失主一定很着急,写的要详细点呢',
        kind: 'found'
      })
    }
    
  },
  
  afterRead:function(event) {
    console.log(event);
    const { file } = event.detail;
    const{fileList=[]} = this.data;
    fileList.push({url:file.path});
    this.setData({fileList})
    console.log(fileList)
  },
  delete:function(event) {
    console.log(event)
    let imgDelIndex = event.detail.index
    let fileList = this.data.fileList
    fileList.splice(imgDelIndex,1)
    console.log('删除图片的',fileList)
    this.setData({
        fileList
    })
  },
  selectType:function() {
    this.setData({ show: true });

  },
  // onSelect:function(item) {
  //   console.log(item)
    // this.setData({ 
    //     show: false,
    //     selectCon: item.detail.name
    // });
  // },
  onCancel() {
    setTimeout(() => {
      this.setData({ show: false });

    }, 2000)
  },
  onSelect(event) {
    console.log(event.detail);
  //   let selectCon = event.detail.name
  //   this.setData({ 
  //     show: false,
  //     selectCon: selectCon
  // });
  },



  //调用云函数,把发布的数据添加到数据库里
  release: function () {
    const self = this
    wx.cloud.callFunction({
      name:'release',
      data: {
        Images: self.data.fileList,
        tag: self.data.selectCon,
        kind: self.data.kind,
        title: self.data.titleValue,
        intro: self.data.introValue,
        fileList: self.data.fileList,

      },
      success(res) {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      backgroundColor: '#002859',
      frontColor: '#ffffff'
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