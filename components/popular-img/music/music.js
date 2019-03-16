// components/popular-img/movie/movie.js
const popularBehavior = require('../popular-beh.js')
const mMgr = wx.getBackgroundAudioManager()
Component({
  behaviors: [popularBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    playSrc: './images/player@playing.png',
    waitSrc: './images/player@waitting.png'
  },

  attached() {
    this._recoverStatus()
    // 操作总控开关时，让自定义开关与其一致
    this._monitorSwitch()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // audio的播放控制参考于https://www.cnblogs.com/liululin/p/6016617.html
    onPlay() {
      this.setData({
        playing: true
      })
      mMgr.src = this.properties.src
      mMgr.title = this.properties.title
    },
    onPause() {
      this.setData({
        playing: false
      })
      mMgr.pause()
    },
    _recoverStatus: function () {
      // 初次加载mMgr.paused是undefined
      // 如果没有这段代码，在总控开关停止播放歌曲，但是自定义控件还处于播放的状态
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      // 初次加载 mMgr.src是undefined
      if (mMgr.src === this.properties.src) {
        if (!mMgr.paused) {
          this.setData({
            playing: true
          })
        }
      }
    },
    _monitorSwitch: function () {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      }),
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})