//index.js
//获取应用实例
const app = getApp()
var PopularModel = require('../../models/popularData.js')
var popularModel = new PopularModel()
var BookModel = require('../../models/bookData.js')
var bookModel = new BookModel()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    favor: [],
    myBooks: 0
  },
  onLoad: function(options) {
    this.userAuthenticate()
    this.getFavor()
    this.getMyBooks()
  },
  userAuthenticate() {
    // globalData中是否有信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      // 是否通过点击按钮获取到了信息
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getFavor() {
    popularModel.getFavor((res) => {
      this.setData({
        favor: res
      })
    })
  },
  getMyBooks() {
    bookModel.getMyBooks(res => {
      this.setData({
        myBooks: res.count
      })
    })
  },
  // 点击按钮之后，获取用户信息
  getUserInfo: function (e) {
    console.log(e)
    // 保存到globalData
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onToCourse() {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },
  onToAbout() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  onToDetail(e) {
    wx.navigateTo({
      url: '/pages/popular-content/popular-content?id=' + e.detail.id + '&type=' + e.detail.type
    })
  }
})