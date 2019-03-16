// components/repeat/repeat.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    onRepeat() {
      wx.showShareMenu({
        withShareTicket: true,
        success() {
          console.log("转发成功")
        },
        fail() {
          console.log("转发失败")
        }
      })
    }
  }
})