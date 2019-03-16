// components/book.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bookItem: Object,
    hiddenLike: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    hiddenLike: true
  },

  ready() {
    this.setData({
      hiddenLike: this.properties.hiddenLike
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onToDetial() {
      wx.navigateTo({
        url: '/pages/book-detail/book-detail?index=' + this.data.bookItem.id
      })
    }
  }
})
