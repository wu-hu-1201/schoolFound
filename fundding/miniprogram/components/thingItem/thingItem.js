// components/thingItem/thingItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    des:{
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goDetail: function() {
      wx.navigateTo({
        url: `../detail/detail`
      })
    }
  }
})
