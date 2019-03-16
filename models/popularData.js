var HTTP = require('../utils/http.js')
class PopularModel extends HTTP {
  constructor() {
    super()
  }
  getLatest(success) {
    var params = {
      url: '/classic/latest',
      success: success
    }
    this.request(params)
  }
  getNext(index, success) {
    var params = {
      url: '/classic/' + index + '/next',
      success: success
    }
    this.request(params)
  }
  getPrevious(index, success) {
    var params = {
      url: '/classic/' + index + '/previous',
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
  getSpecific(type, id, success) {
    let params = {
      url: '/classic/' + type + '/' + id,
      success: success
    }
    this.request(params)
  }
}
module.exports = PopularModel