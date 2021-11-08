// index.js
// 获取应用实例

const app = getApp()

Page({
  data: {
    show: false,
    date: '2021-10-29',
    time: '10:10',
    topic: "纪念日",
    buttons: [{
      type: 'primary',
      className: '',
      text: '完成',
    }],
    timer: [],
  },


  updateTime: function (endTime) {
    let nowTime = new Date().getTime()
    let leftTime = endTime - nowTime
    let leftd = Math.floor(leftTime / (1000 * 60 * 60 * 24)) //计算天数
    let lefth = Math.floor((leftTime / (1000 * 60 * 60)) % 24) //计算小时数
    let leftm = Math.floor((leftTime / (1000 * 60)) % 60) //计算分钟数
    let lefts = Math.floor((leftTime / 1000) % 60) //计算秒数

    return {
      "d": leftd,
      "h": lefth,
      "m": leftm,
      "s": lefts
    }
  },
  endtimeParser: function (d, t) {
    // {t: "纪念日", date: "2021-10-29", time: "10:10"}
    // 构造一个新的数组：[2021, 10, 5, 9, 0, 0]
    let arrTime = []
    let date = d.split("-")
    let time = t.split(":")
    date[1] = date[1] - 1

    arrTime = date.concat(time, [0])

    return new Date(...arrTime).getTime()
  },

  updataTimer: function (arr) {
    let newTimer = arr.map((item, index, timer) => {
      item.t = this.updateTime(item.endTime)
      return item
    })
    this.setData({
      timer: newTimer
    })
  },

  bindKeyInput: function (e) {
    this.setData({
      topic: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },

  open: function () {
    this.setData({
      show: true
    })
  },


  buttontap(e) {
    let url = '../shareTimer/index?t=' + this.data.topic + '&date=' + this.data.date + '&time=' + this.data.time
    this.data.timer.push({
      endTime: this.endtimeParser(this.data.date, this.data.time),
      topic: this.data.topic,
      t: {
        d: "",
        h: "",
        m: "",
        s: "",
      }
    })
    this.setData({
      timer: this.data.timer,
      show: false
    })

    // wx.navigateTo({
    //   url: url,
    // })
  },


  onShow() {
    setInterval(() => {
      this.updataTimer(this.data.timer)
    }, 1000)
  },
})