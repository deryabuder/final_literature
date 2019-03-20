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
    likeSrc: './images/like.png',
    disLikeSrc: './images/like@dis.png'
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