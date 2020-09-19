// components/lostItem/lostItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    LostList: {
      type: Array,
      value: [],
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
    goDetail: function(e) {
      wx.navigateTo({
        url: `../detail/detail?_id=${e.currentTarget.dataset._id}`
      })
    },
  }
})
