// pages/popular/popular.js
var PopularModel = require('../../models/popularData.js')
var popularModel = new PopularModel()
var LikeModel = require('../../models/likeData.js')
var likeModel = new LikeModel()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentItem: {},
    index: 1,
    id: 0,
    type: 100,
    isFirst: false,
    isLatest: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    // 获取数据是异步的，因此后面没有接收到数据
    popularModel.getLatest(function(res) {
      likeModel._setLatestIndex(res.index)
      that.setData({
        currentItem: res,
        index: res.index,
        id: res.id,
        type: res.type
      })
    })
  },
  onReady() {
    this.audioCtx = wx.createAudioContext('musicAudio')
  },
  onNext() {
    var that = this
    var index = that.data.currentItem.index
    this.setData({
      isFirst: likeModel.isFirst(index + 1),
      isLatest: likeModel.isLatest(index + 1)
    })
    if (!likeModel.isLatest(index)) {
      popularModel.getNext(index, function(res) {
        that.setData({
          currentItem: res,
          id: res.id,
          type: res.type,
          index: index + 1
        })
      })
    }
  },
  onPrev() {
    var that = this
    var index = that.data.currentItem.index
    this.setData({
      isFirst: likeModel.isFirst(index - 1),
      isLatest: likeModel.isLatest(index - 1)
    })
    if (!likeModel.isFirst(index)) {
      popularModel.getPrevious(index, function(res) {
        that.setData({
          currentItem: res,
          id: res.id,
          type: res.type,
          index: index - 1
        })
      })
    }
  },
  onLike(e) {
    var likeOrCancel = e.detail.isLike ? 'like' : 'cancel'
    var id = this.data.id
    var type = this.data.type
    console.log(likeOrCancel, id, type)
    likeModel.like(likeOrCancel, id, type)
  }
})