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
  getHotKeyWord(success) {
    var params = {
      url: '/book/hot_keyword',
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
  getBookFavor(index, success) {
    var params = {
      url: '/book/' + index + '/favor',
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
  getSearchResult(q, success) {
    var params = {
      url: '/book/search?q=' + q,
      success: success
    }
    this.request(params)
  }
}
module.exports = BookModel