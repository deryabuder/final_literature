var HTTP = require('../utils/http.js')
class LikeModel extends HTTP {
  constructor() {
    super()
  }
  // 提交喜欢的状态
  like(like_or_cancel, id, type) {
    console.log(like_or_cancel, id, type)
    let url = like_or_cancel == 'cancel' ? '/like/cancel' : '/like'
    var params = {
      url: url,
      method: "POST",
      data: {
        "art_id": id,
        "type": type
      },
      success: (data) => {
        console.log(data)
      }
    }
    this.request(params)
  }
  // 获取期刊喜欢的状态
  getClassicLikeStatus(cid, type, success) {
    var params = {
      url: '/classic/' + type + '/' + cid + '/favor',
      success: success
    }
    this.request(params)
  }
  // 获取书籍的点赞情况
  getBookFavor(index, success) {
    var params = {
      url: '/book/' + index + '/favor',
      success: success
    }
    this.request(params)
  }
}
module.exports = LikeModel