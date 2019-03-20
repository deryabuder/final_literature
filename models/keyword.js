var HTTP = require('../utils/http.js')
class KeywordModel extends HTTP {
  constructor() {
    super()
  }
  key = 'searchHistory'
  maxLength = 10
  getHistory() {
    const history = wx.getStorageSync(this.key)
    return history || []
  }
  addHistory(keyword) {
    let history = this.getHistory()
    const has = history.includes(keyword)
    if (has) {
      return
    } else {
      if(history.length >= this.maxLength) {
        history.pop()
      }
      history.unshift(keyword)
      wx.setStorageSync(this.key, history)
    }
  }
  getHotKeyWord(success) {
    var params = {
      url: '/book/hot_keyword',
      success: success
    }
    this.request(params)
  }
}
module.exports = KeywordModel