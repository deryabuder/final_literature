// components/heart/heart.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLike: Number,
    count: Number,
    readOnly: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 0,
    isLike: 0,
    likeSrc: './images/like.png',
    disLikeSrc: './images/like@dis.png'
  },

  /**
   * 自定义组件的生命周期
   */
  ready() {
    // 这里不能获取properties中的变量的属性
    this.setData({
      count: this.properties.count,
      isLike: this.properties.isLike
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChangeLike() {
      if (this.properties.readOnly) {
        return
      }
      var count = this.data.count
      if (this.data.isLike) {
        count = count - 1
      } else {
        count = count + 1
      }
      this.setData({
        count: count
      })
      this.setData({
        isLike: !this.data.isLike
      })
      this.triggerEvent('like', {
        isLike: this.data.isLike
      }, {})
    }
  }
})