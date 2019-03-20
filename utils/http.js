const baseUrl = "http://bl.7yue.pro/v1"
const appKey = "AbhC31IG7ruCDp57"
class HTTP {
  request(params) {
    if (!params.method) params.method = 'GET'
    wx.request({
      url: baseUrl + params.url,
      header: {
        "appkey": appKey,
        "content-type": "application/json",
      },
      method: params.method,
      success(res) {
        var statusCode = res.statusCode.toString()
        // console.log(res.data)
        if (statusCode.startsWith('2')) {
          params.success && params.success(res.data)
        } else {
          wx.showToast({
            title: '请求资源失败',
            icon: 'none'
          })
        }
      },
      fail() {
        wx.showModal({
          title: '当前网络不可用',
          content: '请检查WiFi或移动数据网络是否正常',
          confirmText: '确定',
          showCancel: false
        })
      }
    })
  }
}
module.exports = HTTP