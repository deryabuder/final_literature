// components/navi/navi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //不需要setData(), 因为小程序会合并properties和data
    title: String, 
    index: Number,
    isFirst: Boolean, 
    isLatest: Boolean
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPrev() {
      this.triggerEvent('prev', {}, {})
    },
    onNext() {
      this.triggerEvent('next', {}, {})
    }
  }
})
