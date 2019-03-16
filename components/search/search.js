// components/search/search.js
var BookModel = require('../../models/bookData.js')
var bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hotKeyWord: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: '',
    isFocus: false,
    placeholder: "书籍名",
    hotKeyWord: [],
    searchHistory: [],
    searchResult: [],
    isShowResult: false
  },
  attached() {
    this.setData({
      hotKeyWord: this.properties.hotKeyWord
    })
    const value = wx.getStorageSync('searchHistory')
    if (value) {
      this.setData({
        searchHistory: value
      })
    } else {
      wx.setStorageSync(
        'searchHistory', [])
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onCancel() {
      // 调用的是父组件的事件
      this.triggerEvent('cancel')
    },
    onDelete() {
      this.setData({
        isFocus: false,
        value: '',
        isShowResult: false
      })
    },
    onConfirm(e) {
      this.search(e.detail.value)
    },
    onSearch(e) {
      this.setData({
        value: e._relatedInfo.anchorRelatedText
      })
      this.search(this.data.value)
    },
    search(value) {
      if(!value) {
        return
      }
      // 获取搜索结果
      bookModel.getSearchResult(value, (res) => {
        this.setData({
          searchResult: res.books
        })
      })
      // 设置搜索历史，并存入缓存
      var searchHistory = this.data.searchHistory
      if (searchHistory.indexOf(value) === -1) {
        searchHistory.push(value)
        this.setData({
          searchHistory: searchHistory
        })
        wx.setStorageSync('searchHistory', searchHistory)
      }
      this.setData({
        isShowResult: true
      })
    }
  }
})