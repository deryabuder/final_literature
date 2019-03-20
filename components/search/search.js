// components/search/search.js
var KeywordModel = require('../../models/keyword.js')
var keywordModel = new KeywordModel()
var BookModel = require('../../models/bookData.js')
var bookModel = new BookModel()
var paginationBev = require('../behaviors/pagination.js')
Component({
  /**
   * 组件的初始数据
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: '_loadMore'
    }
  },
  data: {
    value: '',
    placeholder: "书籍名",
    hotKeyWord: [],
    searchHistory: [],
    isShowResult: false,
    loading: false,
    loadingCenter: false
  },
  attached() {
    this.setData({
      hotKeyWord: this.properties.hotKeyWord,
      searchHistory: keywordModel.getHistory()
    })
    this.getHotKeyWord()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getHotKeyWord() {
      keywordModel.getHotKeyWord(res => {
        this.setData({
          hotKeyWord: res.hot
        })
      })
    },

    onCancel() {
      // 调用的是父组件的事件
      this.triggerEvent('cancel')
    },

    onDelete() {
      this.setData({
        value: '',
        isShowResult: false,
        empty: false
      })
    },

    onConfirm(e) {
      this.search(0, e.detail.value)
    },
    onSearch(e) {
      // 点击标签，将标签的值赋给input的value
      this.setData({
        // 注释掉的方法在电脑上成功运行，但在手机上无法获取到值
        // value: e._relatedInfo.anchorTargetText
        value: e.currentTarget.dataset.keyword
      })
      this.search(0, this.data.value)
    },

    search(start, value) {
      this.initPagination()
      if (!value) {
        return
      }
      // 必须先跳转页面再显示加载图标
      this.setData({
        isShowResult: true
      })
      this._showLoadingCenter()
      // 获取搜索结果
      bookModel.getSearchResult(start, value, (res) => {
        this.setData({
          searchResult: res.books,
          start: res.books.length,
          empty: !res.books.length
        })
        this._hiddenLoadingCenter()
      })

      // 设置搜索历史，并存入缓存
      keywordModel.addHistory(value)
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hiddenLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    _loadMore: function() {
      if (!this.data.value) {
        return
      }
      let hasMore = this.hasMore()
      if (!hasMore) {
        return
      }
      // 这一步可以锁住，因为触底之后可能会响应多次，防止多次加载相同的数据
      if (this.isLocked()) {
        return
      }
      this.locked()
      let value = this.data.value
      let start = this.getCurrentStart()
      console.log(start, 111)
      // 即使获取数据失败，也要解锁，避免发生死锁
      bookModel.getSearchResult(start, value, (res) => {
        this.setMoreData(res.books)
        this.unLocked()
      }, () => {
        this.unLocked()
      })
    },
  }
})