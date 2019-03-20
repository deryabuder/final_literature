// pages/book/book.js
var BookModel = require('../../models/bookData.js')
var bookModel = new BookModel()
var random = require('../../utils/util.js')
Page({
  data: {
    hotList: [],
    searching: false,
    placeholder: "搜索书籍",
    more: false
  },
  onLoad(options) {
    this.getHotList()
  },
  getHotList() {
    bookModel.getHotList(res => {
      this.setData({
        hotList: res
      })
    })
  },
  onSearching() {
    this.setData({
      searching: true
    })
  },
  onCancel() {
    this.setData({
      searching: false
    })
  },
  onReachBottom(event) {
    this.setData({
      more: random(16)
    })
  }
})