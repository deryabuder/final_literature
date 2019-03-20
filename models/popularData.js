var HTTP = require('../utils/http.js')
class PopularModel extends HTTP {
  constructor() {
    super()
  }
  // 每次加载都去请求最新的期刊，并把它的数据和index保存在缓存中
  getLatest(sCallback) {
    var params = {
      url: '/classic/latest',
      success: (data) => {
        // 如果不用箭头函数，this将指代不正确
        let key = this._fullKey(data.index)
        wx.setStorageSync(key, data)
        this._setLatestIndex(data.index)
        sCallback(data)
      }
    }
    this.request(params)
  }
  getNext(index, sCallback) {
    this._getClassic(index, 'next', sCallback)
  }
  getPrevious(index, sCallback) {
    this._getClassic(index, 'previous', sCallback)
  }

  getSpecific(type, id, success) {
    let params = {
      url: '/classic/' + type + '/' + id,
      success: success
    }
    this.request(params)
  }
  getFavor(success) {
    var params = {
      url: '/classic/favor',
      success: success
    }
    this.request(params)
  }
  // 
  _getClassic(index, next_or_previous, sCallback) {
    let key = next_or_previous == 'next' ? this._fullKey(index + 1) :
      this._fullKey(index - 1)
    // 查看是否缓存上一期或下一期
    let classic = wx.getStorageSync(key)
    // 没缓存的话， 请求数据并缓存
    if (!classic) {
      let params = {
        url: '/classic/' + index + '/' + next_or_previous,
        success: (data) => {
          let key = this._fullKey(data.index)
          wx.setStorageSync(key, data)
          sCallback(data)
        }
      }
      this.request(params)
    } else {
      // 缓存存在的话，直接返回缓存
      sCallback(classic)
    }
  }
  isLatest(index) {
    // 获取缓存的最新期刊的index
    let key = this._fullKey('latest-' + index)
    let latestEpsoide = wx.getStorageSync(key)
    // 如果缓存的最新期刊的index存在的话
    if (latestEpsoide) {
      if (index == latestEpsoide) {
        return true
      }
    } else return false
  }

  isFirst(index) {
    if (index == 1) {
      return true
    } else return false
  }
  /**
   * 在缓存中存放最新一期的期数
   */
  _setLatestIndex(index) {
    let key = this._fullKey('latest-' + index)
    wx.setStorageSync(key, index)
  }
  // 根据index获取最新期刊的缓存
  _getLatestEpsoide(index) {
    let key = this._fullKey(index)
    return wx.getStorageSync(key)
  }
  _fullKey(partKey) {
    let key = this.prefix + '-' + partKey
    return key
  }
}
module.exports = PopularModel