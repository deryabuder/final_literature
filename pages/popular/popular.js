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
    currentItem: null,
    isFirst: false,
    isLatest: true,
    isLike: false,
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取数据是异步的，因此后面没有接收到数据
    this.getLatest()
  },
  onShow() {
    // 资源请求是异步的，防止第一次加载资源，资源还没返回就更新喜欢状态报错的情况
    if(this.data.currentItem) {
      this._getLikeStatus(this.data.currentItem.id, this.data.currentItem.type)
    }
  },
  getLatest() {
    popularModel.getLatest(res => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        currentItem: res,
        isFirst: popularModel.isFirst(res.index),
        isLatest: popularModel.isLatest(res.index)
      })
    })
  },
  onReady() {
    this.audioCtx = wx.createAudioContext('musicAudio')
  },
  onNext() {
    var index = this.data.currentItem.index
    popularModel.getNext(index, res => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        currentItem: res,
        isFirst: popularModel.isFirst(res.index),
        isLatest: popularModel.isLatest(res.index)
      })
    })
  },
  onPrev() {
    var index = this.data.currentItem.index
    popularModel.getPrevious(index, res => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        currentItem: res,
        isFirst: popularModel.isFirst(res.index),
        isLatest: popularModel.isLatest(res.index)
      })
    })
  },
  onLike(e) {
    var likeOrCancel = e.detail.isLike ? 'like' : 'cancel'
    likeModel.like(likeOrCancel, this.data.currentItem.id, this.data.currentItem.type)
  },
  _getLikeStatus: function(id, type) {
    likeModel.getClassicLikeStatus(id, type, (data) => {
      this.setData({
        isLike: data.like_status,
        count: data.fav_nums
      })
    })
  },
})