 // components/time/time.js
 Component({
   /**
    * 组件的属性列表
    */
   properties: {
     index: {
       type: Number,
       observer(newVal, oldVal, changedPath) {
          let val = newVal < 10 ? '0' + newVal : newVal
          this.setData({_index: val})
       }
     }
   },

   /**
    * 组件的初始数据
    */
   data: {
     _index: '',
     currentMonth: '',
     currentYear: ''
   },
   // 用onLoad和attached获取不到数据
   attached() {
     this.getTime()
   },
   /**
    * 组件的方法列表
    */
   methods: {
     // 终于获取到数据了
     getTime() {
       let date = new Date()
       var currentMonth = date.getMonth()
       var currentYear = date.getFullYear()
       currentMonth = this.SectionToChinese(currentMonth)
       this.setData({
         index: this.properties.index,
         currentMonth: currentMonth,
         currentYear: currentYear
       })
     },
     SectionToChinese(section) {
       var chnNumChar = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
       section = Number(section) - 1
       return chnNumChar[section]
     }
   }
 })