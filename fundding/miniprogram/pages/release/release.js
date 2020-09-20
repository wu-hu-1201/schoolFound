const utils = require('../../common/utils')

import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
const db = wx.cloud.database()
const projects = db.collection('projects')




// miniprogram/pages/release/release.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zIndex: 1000,
    isWarning: 0,
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
    kind: 'lost',
    titleValue: '',
    introValue: '',
    cloudPath:[]
  },


  back: function () {
    wx.navigateBack({
      delta: 0
    });
  },

  titleInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      titleValue: e.detail.value
    })
    if (this.data.titleValue == '') {
      this.setData({
        isWarning: 1
      })
    } else {
      this.setData({
        isWarning: 0
      })
    }
  },
  introInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      introValue: e.detail.value
    })
    if (this.data.introValue == '') {
      this.setData({
        isWarning: 3
      })
    } else {
      this.setData({
        isWarning: 0
      })
    }
  },
  switchSelect: function (event) {
    console.log(event.currentTarget.dataset.id)
    if (event.currentTarget.dataset.id == 0) {
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

  afterRead: function (event) {
    console.log(event);
    const { file } = event.detail;
    const { fileList = [] } = this.data;
    fileList.push({ url: file.path });
    this.setData({ fileList })
    console.log(fileList)
    if (!this.data.fileList.length) {
      this.setData({
        isWarning: 4
      })
    } else {
      this.setData({
        isWarning: 0
      })
    }

  },
  delete: function (event) {
    console.log(event)
    let imgDelIndex = event.detail.index
    let fileList = this.data.fileList
    fileList.splice(imgDelIndex, 1)
    console.log('删除图片的', fileList)
    this.setData({
      fileList
    })
    if (!this.data.fileList.length) {
      this.setData({
        isWarning: 4
      })
    } else {
      this.setData({
        isWarning: 0
      })
    }
  },
  selectType: function () {
    this.setData({ show: true });
  },

  onCancel() {
    setTimeout(() => {
      this.setData({ show: false });
    }, 1)
  },
  onClickOverlay() {
    setTimeout(() => {
      this.setData({ show: false });
    }, 1)
  },
  onSelect(event) {
    console.log(event.detail);
    let selectCon = event.detail.name
    setTimeout(() => {
      this.setData({
        show: false,
        selectCon: selectCon
      });
      if (this.data.selectCon == '点击选择发布物品的类别') {
        this.setData({
          isWarning: 2
        })
      } else {
        this.setData({
          isWarning: 0
        })
      }

    }, 1)

  },

  // 上传图片
  uploadToCloud() {
    
    let newFileList = []
    if (!this.data.fileList.length) {
      wx.showToast({ title: '请选择图片', icon: 'none' });
    } else {
      let tmpFileName = (+ new Date() + Math.floor(Math.random()*1000)).toString() + '.png'
      const uploadTasks = this.data.fileList.map((file, index) => {
        return wx.cloud.uploadFile({
          cloudPath: tmpFileName,
          filePath: file.url
        }); 
      })
      Promise.all(uploadTasks)
        .then(data => {
          wx.showToast({ title: '上传成功', icon: 'none' });
          data.map(item => { 
            newFileList.push({url: item.fileID})
          });
          this.setData({ fileList: newFileList, cloudPath: data});
          console.log(this.data.cloudPath, this.data.fileList)
        })
        .catch(e => {
          wx.showToast({ title: '上传失败', icon: 'none' });
          console.log(e);
        });
    }
  },


  //调用云函数,把发布的数据添加到数据库里
  release: async function () {
    let newFileList = []
    if (!this.data.fileList.length) {
      wx.showToast({ title: '请选择图片', icon: 'none' });
    } else {
      let tmpFileName = (+ new Date() + Math.floor(Math.random()*1000)).toString() + '.png'
      const uploadTasks = this.data.fileList.map((file, index) => {
        return wx.cloud.uploadFile({
          cloudPath: tmpFileName,
          filePath: file.url
        }); 
        
      })
      Promise.all(uploadTasks)
        .then(data => {
          wx.showToast({ title: '上传成功', icon: 'none' });
          data.map(item => { 
            newFileList.push({url: item.fileID})
          });
          this.setData({ fileList: newFileList, cloudPath: data});
          console.log(this.data.cloudPath, this.data.fileList)
          


          let date = utils.getNowFormatDate()
    const self = this
    if (this.data.titleValue && this.data.introValue && this.data.selectCon != '点击选择发布物品的类别' && this.data.fileList.length) {
      wx.cloud.callFunction({
        name: 'release',
        data: {
          images: self.data.fileList,
          tag: self.data.selectCon,
          kind: self.data.kind,
          title: self.data.titleValue,
          intro: self.data.introValue,
          date: date
        }
      }).then(res => {
        console.log(res)
      })
      Notify({ type: 'success', message: '发布成功啦', safeAreaInsetTop: true });
      setTimeout(() => {
        wx.switchTab({
          url: '../lost/lost'
        });
      }, 3000)

      return
    } else {
      if (this.data.titleValue == '') {
        Notify({ type: 'warning', message: '标题不能为空哟', safeAreaInsetTop: true });
        this.setData({
          isWarning: 1
        })
        return
      }
      if (this.data.selectCon == '点击选择发布物品的类别') {
        Notify({ type: 'warning', message: '🏷标签一定要选哦~', safeAreaInsetTop: true });
        this.setData({
          isWarning: 2
        })
        return
      }
      if (this.data.introValue == '') {
        Notify({ type: 'warning', message: '简介可不能为空哟', safeAreaInsetTop: true });
        this.setData({
          isWarning: 3
        })
        return
      }
      if (!this.data.fileList.length) {
        Notify({ type: 'warning', message: '图片至少一张呢', safeAreaInsetTop: true });
        this.setData({
          isWarning: 4
        })
        return
      }
    }







        })
        .catch(e => {
          wx.showToast({ title: '上传失败', icon: 'none' });
          console.log(e);
        });
    }





    
    console.log(this.data.cloudPath)
    
    
    
    
    // this.uploadToCloud()
    // console.log(this.data.cloudPath)
    // let date = utils.getNowFormatDate()
    // const self = this
    // if (this.data.titleValue && this.data.introValue && this.data.selectCon != '点击选择发布物品的类别' && this.data.fileList.length) {
    //   await wx.cloud.callFunction({
    //     name: 'release',
    //     data: {
    //       images: self.data.cloudPath,
    //       tag: self.data.selectCon,
    //       kind: self.data.kind,
    //       title: self.data.titleValue,
    //       intro: self.data.introValue,
    //       date: date
    //     }
    //   }).then(res => {
    //     console.log(res)
    //   })
    //   Notify({ type: 'success', message: '发布成功啦', safeAreaInsetTop: true });
    //   setTimeout(() => {
    //     wx.switchTab({
    //       url: '../lost/lost'
    //     });
    //   }, 3000)

    //   return
    // } else {
    //   if (this.data.titleValue == '') {
    //     Notify({ type: 'warning', message: '标题不能为空哟', safeAreaInsetTop: true });
    //     this.setData({
    //       isWarning: 1
    //     })
    //     return
    //   }
    //   if (this.data.selectCon == '点击选择发布物品的类别') {
    //     Notify({ type: 'warning', message: '🏷标签一定要选哦~', safeAreaInsetTop: true });
    //     this.setData({
    //       isWarning: 2
    //     })
    //     return
    //   }
    //   if (this.data.introValue == '') {
    //     Notify({ type: 'warning', message: '简介可不能为空哟', safeAreaInsetTop: true });
    //     this.setData({
    //       isWarning: 3
    //     })
    //     return
    //   }
    //   if (!this.data.fileList.length) {
    //     Notify({ type: 'warning', message: '图片至少一张呢', safeAreaInsetTop: true });
    //     this.setData({
    //       isWarning: 4
    //     })
    //     return
    //   }
    // }
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



