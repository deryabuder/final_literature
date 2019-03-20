let paginationBev = Behavior({
  data: {
    start: 0,
    count: 20,
    searchResult: [],
    empty: false,
    ending: false
  },

  methods: {
    setMoreData: function(searchResult) {
      // 没有更多的搜索结果
      if (!searchResult.length) {
        this.setData({
          ending: true
        })
        // 搜索结果为空的情况
        if (this.data.searchResult == false) {
          this.setData({
            empty: true
          })
        }
      }
      //  新的搜索结果和start
      let temp = this.data.searchResult.concat(searchResult)
      this.setData({
        start: this.data.start + this.data.count
      })
      this.setData({
        searchResult: temp
      })
      return true
    },

    hasMore: function() {
      return !this.data.ending
    },

    getCurrentStart: function() {
      return this.data.start
    },

    initPagination: function() {
      this.setData({
        ending: false,
        start: 0,
        searchResult: []
      })
    },
    // 必须加锁， 不然会重复加载相同的数据
    isLocked() {
      return this.data.loading ? true : false
    },
    locked() {
      this.setData({
        loading: true
      })
    },
    unLocked() {
      this.setData({
        loading: false
      })
    }
  }
})

module.exports = paginationBev