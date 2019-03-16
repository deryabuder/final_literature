// components/popular-content/popular-content.js
var PopularModel = require('../../models/popularData.js')
var popularModel = new PopularModel()
var LikeModel = require('../../models/likeData.js')
var likeModel = new LikeModel()
Page({
  /**
   * 组件的初始数据
   */
  data: {
    currentItem: {},
    id: 0,
    type: 100
  },

  onLoad(query) {
    var type = query.type
    var id = query.id
    popularModel.getSpecific(type, id, (res) => {
      this.setData({
        currentItem: res,
        id: res.id,
        type: res.type
      })
    })
  },
  onReady() {
    this.audioCtx = wx.createAudioContext('musicAudio')
  },
  onControl(e) {
    this.triggerEvent('tap', {
      playing: e.detail.playing
    }, {})
  },
  onLike(e) {
    var likeOrCancel = e.detail.isLike ? 'like' : 'cancel'
    var id = this.data.id
    var type = this.data.type
    console.log(likeOrCancel, id, type)
    likeModel.like(likeOrCancel, id, type)
  }
})