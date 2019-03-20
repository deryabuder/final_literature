class PopularStorage {
  static prefix = 'popular'
  constructor(epsoide) {
    this.key = popularStorage.prefix + '-' + epsoide
  }
  get(epsoide) {
    return wx.getStorageSync(this.key)
  }
  set(epsoide, popular) {
    wx.setStorageSync(this.key, popular)
  }
}

module.exports = PopularStorage