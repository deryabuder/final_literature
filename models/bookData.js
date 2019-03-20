var HTTP = require('../utils/http.js')
class BookModel extends HTTP {
  constructor() {
    super()
  }
  getHotList(success) {
    var params = {
      url: '/book/hot_list',
      success: success
    }
    this.request(params)
  }
  getBookDetail(index, success) {
    var params = {
      url: '/book/' + index + '/detail',
      success: success
    }
    this.request(params)
  }
  getBookComment(index, success) {
    var params = {
      url: '/book/' + index + '/short_comment',
      success: success
    }
    this.request(params)
  }
  postBookComment(id, content) {
    var params = {
      url: '/book/add/short_comment',
      method: 'POST',
      data: {
        book_id: id,
        content: content
      }
    }
    this.request(params)
  }
  // 获取搜索结果
  getSearchResult(start, q, success, fail) {
    var params = {
      url: '/book/search?summary=1&start=' + start + '&q=' + q,
      success: success,
      fail: fail
    }
    this.request(params)
  }
  // 获取我喜欢的书籍的数目
  getMyBooks(success) {
    var params = {
      url: '/book/favor/count',
      success: success
    }
    this.request(params)
  }
}
module.exports = BookModel