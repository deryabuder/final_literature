// components/like-item/like-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    favorItem: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    favorItem: {},
  },
  attached() {
    this.setData({
      favorItem: this.properties.favorItem,
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onToDetail(e) {
      this.triggerEvent('tap', {
        id: this.properties.favorItem.id,
        type: this.properties.favorItem.type
      }, {})
    }
  }
})