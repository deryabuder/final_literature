var HTTP = require('../utils/http.js')
class LikeModel extends HTTP {
  constructor() {
    super()
  }
  like(like_or_cancel, id, type) {
    let url = like_or_cancel === 'cancel' ? '/like/cancel' : '/like'
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: id,
        type: type
      },
      success: (data) => {
        console.log(data)
      }
    })
  }
  isFirst(index) {
    return index <= 1 ? true : false
  }
  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return index >= latestIndex ? true : false
  }
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }
  _getLatestIndex() {
    return wx.getStorageSync('latest')
  }
}
module.exports = LikeModel