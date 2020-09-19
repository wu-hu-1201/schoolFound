// components/detail/detail.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detail: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back: function(){
      wx.navigateBack({
        delta: 0
      });
    }
  },

  lifetimes: {
    attached: function() {
      // wx.cloud.callFunction({
      //   name:'getDetail',
      //   data: {
      //     kind: 'lost',
      //     tag: e.target.dataset.tag,
      //   }     
      // }).then(res => {
      //   this.setData({
      //     selectCategory: res.result
      //   })
      
    },
  }
})
