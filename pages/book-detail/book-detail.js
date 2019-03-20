// pages/book-detail/book-detail.js
var BookModel = require('../../models/bookData.js')
var bookModel = new BookModel()
var LikeModel = require('../../models/likeData.js')
var likeModel = new LikeModel()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookDetail: {},
    isFocus: false,
    favor: {},
    comments: [],
    summary: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading()
    /**
     *  因为请求数据是异步的，因此对请求数据的操作就在函数内部操作，
     *  如果写在外面，会在数据没有返回的时候操作数据。
     */
    this.getBookDetail(options.index)
    this.getBookFavor(options.index)
    this.getBookComment(options.index)

  },
  getBookDetail(index) {
    bookModel.getBookDetail(index, (res) => {
      this.setData({
        bookDetail: res,
        summary: res.summary
      })
    })
  },
  // 获取书籍的点赞情况
  getBookFavor(index) {
    likeModel.getBookFavor(index, (res) => {
      this.setData({
        favor: res
      })
    })
  },
  getBookComment(index) {
    bookModel.getBookComment(index, (res) => {
      this.setData({
        comments: res.comments
      })
      wx.hideLoading()
    })
  },
  onFocus() {
    this.setData({
      isFocus: true
    })
  },
  onCancel() {
    this.setData({
      isFocus: false
    })
  },
  onAddComment(e) {
    var content = e.target.dataset.content || e.detail.value
    if (content > 12) {
      wx.showToast({
        title: '短评不能超过12个字',
        icon: 'none'
      })
    } else {
      var comment = {
        'content': content,
        'nums': '1'
      }
      var comments = this.data.comments
      comments.unshift(comment)
      this.setData({
        comments: comments,
        isFocus: false
      })
      bookModel.postBookComment(this.data.bookDetail.id, content)
    }
  },
  onLike(e) {
    var likeOrCancel = e.detail.isLike ? 'like' : 'cancel'
    var id = this.data.bookDetail.id
    likeModel.like(likeOrCancel, id, 400)
  }
})